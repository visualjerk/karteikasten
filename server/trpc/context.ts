import { PrismaClient } from '@prisma/client'
import { Octokit } from 'octokit'
import { getCache } from '@/server/cache'
import { ANONYMOUS_COOKIE, GH_COOKIE } from '@/constants'
import jwt from 'jsonwebtoken'
import { DateTime } from 'luxon'
import type { inferAsyncReturnType } from '@trpc/server'
import type { CompatibilityEvent } from 'h3'

export interface AnonymousUser {
  id: number
}

export interface GithubUser {
  id: number
  githubId: number
  avatarUrl: string
}

let prisma: PrismaClient | undefined

const DEFAULT_BOX = {
  name: 'German',
}

const DEFAULT_CARDS = [
  {
    front: 'Hallo',
    back: 'Hello',
  },
  {
    front: 'Liebe',
    back: 'Love',
  },
  {
    front: 'Haus',
    back: 'House',
  },
  {
    front: 'Du',
    back: 'You',
  },
  {
    front: 'Wir',
    back: 'We',
  },
  {
    front: 'Gut',
    back: 'Good',
  },
]

async function getAnonymousUser(
  event: CompatibilityEvent,
  prisma: PrismaClient
): Promise<AnonymousUser> {
  const token = useCookies(event)[ANONYMOUS_COOKIE]

  // Anonymously login with token if it is valid and the user exists
  if (token) {
    try {
      const authUser = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as AnonymousUser
      const user = await prisma.user.findFirst({
        where: {
          id: authUser.id,
        },
      })
      if (user) {
        return authUser
      }
    } catch (e) {
      console.log('Invalid token', e)
    }
  }

  // Anonymously login with new user and create token
  const user = await prisma.user.create({
    data: {
      boxes: {
        create: [
          {
            ...DEFAULT_BOX,
            cards: {
              create: DEFAULT_CARDS,
            },
          },
        ],
      },
    },
  })
  const authUser: AnonymousUser = { id: user.id }
  const newToken = jwt.sign(authUser, process.env.JWT_SECRET as string, {
    expiresIn: '2y',
  })
  setCookie(event, ANONYMOUS_COOKIE, newToken, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: DateTime.now().plus({ years: 2 }).toJSDate(),
  })
  return authUser
}

async function getUserFromHeader(
  event: CompatibilityEvent,
  prisma: PrismaClient
): Promise<GithubUser | AnonymousUser> {
  const ghToken = useCookies(event)[GH_COOKIE]

  if (!ghToken) {
    return getAnonymousUser(event, prisma)
  }

  // Try to get GitHub user from cache
  const cache = getCache()
  const cachedUser = cache.get(ghToken)
  if (cachedUser) {
    return cachedUser as GithubUser
  }

  // Get user from GitHub
  const octokit = new Octokit({ auth: ghToken })
  const { data, status } = await octokit.rest.users.getAuthenticated()

  // Github user not valid, get anonymous user
  if (status >= 400) {
    return getAnonymousUser(event, prisma)
  }

  // Find GitHub user in DB
  let user = await prisma.user.findFirst({
    where: {
      githubId: data.id,
    },
  })

  // Add githubId to anonymous user to make her a real user
  if (!user) {
    const anonymousUser = await getAnonymousUser(event, prisma)
    user = await prisma.user.update({
      where: {
        id: anonymousUser.id,
      },
      data: {
        githubId: data.id,
      },
    })
  }

  const githubUser: GithubUser = {
    id: user.id,
    githubId: data.id,
    avatarUrl: data.avatar_url,
  }

  // Add user to cache
  cache.set(ghToken, githubUser)
  return githubUser
}

// The app's context - is generated for each incoming request
export async function createContext(event: CompatibilityEvent) {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  const authUser = await getUserFromHeader(event, prisma)

  return {
    authUser,
    prisma,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
