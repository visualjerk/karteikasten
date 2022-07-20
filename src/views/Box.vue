<script setup lang="ts">
import LinkButton from '../components/LinkButton.vue'
import BoxCard from '../components/BoxCard.vue'
import BoxCardInput from '../components/BoxCardInput.vue'

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBoxes } from '../store/boxes'

const route = useRoute()
const { get } = useBoxes()
const box = computed(() => get(Number(route.params.id)))
</script>

<template>
  <h1 v-if="!box">Box not found</h1>
  <div v-else>
    <div class="flex justify-between items-center gap-3 mb-6">
      <h1>
        {{ box.name }}
      </h1>
      <LinkButton :to="`/box/${box.id}/edit`">Edit</LinkButton>
    </div>
    <div class="grid gap-2 mb-4">
      <BoxCard v-for="(card, index) in box.cards" :key="index">
        <BoxCardInput v-model="card.front" readonly />
        <BoxCardInput v-model="card.back" readonly />
      </BoxCard>
    </div>
  </div>
</template>
