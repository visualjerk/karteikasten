<script setup lang="ts">
import { computed } from 'vue'
import ActionButton from '../components/ActionButton.vue'
import { useBox } from '../store/boxes'
import { useRoute } from 'vue-router'

const route = useRoute()
const { box } = useBox(computed(() => Number(route.params.id)))
</script>

<template>
  <div v-if="!box">Box not found</div>
  <div v-else class="">
    <h1 class="text-3xl mb-4 text-slate-800 w-full bg-transparent">
      {{ box.name }}
    </h1>
    <div class="grid gap-2 mb-4">
      <div
        class="grid grid-cols-2"
        v-for="(card, index) in box.cards"
        :key="index"
      >
        <input ref="inputFrontEl" class="p-2" v-model="card.front" readonly />
        <input class="p-2" v-model="card.back" readonly />
      </div>
    </div>
  </div>
</template>
