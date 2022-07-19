<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'

defineProps<{
  to: RouteLocationRaw
}>()
</script>

<template>
  <router-link
    :to="to"
    custom
    v-slot="{ href, route, navigate, isActive, isExactActive }"
  >
    <a
      :href="href"
      @click="navigate"
      class="px-4 py-1 flex rounded-md hover:text-purple-700 font-medium"
      :class="[isExactActive ? 'text-purple-800' : 'text-slate-400']"
      ><slot
    /></a>
  </router-link>
</template>
