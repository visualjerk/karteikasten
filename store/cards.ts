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
