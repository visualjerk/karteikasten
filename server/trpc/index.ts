import type { inferAsyncReturnType } from '@trpc/server'
import type { CompatibilityEvent } from 'h3'
import { router as trpcRouter, TRPCError } from '@trpc/server'
import { Octokit } from 'octokit'
import { callPrisma } from '@/server/prisma'

interface AuthUser {
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

type Context = inferAsyncReturnType<typeof createContext>

export const router = trpcRouter<Context>()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.authUser) throw new TRPCError({ code: 'UNAUTHORIZED' })
    return next()
  })
  .query('getUser', {
    async resolve({ ctx }) {
      // As we check the user in the middleware,
      // we can assume that the user is not null
      const authUser = ctx.authUser as AuthUser

      let user = await callPrisma((prisma) =>
        prisma.user.findFirst({
          where: {
            githubId: authUser.id,
          },
        })
      )

      if (!user) {
        user = await callPrisma(async (prisma) =>
          prisma.user.create({
            data: {
              githubId: authUser.id,
            },
          })
        )
      }

      return {
        id: user.id,
        githubId: user.githubId,
        avatarUrl: authUser.avatar_url,
      }
    },
  })
