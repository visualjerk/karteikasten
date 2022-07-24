<script setup lang="ts">
import LinkButton from '@/components/LinkButton.vue'
import ActionButton from '@/components/ActionButton.vue'
import OverviewCard from '@/components/OverviewCard.vue'

import { useRouter } from 'vue-router'
import { deleteBox, resetBox } from '@/store/boxes'
import type { Box } from '@/server/trpc/types'

const props = defineProps<{
  box: Box
}>()
const { push } = useRouter()

const pending = ref(false)
async function handleRemove() {
  if (!props.box) {
    return
  }
  const sure = confirm(`Do you really want to delete ${props.box.name}?`)
  if (!sure) {
    return
  }
  pending.value = true
  await deleteBox(props.box)
  push('/')
  pending.value = false
}

async function handleReset() {
  const sure = confirm(
    `Do you really want to reset the learning state for ${props.box.name}?`
  )
  if (!sure) {
    return
  }
  await resetBox(props.box)
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center gap-3 mb-8">
      <h1>
        {{ box.name }}
      </h1>
      <div class="flex gap-3">
        <ActionButton @click="handleRemove">
          <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
            />
          </svg>
        </ActionButton>
        <LinkButton :to="`/box/${box.id}/edit`">
          <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
            />
          </svg>
        </LinkButton>
      </div>
    </div>
    <NuxtLink
      v-if="!box.cards?.length"
      :to="`/box/${box.id}/edit`"
      class="p-6 text-2xl h-36 border border-dashed rounded-lg hover:shadow-lg flex items-center justify-center gap-2"
    >
      <svg style="width: 30px; height: 30px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M11,7H13V11H17V13H13V17H11V13H7V11H11V7Z"
        />
      </svg>
      Add cards to this box
    </NuxtLink>
    <div v-else>
      <div
        class="grid sm:grid-cols-2 gap-5 p-5 md:p-7 mb-10 bg-slate-100 rounded-lg border border-slate-200"
      >
        <LinkButton primary size="large" :to="`/box/${box.id}/learn`">
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
        </LinkButton>
        <ActionButton @click="handleReset" size="large">
          Reset Learning Progress
        </ActionButton>
      </div>
      <div class="grid sm:grid-cols-2 gap-5 mb-6">
        <OverviewCard
          v-for="(card, index) in box.cards"
          :card="card"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>
