<script setup lang="ts">
import LinkButton from '@/components/LinkButton.vue'
import ActionButton from '@/components/ActionButton.vue'
import BoxCard from '@/components/BoxCard.vue'
import BoxCardInput from '@/components/BoxCardInput.vue'

import { nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Box, useBoxes } from '@/store/boxes'

const props = defineProps<{
  box: Box
}>()

const { push } = useRouter()
const { remove } = useBoxes()

async function handleRemove() {
  if (!props.box) {
    return
  }
  const sure = confirm(`Do you really want to delete ${props.box.name}?`)
  if (!sure) {
    return
  }
  push('/')
  await nextTick()
  remove(props.box.id)
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center gap-3 mb-8">
      <h1>{{ box.name }}</h1>
      <div class="flex gap-3">
        <ActionButton @click="handleRemove">Delete</ActionButton>
        <LinkButton :to="`/box/${box.id}/edit`">Edit</LinkButton>
      </div>
    </div>
    <div>
      <div class="grid sm:grid-cols-2 gap-5 py-4 mb-10">
        <ActionButton primary size="large">
          <svg
            style="width: 24px; height: 24px"
            viewBox="0 0 24 24"
            class="mr-2"
          >
            <path
              fill="currentColor"
              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z"
            />
          </svg>
          Start Learning
        </ActionButton>
        <ActionButton size="large"> Reset Learning Progress </ActionButton>
      </div>
      <div class="grid gap-2 mb-6">
        <BoxCard v-for="(card, index) in box.cards" :key="index">
          <BoxCardInput :model-value="card.front" readonly />
          <BoxCardInput :model-value="card.back" readonly />
        </BoxCard>
      </div>
    </div>
  </div>
</template>
