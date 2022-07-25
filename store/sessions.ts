import { readonly, ref, ComputedRef } from 'vue'
import { DateTime, Duration, DurationLikeObject } from 'luxon'
import {
  addError as addCardError,
  addSuccess as addCardSuccess,
  getAccuracy,
} from './cards'
import type { Box, Card } from '@/server/trpc/types'

const LEARN_DURATION_DIFF = 60 * 60 * 4 // 4 hours
const ACCURACY_STEPS = [0.5, 0.7, 0.9, 1]

function hasLessOrEqualAccuracyAs(card: Card, accuracy: number) {
  return getAccuracy(card) <= accuracy
}

function isOlderThan(date: Date, duration: DurationLikeObject) {
  return (
    DateTime.now().diff(DateTime.fromJSDate(date)).minus(duration).toMillis() >
    0
  )
}

function isRelevant(card: Card, reduceDurationFactor = 0) {
  return ACCURACY_STEPS.some((accuracy, index) => {
    if (!card.lastTryAt) {
      return true
    }

    // Reduce the needed duration with each new
    const durationFactor = index - reduceDurationFactor
    const duration =
      durationFactor <= 0
        ? null
        : Duration.fromDurationLike({
            seconds: LEARN_DURATION_DIFF * durationFactor,
          })
    const isInDuration = duration ? isOlderThan(card.lastTryAt, duration) : true

    return isInDuration && hasLessOrEqualAccuracyAs(card, accuracy)
  })
}

export function useSession(box: ComputedRef<Box>) {
  function getCardsToLearn(reduceDurationFactor = 0): Card[] {
    const allCards = box.value.cards

    if (!box.value.cards.length) {
      return []
    }

    const cards = allCards.filter((card) => {
      return isRelevant(card, reduceDurationFactor)
    })

    // Ensure we have at least 1/3 of the cards
    if (cards.length > allCards.length / 3) {
      return cards
    }
    return getCardsToLearn(reduceDurationFactor + 1)
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
