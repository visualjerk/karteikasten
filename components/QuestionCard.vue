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
        ? 'border-green-200 bg-green-50 shadow-green-300'
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
      <mdicon name="arrow-right-thin" class="ml-2" />
    </ActionButton>
    <div v-else class="grid grid-cols-2 gap-4">
      <ActionButton size="large" @click="handleError">
        <mdicon name="eye-outline" class="mr-2" />
        Show <span class="hidden sm:inline">Answer</span>
      </ActionButton>
      <ActionButton primary size="large" @click="handleSkip">
        Skip <span class="hidden sm:inline">Card</span>
        <mdicon name="arrow-right-thin" class="ml-2" />
      </ActionButton>
    </div>
  </div>
</template>
