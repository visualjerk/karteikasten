import { createGlobalState, MaybeComputedRef, useStorage } from '@vueuse/core'
import { readonly, unref } from 'vue'
import { cloneDeep } from 'lodash-es'

export interface Card {
  front: string
  back: string
}

export interface NewBox {
  name: string
  cards: Card[]
}

export interface Box extends NewBox {
  id: number
}

const defaultBoxes: Box[] = [
  {
    id: 0,
    name: 'German',
    cards: [],
  },
  {
    id: 1,
    name: 'Spain',
    cards: [],
  },
  {
    id: 2,
    name: 'JS Syntax',
    cards: [],
  },
]

const useGlobalBoxesState = createGlobalState(() =>
  useStorage('karteikasten-boxes', defaultBoxes)
)

export function useBoxes() {
  const all = useGlobalBoxesState()

  function add(box: NewBox) {
    const last = all.value.at(-1)
    const id = last ? last.id + 1 : 0
    all.value.push({
      ...box,
      id,
    })
  }

  function getById(id: MaybeComputedRef<number>) {
    return all.value.find((box) => box.id === unref(id))
  }

  function get(id: MaybeComputedRef<number>) {
    const box = getById(id)
    if (!box) {
      return null
    }
    return readonly(box)
  }

  function getCopy(id: MaybeComputedRef<number>) {
    const box = getById(id)
    if (!box) {
      return null
    }
    return cloneDeep(box)
  }

  function set(box: Box) {
    const index = all.value.findIndex((_box) => _box.id === box.id)
    all.value[index] = box
  }

  return {
    all: readonly(all),
    get,
    getCopy,
    set,
    add,
  }
}
