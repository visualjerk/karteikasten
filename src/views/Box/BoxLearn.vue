<script setup lang="ts">
import LinkButton from '@/components/LinkButton.vue'
import ActionButton from '@/components/ActionButton.vue'
import QuestionCard from '@/components/QuestionCard.vue'

import { wait } from '@/utils/wait'
import { Box } from '@/store/boxes'
import { useSession } from '@/store/sessions'

const props = defineProps<{
  box: Box
}>()

const { currentCard, addError, addSuccess, nextCard } = useSession(props.box)

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
  </div>
</template>
