<script setup lang="ts">
import { getAccuracy } from '@/store/cards'
import type { Card } from '@/server/trpc/types'

defineProps<{
  card: Card
}>()
</script>

<template>
  <div
    class="grid gap-2 p-6 bg-white rounded-md shadow-md focus-within:shadow-md text-center"
  >
    <div class="text-xl text-slate-700 font-medium">{{ card.front }}</div>
    <div class="text-lg text-slate-500 font-medium mb-3">{{ card.back }}</div>
    <div class="bg-slate-300 overflow-hidden rounded-lg">
      <div
        class="h-3 bg-green-600"
        :style="{ width: `${getAccuracy(card) * 100}%` }"
      ></div>
    </div>
  </div>
</template>
