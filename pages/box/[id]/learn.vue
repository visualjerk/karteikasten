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
          <mdicon name="stop-circle-outline" class="sm:mr-2" />
          <span class="hidden sm:inline">Stop Learning</span>
        </LinkButton>
      </div>
    </div>
    <div class="relative">
      <div
        class="absolute inset-0 bg-white rounded-2xl shadow-lg translate-y-6 md:translate-y-11 scale-90"
      ></div>
      <div
        class="absolute inset-0 bg-white rounded-2xl shadow-xl translate-y-3 md:translate-y-6 scale-95"
      ></div>
      <TransitionGroup
        tag="div"
        class="relative"
        enter-active-class="absolute inset-0 duration-300 ease-out"
        enter-from-class="transform motion-safe:translate-y-3 md:motion-safe:translate-y-6 motion-safe:scale-95"
        leave-active-class="relative duration-300 ease-out z-10"
        leave-from-class="transform opacity-100"
        leave-to-class="opacity-0 motion-safe:-translate-y-10 md:motion-safe:-translate-y-20 motion-safe:scale-105"
      >
        <QuestionCard
          ref="boxEl"
          :key="currentCard.id"
          :card="currentCard"
          :show-back="showBack"
          @success="handleSuccess"
          @error="handleError"
          @skip="handleSkip"
        />
      </TransitionGroup>
    </div>
  </div>
</template>
