import { createGlobalState, MaybeComputedRef, useStorage } from '@vueuse/core'
import { readonly, computed, unref } from 'vue'

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

  return {
    all: readonly(all),
    add,
  }
}

export function useBox(id: MaybeComputedRef<number>) {
  const all = useGlobalBoxesState()
  const box = computed(() => all.value.find((box) => box.id === unref(id)))

  return {
    box,
  }
}
