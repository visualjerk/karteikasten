<script setup lang="ts">
import LinkButton from '../components/LinkButton.vue'
import ActionButton from '../components/ActionButton.vue'
import BoxCard from '../components/BoxCard.vue'
import BoxCardInput from '../components/BoxCardInput.vue'

import { computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBoxes } from '../store/boxes'

const { push } = useRouter()
const route = useRoute()
const { get, remove } = useBoxes()
const box = computed(() => get(Number(route.params.id)))

async function handleRemove() {
  if (!box.value) {
    return
  }
  const sure = confirm(`Do you really want to delete ${box.value.name}?`)
  if (!sure) {
    return
  }
  push('/')
  await nextTick()
  remove(box.value.id)
}
</script>

<template>
  <h1 v-if="!box">Box not found</h1>
  <div v-else>
    <div class="flex justify-between items-center gap-3 mb-8">
      <h1>
        {{ box.name }}
      </h1>
      <div class="flex gap-3">
        <ActionButton @click="handleRemove">Delete</ActionButton>
        <LinkButton :to="`/box/${box.id}/edit`">Edit</LinkButton>
      </div>
    </div>
    <router-link
      v-if="!box.cards.length"
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
    </router-link>
    <div v-else>
      <div class="flex justify-center gap-3">
        <ActionButton primary size="large" class="mb-8">
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
