import type { inferAsyncReturnType } from '@trpc/server'
import type { CompatibilityEvent } from 'h3'
import { Octokit } from 'octokit'

export interface AuthUser {
  id: number
  avatar_url: string
}

// The app's context - is generated for each incoming request
export async function createContext(event: CompatibilityEvent) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  async function getUserFromHeader() {
    const { gh_token: ghToken } = useCookies(event)
    if (!ghToken) {
      return null
    }
    const octokit = new Octokit({ auth: ghToken })
    const { data: githubUser } = await octokit.rest.users.getAuthenticated()
    return githubUser
  }
  const authUser = await getUserFromHeader()

  return {
    authUser,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
