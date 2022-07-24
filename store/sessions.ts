import { readonly, ref, ComputedRef } from 'vue'
import { DateTime, Duration, DurationLikeObject } from 'luxon'
import type { Box, Card } from '@/server/trpc/types'
import { addError as addCardError, addSuccess as addCardSuccess } from './cards'

const LEARN_DURATION_DIFF = 30

function isOlderThan(date: Date, duration: DurationLikeObject) {
  return (
    DateTime.now().diff(DateTime.fromJSDate(date)).minus(duration).toMillis() >
    0
  )
}

function hasLessSuccessThan(card: Card, successCount: number) {
  return card.successCount < successCount
}

function isRelevant(card: Card, addSuccessCount = 0) {
  for (let step = 1; step < 5; step++) {
    if (!card.lastTryAt) {
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
      hasLessSuccessThan(card, successCount) &&
      (!duration || isOlderThan(card.lastTryAt, duration))
    ) {
      return true
    }
  }
  return false
}

export function useSession(box: ComputedRef<Box>) {
  function getCardsToLearn(successDiffAdd = 0): Card[] {
    if (!box.value.cards.length) {
      return []
    }

    const cards = box.value.cards.filter((card) => {
      return isRelevant(card, successDiffAdd)
    })

    if (cards.length) {
      return cards
    }
    return getCardsToLearn(successDiffAdd + 1)
  }

  let lastCardIndex = 0
  const currentCard = ref(getCardsToLearn()[0])

  function nextCard() {
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

  async function addSuccess() {
    await addCardSuccess(box.value.id, currentCard.value.id)
  }

  async function addError() {
    await addCardError(box.value.id, currentCard.value.id)
  }

  return {
    currentCard: readonly(currentCard),
    nextCard,
    addSuccess,
    addError,
  }
}
