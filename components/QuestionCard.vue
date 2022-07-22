<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue'

import { Card } from '@/store/boxes'
import { ref, unref, computed, watch, onMounted } from 'vue'

const inputEl = ref()
const props = defineProps<{
  card: Card
  showBack?: boolean
}>()
const emit = defineEmits<{
  (e: 'success'): void
  (e: 'error'): void
  (e: 'skip'): void
}>()

const answer = ref('')
const hasCorrectAnswer = computed(
  () => unref(answer).toLowerCase() === props.card.back.toLowerCase()
)
watch(hasCorrectAnswer, (value) => {
  if (value) {
    emit('success')
  }
})

watch(() => props.card, reset)

function reset() {
  answer.value = ''
  unref(inputEl).focus()
}

async function handleError() {
  emit('error')
}

async function handleSkip() {
  emit('skip')
}

defineExpose({
  reset,
})

onMounted(reset)
</script>

<template>
  <div
    class="grid gap-4 p-4 sm:p-10 border rounded-2xl shadow-2xl text-center"
    :class="[
      hasCorrectAnswer
        ? 'border-green-600 bg-green-50 shadow-green-300'
        : 'border-slate-200 bg-white shadow-slate-300',
    ]"
  >
    <h2 class="text-2xl sm:text-6xl font-medium text-slate-700 sm:mb-6">
      {{ card.front }}
    </h2>
    <div class="sm:mb-6">
      <input
        v-if="showBack"
        ref="inputEl"
        class="w-full text-2xl sm:text-6xl text-slate-700 text-center font-medium bg-slate-200 p-2 rounded-xl outline-none"
        :value="card.back"
        readonly
      />
      <input
        v-else
        ref="inputEl"
        class="w-full text-2xl sm:text-6xl text-slate-700 text-center font-medium bg-slate-200 p-2 rounded-xl focus:outline-8"
        :class="[
          hasCorrectAnswer
            ? 'focus:bg-green-300 focus:outline-green-500'
            : 'focus:bg-purple-200 focus:outline-purple-500',
        ]"
        autofocus
        v-model="answer"
      />
    </div>
    <ActionButton v-if="showBack" primary size="large" @click="handleSkip">
      Next Card
      <svg style="width: 24px; height: 24px" viewBox="0 0 24 24" class="ml-2">
        <path
          fill="currentColor"
          d="M14 16.94V12.94H5.08L5.05 10.93H14V6.94L19 11.94Z"
        />
      </svg>
    </ActionButton>
    <div v-else class="grid grid-cols-2 gap-4">
      <ActionButton size="large" @click="handleError">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24" class="mr-2">
          <path
            fill="currentColor"
            d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"
          />
        </svg>
        Show <span class="hidden sm:inline">Answer</span>
      </ActionButton>
      <ActionButton primary size="large" @click="handleSkip">
        Skip <span class="hidden sm:inline">Card</span>
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24" class="ml-2">
          <path
            fill="currentColor"
            d="M14 16.94V12.94H5.08L5.05 10.93H14V6.94L19 11.94Z"
          />
        </svg>
      </ActionButton>
    </div>
  </div>
</template>
