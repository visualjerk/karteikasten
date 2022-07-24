import type { Box, NewBox, UpdateBox } from '@/server/trpc/types'

export function useBox(id: Box['id']) {
  return useAsyncQuery(['boxes.get', { id }], {
    server: false,
    initialCache: false,
    lazy: true,
  })
}

export function useBoxes() {
  return useAsyncQuery(['boxes.getAll'], {
    server: false,
    initialCache: false,
    lazy: true,
  })
}

export async function createBox(box: NewBox) {
  await useClient().mutation('boxes.create', box)
  await refreshNuxtData(getQueryKey(['boxes.getAll']))
}

export async function deleteBox(box: Box) {
  await useClient().mutation('boxes.delete', box)
  await refreshNuxtData(getQueryKey(['boxes.getAll']))
}

export async function updateBox(box: UpdateBox) {
  await useClient().mutation('boxes.update', box)
  await refreshNuxtData([
    getQueryKey(['boxes.getAll']),
    getQueryKey(['boxes.get', { id: box.id }]),
  ])
}

export async function resetBox(box: UpdateBox) {
  await useClient().mutation('boxes.reset', box)
  await refreshNuxtData(getQueryKey(['boxes.get', { id: box.id }]))
}
