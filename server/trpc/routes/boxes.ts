import { router as trpcRouter, TRPCError } from '@trpc/server'
import type { Context } from '../context'
import { getUser } from './users'
import { z } from 'zod'

export const boxes = trpcRouter<Context>()
  .query('getAll', {
    async resolve({ ctx }) {
      const user = await getUser(ctx)
      const boxes = await ctx.prisma.box.findMany({
        where: {
          userId: user.id,
        },
      })
      return boxes
    },
  })
  .query('get', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      const user = await getUser(ctx)

      const box = await ctx.prisma.box.findFirst({
        where: {
          id: input.id,
          userId: user.id,
        },
        include: {
          cards: true,
        },
      })
      if (!box) throw new TRPCError({ code: 'NOT_FOUND' })

      return box
    },
  })
  .mutation('create', {
    input: z.object({
      name: z.string().min(1),
      cards: z.array(
        z.object({
          front: z.string().min(1),
          back: z.string().min(1),
        })
      ),
    }),
    async resolve({ ctx, input }) {
      const user = await getUser(ctx)

      const box = await ctx.prisma.box.create({
        data: {
          name: input.name,
          userId: user.id,
        },
      })

      await ctx.prisma.card.createMany({
        data: input.cards.map((card) => ({ ...card, boxId: box.id })),
      })

      return box
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      const user = await getUser(ctx)

      const box = await ctx.prisma.box.findFirst({
        where: {
          id: input.id,
          userId: user.id,
        },
      })
      if (!box) throw new TRPCError({ code: 'NOT_FOUND' })

      await ctx.prisma.card.deleteMany({
        where: {
          boxId: input.id,
        },
      })

      await ctx.prisma.box.delete({
        where: {
          id: input.id,
        },
      })

      return true
    },
  })
