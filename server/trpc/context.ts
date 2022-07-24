import { PrismaClient } from '@prisma/client'
import { Octokit } from 'octokit'
import { getCache } from '@/server/cache'
import jwt from 'jsonwebtoken'
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

async function getAnonymousUser(
  event: CompatibilityEvent,
  prisma: PrismaClient
): Promise<AnonymousUser> {
  const { token } = useCookies(event)

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

  // Anonymously login and create token
  const user = await prisma.user.create({
    data: {},
  })
  const authUser: AnonymousUser = { id: user.id }
  const newToken = jwt.sign(authUser, process.env.JWT_SECRET as string)
  setCookie(event, 'token', newToken)
  return authUser
}

async function getUserFromHeader(
  event: CompatibilityEvent,
  prisma: PrismaClient
): Promise<GithubUser | AnonymousUser> {
  const { gh_token: ghToken } = useCookies(event)

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
