import { createGlobalState, MaybeComputedRef, useStorage } from '@vueuse/core'
import { readonly, unref, ref, computed } from 'vue'
import { cloneDeep } from 'lodash-es'
import type { Box, Card } from './boxes'

export interface CardState {
  successCount: number
  errorCount: number
  lastResponse: string
}

export interface Session {
  cardStates: Record<string, CardState>
}

const useGlobalSessionState = createGlobalState(() =>
  useStorage<Record<string, Session>>('karteikasten-sessions', {})
)

export function useSession(box: Box) {
  const all = useGlobalSessionState()
  let session = all.value[box.id]

  if (!session) {
    session = {
      cardStates: {},
    }
    all.value[box.id] = session
  }

  const currentCardIndex = ref(0)
  const currentCard = computed(() => box.cards[currentCardIndex.value])

  function nextCard(): void {
    currentCardIndex.value = (currentCardIndex.value + 1) % box.cards.length
  }

  return {
    currentCard: readonly(currentCard),
    nextCard,
  }
}
