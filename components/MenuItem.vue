<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'

defineProps<{
  to: RouteLocationRaw
}>()
</script>

<template>
  <NuxtLink :to="to" custom v-slot="{ href, navigate, isExactActive }">
    <a
      :href="href"
      @click="navigate"
      class="px-4 py-1 hover:text-purple-800 font-medium"
      :class="[isExactActive ? 'text-purple-700' : 'text-slate-400']"
      v-bind="$attrs"
      ><slot
    /></a>
  </NuxtLink>
</template>
