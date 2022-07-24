import { PrismaClient } from '@prisma/client'
import { Octokit } from 'octokit'
import { getCache } from '@/server/cache'
import type { inferAsyncReturnType } from '@trpc/server'
import type { CompatibilityEvent } from 'h3'

export interface AuthUser {
  id: number
  avatar_url: string
}

let prisma: PrismaClient | undefined

// The app's context - is generated for each incoming request
export async function createContext(event: CompatibilityEvent) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  async function getUserFromHeader() {
    const { gh_token: ghToken } = useCookies(event)
    if (!ghToken) {
      return null
    }

    // Try to get user from cache
    const cache = getCache()
    const cachedUser = cache.get(ghToken)
    if (cachedUser) {
      return cachedUser
    }

    // Get user from GitHub
    const octokit = new Octokit({ auth: ghToken })
    const { data: githubUser } = await octokit.rest.users.getAuthenticated()
    const authUser = { id: githubUser.id, avatar_url: githubUser.avatar_url }
    cache.set(ghToken, authUser)
    return authUser
  }
  const authUser = await getUserFromHeader()

  if (!prisma) {
    prisma = new PrismaClient()
  }

  return {
    authUser,
    prisma,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
