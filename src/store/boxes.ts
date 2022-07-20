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

  function getById(id: MaybeComputedRef<number>) {
    return all.value.find((box) => box.id === unref(id))
  }

  function getIndexById(id: MaybeComputedRef<number>) {
    return all.value.findIndex((box) => box.id === unref(id))
  }

  function add(box: NewBox) {
    const last = all.value.at(-1)
    const id = last ? last.id + 1 : 0
    all.value.push({
      ...box,
      id,
    })
  }

  function remove(id: MaybeComputedRef<number>) {
    const index = getIndexById(id)
    all.value.splice(index, 1)
  }

  function set(box: Box) {
    const index = getIndexById(box.id)
    all.value[index] = box
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

  return {
    all: readonly(all),
    get,
    getCopy,
    add,
    set,
    remove,
  }
}
