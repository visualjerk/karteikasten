<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'

defineProps<{
  to: RouteLocationRaw
}>()
</script>

<template>
  <router-link
    :to="to"
    class="px-3 py-2 flex border-2 font-medium border-purple-600 rounded-md bg-purple-700 text-purple-50 hover:bg-purple-800"
  >
    <slot />
  </router-link>
</template>
