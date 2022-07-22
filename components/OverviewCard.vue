<script setup lang="ts">
import { Card } from '@/store/boxes'
import { CardState } from '@/store/sessions'
import { computed } from 'vue'

const props = defineProps<{
  card: Card
  cardState: CardState
}>()
const accuracy = computed(() => {
  const { errorCount, successCount } = props.cardState
  if (successCount === 0) {
    return 0
  }
  return successCount / (errorCount + successCount)
})
</script>

<template>
  <div
    class="grid gap-2 p-6 bg-white rounded-md shadow-sm focus-within:shadow-md text-center"
  >
    <div class="text-xl text-slate-700 font-medium">{{ card.front }}</div>
    <div class="text-lg text-slate-500 font-medium mb-3">{{ card.back }}</div>
    <div class="bg-slate-300 overflow-hidden rounded-lg">
      <div
        class="h-3 bg-green-600"
        :style="{ width: `${accuracy * 100}%` }"
      ></div>
    </div>
  </div>
</template>
