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
          cards: {
            create: input.cards,
          },
        },
      })

      return box
    },
  })
  .mutation('update', {
    input: z.object({
      id: z.number(),
      name: z.string().min(1),
      cards: z.array(
        z.object({
          id: z.number().optional(),
          front: z.string().min(1),
          back: z.string().min(1),
        })
      ),
    }),
    async resolve({ ctx, input }) {
      const user = await getUser(ctx)

      const oldBox = await ctx.prisma.box.findFirst({
        where: {
          id: input.id,
          userId: user.id,
        },
        include: {
          cards: true,
        },
      })
      if (!oldBox) throw new TRPCError({ code: 'NOT_FOUND' })

      const existingCards = input.cards.filter(({ id }) => id != null)
      const newCards = input.cards.filter(({ id }) => id == null)

      // Get deleted card ids
      const deletedCardIds = oldBox.cards
        .filter(
          (oldCard) => !existingCards.some((card) => card.id === oldCard.id)
        )
        .map((oldCard) => oldCard.id)

      // Update existing cards
      const cardUpdates = existingCards.map((card) =>
        ctx.prisma.card.update({
          where: {
            id: card.id,
          },
          data: {
            front: card.front,
            back: card.back,
          },
        })
      )
      await ctx.prisma.$transaction(cardUpdates)

      // Update box, delete old cards, add new cards
      const box = await ctx.prisma.box.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          cards: {
            deleteMany: {
              id: { in: deletedCardIds },
            },
            create: newCards,
          },
        },
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
