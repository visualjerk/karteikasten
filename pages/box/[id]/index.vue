<script setup lang="ts">
import LinkButton from '@/components/LinkButton.vue'
import ActionButton from '@/components/ActionButton.vue'
import OverviewCard from '@/components/OverviewCard.vue'

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
          <mdicon name="delete-outline" />
        </ActionButton>
        <LinkButton :to="`/box/${box.id}/edit`">
          <mdicon name="pencil-outline" />
        </LinkButton>
      </div>
    </div>
    <NuxtLink
      v-if="!box.cards?.length"
      :to="`/box/${box.id}/edit`"
      class="p-6 text-2xl h-36 border border-slate-300 border-dashed rounded-lg hover:shadow-lg flex items-center justify-center gap-2"
    >
      <mdicon name="plus-box-outline" size="30" />
      Add cards to this box
    </NuxtLink>
    <div v-else>
      <div
        class="grid sm:grid-cols-2 gap-5 p-5 md:p-7 mb-10 rounded-lg border border-slate-300"
      >
        <LinkButton primary size="large" :to="`/box/${box.id}/learn`">
          <mdicon name="play-circle-outline" class="mr-1" />
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
