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

// The app's context - is generated for each incoming request
export async function createContext(event: CompatibilityEvent) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  async function getUserFromHeader(
    prisma: PrismaClient
  ): Promise<GithubUser | AnonymousUser> {
    const { gh_token: ghToken, token } = useCookies(event)

    // Anonymously login with token
    if (!ghToken && token) {
      try {
        const authUser = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as AnonymousUser
        return authUser
      } catch (e) {
        console.log('Invalid token', e)
      }
    }

    // Anonymously login and create token
    if (!ghToken) {
      const user = await prisma.user.create({
        data: {},
      })
      const authUser: AnonymousUser = { id: user.id }
      const token = jwt.sign(authUser, process.env.JWT_SECRET as string)
      setCookie(event, 'token', token)
      return authUser
    }

    // Try to get GitHub user from cache
    const cache = getCache()
    const cachedUser = cache.get(ghToken)
    if (cachedUser) {
      return cachedUser as GithubUser
    }

    // Get user from GitHub
    const octokit = new Octokit({ auth: ghToken })
    const { data } = await octokit.rest.users.getAuthenticated()

    // Find GitHub user in DB
    let user = await prisma.user.findFirst({
      where: {
        githubId: data.id,
      },
    })

    // Create user in DB if not found
    if (!user) {
      user = await prisma.user.create({
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
  if (!prisma) {
    prisma = new PrismaClient()
  }
  const authUser = await getUserFromHeader(prisma)

  return {
    authUser,
    prisma,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
