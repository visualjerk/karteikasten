import { Card } from '@/server/trpc/types'

export async function addError(boxId: number, cardId: number) {
  await useClient().mutation('cards.addError', {
    id: cardId,
  })
  await refreshNuxtData([getQueryKey(['boxes.get', { id: boxId }])])
}

export async function addSuccess(boxId: number, cardId: number) {
  await useClient().mutation('cards.addSuccess', {
    id: cardId,
  })
  await refreshNuxtData([getQueryKey(['boxes.get', { id: boxId }])])
}

export function getAccuracy(card: Card) {
  const { errorCount, successCount } = card
  if (successCount === 0) {
    return 0
  }
  return successCount / (errorCount + successCount)
}
