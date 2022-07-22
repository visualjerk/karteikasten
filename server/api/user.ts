import { PrismaClient } from '@prisma/client'

export default defineEventHandler(async () => {
  const prisma = new PrismaClient()
  let users
  try {
    users = await prisma.user.findMany()
  } catch (e) {
    throw e
  } finally {
    await prisma.$disconnect()
  }

  return users
})
