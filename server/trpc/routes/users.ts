import { router as trpcRouter } from '@trpc/server'
import { callPrisma } from '@/server/prisma'
import type { Context, AuthUser } from '../context'

export async function getUser(ctx: Context) {
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
}

export const users = trpcRouter<Context>().query('get', {
  async resolve({ ctx }) {
    return await getUser(ctx)
  },
})
