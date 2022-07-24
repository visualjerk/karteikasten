<script setup lang="ts">
import LinkButton from '@/components/LinkButton.vue'
import QuestionCard from '@/components/QuestionCard.vue'

import { nextTick, ref } from 'vue'
import { wait } from '@/utils/wait'
import { Box } from '@/server/trpc/types'
import { useSession } from '@/store/sessions'

const props = defineProps<{
  box: Box
}>()

const showBack = ref(false)
const boxEl = ref()
const { currentCard, addError, addSuccess, nextCard } = useSession(
  computed(() => props.box)
)

async function handleSuccess() {
  await Promise.all([addSuccess(), wait(1000)])
  nextCard()
  await nextTick()
  boxEl.value.reset()
}

async function handleError() {
  showBack.value = true
  await addError()
}

async function handleSkip() {
  showBack.value = false
  nextCard()
  await nextTick()
  boxEl.value.reset()
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center gap-3 mb-4 sm:mb-8">
      <h1>{{ box.name }}</h1>
      <div class="flex gap-3">
        <LinkButton :to="`/box/${box.id}`">
          <svg
            style="width: 24px; height: 24px"
            viewBox="0 0 24 24"
            class="sm:mr-2"
          >
            <path
              fill="currentColor"
              d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M9,9V15H15V9"
            />
          </svg>
          <span class="hidden sm:inline">Stop Learning</span>
        </LinkButton>
      </div>
    </div>
    <div>
      <div class="grid gap-5 mb-6">
        <QuestionCard
          ref="boxEl"
          :card="currentCard"
          :show-back="showBack"
          @success="handleSuccess"
          @error="handleError"
          @skip="handleSkip"
        />
      </div>
    </div>
  </div>
</template>
