import { router as trpcRouter, TRPCError } from '@trpc/server'
import type { Context } from './context'
export { createContext } from './context'
import { users } from './routes/users'
import { boxes } from './routes/boxes'

export const router = trpcRouter<Context>()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.authUser) throw new TRPCError({ code: 'UNAUTHORIZED' })
    return next()
  })
  .merge('users.', users)
  .merge('boxes.', boxes)
