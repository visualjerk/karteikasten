import { createGlobalState, MaybeComputedRef, useStorage } from '@vueuse/core'
import { readonly, unref, ref, computed } from 'vue'
import { cloneDeep } from 'lodash-es'
import { DateTime } from 'luxon'
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

function getCurrentDate() {
  return DateTime.now().toString()
}

export function useSession(box: Box) {
  const sessions = useGlobalSessionState()

  function getSession() {
    let session = sessions.value[box.id]

    if (!session) {
      session = {
        cardStates: {},
      }
      sessions.value[box.id] = session
    }

    return session
  }

  function getCardState() {
    const session = getSession()
    let cardState = session.cardStates[currentCard.value.id]

    if (!cardState) {
      cardState = {
        successCount: 0,
        errorCount: 0,
        lastResponse: getCurrentDate(),
      }
      session.cardStates[currentCard.value.id] = cardState
    }

    return cardState
  }

  const currentCardIndex = ref(0)
  const currentCard = computed(() => box.cards[currentCardIndex.value])

  function nextCard(): void {
    currentCardIndex.value = (currentCardIndex.value + 1) % box.cards.length
  }

  function addSuccess(): void {
    const cardState = getCardState()
    cardState.successCount++
    cardState.lastResponse = getCurrentDate()
  }

  function addError(): void {
    const cardState = getCardState()
    cardState.errorCount++
    cardState.lastResponse = getCurrentDate()
  }

  return {
    currentCard: readonly(currentCard),
    nextCard,
    addSuccess,
    addError,
  }
}
