import { router as trpcRouter } from '@trpc/server'
import type { AnonymousUser, GithubUser, Context } from '../context'

export const users = trpcRouter<Context>().query('get', {
  resolve({ ctx }): AnonymousUser | GithubUser | null {
    return ctx.authUser
  },
})
