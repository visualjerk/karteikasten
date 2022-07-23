import { router as trpcRouter } from '@trpc/server'
import { callPrisma } from '@/server/prisma'
import type { Context } from '../context'
import { getUser } from './users'
import { z } from 'zod'

export const boxes = trpcRouter<Context>()
  .query('getAll', {
    async resolve({ ctx }) {
      const user = await getUser(ctx)

      const boxes = await callPrisma((prisma) =>
        prisma.box.findMany({
          where: {
            userId: user.id,
          },
        })
      )

      return boxes
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

      const box = await callPrisma((prisma) =>
        prisma.box.create({
          data: {
            name: input.name,
            userId: user.id,
          },
        })
      )

      await callPrisma((prisma) =>
        prisma.card.createMany({
          data: input.cards.map((card) => ({ ...card, boxId: box.id })),
        })
      )

      return box
    },
  })
