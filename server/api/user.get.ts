import { PrismaClient } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const response: { email: string } = await $fetch('/user', {
    baseURL: 'https://api.github.com',
    headers: {
      Authorization: event.req.headers.authorization,
    },
  })

  const prisma = new PrismaClient()
  let user
  try {
    user = await prisma.user.findFirst({
      where: {
        email: response.email,
      },
    })
  } catch (e) {
    throw e
  } finally {
    await prisma.$disconnect()
  }

  return user
})
