import { PrismaClient } from '@prisma/client'
import { Octokit } from 'octokit'
import { User } from '@/types/user'

async function callPrisma<T>(callback: (prisma: PrismaClient) => Promise<T>) {
  const prisma = new PrismaClient()
  try {
    return await callback(prisma)
  } catch (e) {
    throw e
  } finally {
    await prisma.$disconnect()
  }
}

export default defineEventHandler(async function (event): Promise<User> {
  const octokit = new Octokit({ auth: event.req.headers.authorization })
  const { data: githubUser } = await octokit.rest.users.getAuthenticated()

  let user = await callPrisma((prisma) =>
    prisma.user.findFirst({
      where: {
        githubId: githubUser.id,
      },
    })
  )

  if (!user) {
    user = await callPrisma(async (prisma) =>
      prisma.user.create({
        data: {
          githubId: githubUser.id,
        },
      })
    )
  }

  return {
    id: user.id,
    githubId: user.githubId,
    avatarUrl: githubUser.avatar_url,
  }
})
