import { PrismaClient } from '@prisma/client'
import { Octokit } from 'octokit'
import type { inferAsyncReturnType } from '@trpc/server'
import type { CompatibilityEvent } from 'h3'

export interface AuthUser {
  id: number
  avatar_url: string
}

let prisma: PrismaClient | undefined
let octokit: Octokit | undefined

// The app's context - is generated for each incoming request
export async function createContext(event: CompatibilityEvent) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  async function getUserFromHeader() {
    const { gh_token: ghToken } = useCookies(event)
    if (!ghToken) {
      return null
    }
    if (!octokit) {
      octokit = new Octokit({ auth: ghToken })
    }
    const { data: githubUser } = await octokit.rest.users.getAuthenticated()
    return githubUser
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
