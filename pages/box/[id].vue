<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const { data: box, pending } = await useAsyncQuery([
  'boxes.get',
  {
    id: Number(route.params.id),
  },
])
</script>

<template>
  <article>
    <h1 v-if="pending">Loading ...</h1>
    <h1 v-else-if="!box">Box not found</h1>
    <NuxtPage v-else :box="box" />
  </article>
</template>
