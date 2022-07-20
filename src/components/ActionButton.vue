<script setup lang="ts">
defineProps<{
  primary?: boolean
}>()
</script>

<template>
  <button
    class="px-3 py-2 flex border-2 font-medium rounded-md focus-visible:outline-2 outline-blue-500 outline-offset-4 hover:shadow-md"
    :class="[
      primary
        ? 'border-purple-600 bg-purple-700 text-purple-50 hover:bg-purple-800'
        : 'border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100',
    ]"
  >
    <slot />
  </button>
</template>
