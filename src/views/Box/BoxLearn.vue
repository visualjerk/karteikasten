<script setup lang="ts">
import LinkButton from '@/components/LinkButton.vue'
import ActionButton from '@/components/ActionButton.vue'
import QuestionCard from '@/components/QuestionCard.vue'

import { wait } from '@/utils/wait'
import { Box } from '@/store/boxes'
import { useSession, isRelevant } from '@/store/sessions'

const props = defineProps<{
  box: Box
}>()

const { currentCard, addError, addSuccess, nextCard, sessions } = useSession(
  props.box
)

async function handleSuccess() {
  addSuccess()
  await wait(1000)
  nextCard()
}

function handleError() {
  addError()
  nextCard()
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center gap-3 mb-8">
      <h1>{{ box.name }}</h1>
      <div class="flex gap-3">
        <LinkButton :to="`/box/${box.id}`">Stop Learning</LinkButton>
      </div>
    </div>
    <div>
      <div class="grid gap-5 mb-6">
        <QuestionCard :card="currentCard" @success="handleSuccess" />
        <ActionButton primary size="large" @click="handleError">
          Don't know
        </ActionButton>
      </div>
    </div>
    <div>
      <p v-for="card in box.cards" :key="card.id">
        {{ card.front }}: success:
        {{ sessions[box.id].cardStates[card.id].successCount }} | error:
        {{ sessions[box.id].cardStates[card.id].errorCount }} | seconds ago:
        {{
          (new Date().getTime() -
            new Date(
              sessions[box.id].cardStates[card.id].lastResponse
            ).getTime()) /
          1000
        }}
        s |
        {{ isRelevant(sessions[box.id].cardStates[card.id]) && 'relevant' }}
      </p>
    </div>
  </div>
</template>
