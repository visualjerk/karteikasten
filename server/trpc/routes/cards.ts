import { router as trpcRouter, TRPCError } from '@trpc/server'
import type { Context } from '../context'
import { z } from 'zod'

async function checkPermission(ctx: Context, id: number) {
  const user = ctx.authUser
  const card = await ctx.prisma.card.findFirst({
    where: {
      id,
      box: {
        userId: user.id,
      },
    },
  })
  if (!card) throw new TRPCError({ code: 'NOT_FOUND' })
}

export const cards = trpcRouter<Context>()
  .mutation('addError', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      await checkPermission(ctx, input.id)

      await ctx.prisma.card.update({
        where: {
          id: input.id,
        },
        data: {
          errorCount: {
            increment: 1,
          },
          lastTryAt: new Date(),
        },
      })

      return true
    },
  })
  .mutation('addSuccess', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      await checkPermission(ctx, input.id)

      await ctx.prisma.card.update({
        where: {
          id: input.id,
        },
        data: {
          successCount: {
            increment: 1,
          },
          lastTryAt: new Date(),
        },
      })

      return true
    },
  })
