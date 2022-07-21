<script setup lang="ts">
import { Card } from '@/store/boxes'
import { ref, unref, computed, watch } from 'vue'

const inputEl = ref()
const props = defineProps<{
  card: Card
}>()
const emit = defineEmits<{
  (e: 'success'): void
}>()

const answer = ref('')
const hasCorrectAnswer = computed(() => unref(answer) === props.card.back)
watch(hasCorrectAnswer, (value) => {
  if (value) {
    emit('success')
  }
})

watch(
  () => props.card,
  () => {
    answer.value = ''
  }
)

function reset() {
  answer.value = ''
  unref(inputEl).focus()
}

defineExpose({
  reset,
})
</script>

<template>
  <div
    class="flex items-center flex-col p-8 pt-4 border rounded-2xl shadow-2xl"
    :class="[
      hasCorrectAnswer
        ? 'border-green-600 bg-green-50 shadow-green-300'
        : 'border-slate-200 bg-white shadow-slate-300',
    ]"
  >
    <h2 class="text-9xl text-slate-700">{{ card.front }}</h2>
    <input
      ref="inputEl"
      class="text-7xl text-center font-medium text-slate-800 bg-slate-200 max-w-[10rem] p-2 mt-8 rounded-xl focus:outline-8"
      :class="[
        hasCorrectAnswer
          ? 'focus:bg-green-300 focus:outline-green-500'
          : 'focus:bg-purple-200 focus:outline-purple-500',
      ]"
      autofocus
      v-model="answer"
    />
  </div>
</template>
