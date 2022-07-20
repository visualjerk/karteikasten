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
    <div class="grid gap-2 mb-6">
      <BoxCard v-for="(card, index) in box.cards" :key="index">
        <BoxCardInput v-model="card.front" readonly />
        <BoxCardInput v-model="card.back" readonly />
      </BoxCard>
    </div>
  </div>
</template>
