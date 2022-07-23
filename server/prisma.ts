import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

export async function callPrisma<T>(
  callback: (prisma: PrismaClient) => Promise<T>
) {
  if (!prisma) {
    prisma = new PrismaClient()
  } else {
    prisma.$connect()
  }
  try {
    return await callback(prisma)
  } catch (e) {
    throw e
  } finally {
    await prisma.$disconnect()
  }
}
