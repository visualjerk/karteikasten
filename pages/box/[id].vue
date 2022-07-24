<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useBox } from '@/store/boxes'

const route = useRoute()
const { data: box, pending } = await useBox(Number(route.params.id))
</script>

<template>
  <article>
    <NuxtPage v-if="box" :box="box" />
    <h1 v-else-if="pending">Loading ...</h1>
    <h1 v-else>Box not found</h1>
  </article>
</template>
