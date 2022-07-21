import {
  createGlobalState,
  MaybeComputedRef,
  MaybeRef,
  useStorage,
} from '@vueuse/core'
import { readonly, unref } from 'vue'
import { cloneDeep } from 'lodash-es'

export interface IdItem {
  id: string
}

export interface NewCard {
  front: string
  back: string
}

export interface Card extends NewCard, IdItem {}

export interface NewBox {
  name: string
  cards: NewCard[]
}

export interface Box extends NewBox, IdItem {
  cards: Card[]
}

const defaultBoxes: Box[] = [
  {
    id: '0',
    name: 'German',
    cards: [],
  },
  {
    id: '1',
    name: 'Spain',
    cards: [],
  },
  {
    id: '2',
    name: 'JS Syntax',
    cards: [],
  },
]

const useGlobalBoxesState = createGlobalState(() =>
  useStorage('karteikasten-boxes', defaultBoxes)
)

function getNextId(items: IdItem[]): string {
  const last = items.at(-1)
  const id = last ? Number(last.id) + 1 : 0
  return id.toString()
}

export function useBoxes() {
  const all = useGlobalBoxesState()

  function getById(id: MaybeComputedRef<string>) {
    return all.value.find((box) => box.id === unref(id))
  }

  function getIndexById(id: MaybeComputedRef<string>) {
    return all.value.findIndex((box) => box.id === unref(id))
  }

  function add({ name, cards }: NewBox) {
    const id = getNextId(all.value)
    const length = all.value.push({
      name,
      id,
      cards: [],
    })
    const box = all.value[length - 1]

    cards.forEach((card) => {
      addCardToBox(box, card)
    })
  }

  function remove(id: MaybeComputedRef<string>) {
    const index = getIndexById(id)
    all.value.splice(index, 1)
  }

  function set(box: Box) {
    const index = getIndexById(box.id)
    all.value[index] = box
  }

  function get(id: MaybeComputedRef<string>) {
    const box = getById(id)
    if (!box) {
      return null
    }
    return readonly(box)
  }

  function getCopy(id: MaybeComputedRef<string>) {
    const box = getById(id)
    if (!box) {
      return null
    }
    return cloneDeep(box)
  }

  function addCardToBox(box: Box, card: MaybeRef<NewCard>) {
    const { front, back } = unref(card)
    const sanitizedFront = front.trim()
    const sanitizedBack = back.trim()

    if (sanitizedFront === '' || sanitizedBack === '') {
      return
    }

    const id = getNextId(box.cards)

    box.cards.push({
      id,
      front: sanitizedFront,
      back: sanitizedBack,
    })
  }

  return {
    all: readonly(all),
    get,
    getCopy,
    add,
    set,
    remove,
    addCardToBox,
  }
}
