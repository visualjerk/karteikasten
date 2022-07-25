import { router as trpcRouter, TRPCError } from '@trpc/server'
import type { Context } from '../context'
import { z } from 'zod'

async function getBox(ctx: Context, boxId: number, includeCards = false) {
  const user = ctx.authUser
  const box = await ctx.prisma.box.findFirst({
    where: {
      id: boxId,
      userId: user.id,
    },
    include: {
      cards: includeCards,
    },
  })
  if (!box) throw new TRPCError({ code: 'NOT_FOUND' })
  return box
}

export const boxes = trpcRouter<Context>()
  .query('getAll', {
    async resolve({ ctx }) {
      const user = ctx.authUser
      const boxes = await ctx.prisma.box.findMany({
        where: {
          userId: user.id,
        },
        include: {
          _count: {
            select: { cards: true },
          },
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
      const box = await getBox(ctx, input.id, true)
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
      const user = ctx.authUser

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
      const oldBox = await getBox(ctx, input.id, true)

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
  .mutation('reset', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      await getBox(ctx, input.id)

      await ctx.prisma.card.updateMany({
        where: {
          boxId: input.id,
        },
        data: {
          errorCount: 0,
          successCount: 0,
        },
      })

      return true
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      await getBox(ctx, input.id)

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
