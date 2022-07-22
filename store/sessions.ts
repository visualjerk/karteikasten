import { createGlobalState, useStorage } from '@vueuse/core'
import { readonly, ref } from 'vue'
import { DateTime, Duration, DurationLikeObject } from 'luxon'
import type { Box, Card } from './boxes'

export interface CardState {
  successCount: number
  errorCount: number
  lastResponse?: string
}

export interface Session {
  cardStates: Record<string, CardState>
}

const LEARN_DURATION_DIFF = 30

const useGlobalSessionState = createGlobalState(() =>
  useStorage<Record<string, Session>>('karteikasten-sessions', {})
)

function getCurrentDate() {
  return DateTime.now().toString()
}

function isOlderThan(date: string, duration: DurationLikeObject) {
  return (
    DateTime.now().diff(DateTime.fromISO(date)).minus(duration).toMillis() > 0
  )
}

function hasLessSuccessThan(cardState: CardState, successCount: number) {
  return cardState.successCount < successCount
}

function isRelevant(cardState: CardState, addSuccessCount = 0) {
  for (let step = 1; step < 5; step++) {
    if (!cardState.lastResponse) {
      return true
    }

    const successCount = step + addSuccessCount
    const duration =
      step === 1
        ? null
        : Duration.fromDurationLike({
            seconds: LEARN_DURATION_DIFF * step,
          })

    if (
      hasLessSuccessThan(cardState, successCount) &&
      (!duration || isOlderThan(cardState.lastResponse, duration))
    ) {
      return true
    }
  }
  return false
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

  function reset() {
    const session = getSession()
    session.cardStates = {}
  }

  function getCardState(card?: Card) {
    const id = card?.id || currentCard.value.id
    const session = getSession()
    let cardState = session.cardStates[id]

    if (!cardState) {
      cardState = {
        successCount: 0,
        errorCount: 0,
      }
      session.cardStates[id] = cardState
    }

    return cardState
  }

  function getCardsToLearn(successDiffAdd = 0): Card[] {
    if (!box.cards.length) {
      return []
    }

    const cards = box.cards.filter((card) => {
      const cardState = getCardState(card)

      return isRelevant(cardState, successDiffAdd)
    })

    if (cards.length) {
      return cards
    }
    return getCardsToLearn(successDiffAdd + 1)
  }

  let lastCardIndex = 0
  const currentCard = ref(getCardsToLearn()[0])

  function nextCard(): void {
    const cards = getCardsToLearn()
    let nextCard = cards[lastCardIndex]

    if (!nextCard) {
      nextCard = cards[0]
    }

    if (currentCard.value.id !== nextCard?.id) {
      currentCard.value = nextCard
      return
    }

    lastCardIndex = (lastCardIndex + 1) % cards.length
    currentCard.value = cards[lastCardIndex]
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
    getCardState,
    nextCard,
    addSuccess,
    addError,
    reset,
  }
}
