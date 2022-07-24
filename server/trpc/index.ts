import { router as trpcRouter } from '@trpc/server'
import type { Context } from './context'
export { createContext } from './context'
import { users } from './routes/users'
import { boxes } from './routes/boxes'
import { cards } from './routes/cards'

export const router = trpcRouter<Context>()
  .merge('users.', users)
  .merge('boxes.', boxes)
  .merge('cards.', cards)
