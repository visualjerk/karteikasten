<script setup lang="ts">
import {
  useButtonSizeClass,
  SizeClassKey,
} from '../hooks/use-button-size-class'

const props = defineProps<{
  primary?: boolean
  size: SizeClassKey
}>()

const sizeClass = useButtonSizeClass(props.size)
</script>

<template>
  <button
    class="flex items-center border-2 font-medium rounded-md focus-visible:outline-2 outline-blue-500 outline-offset-4 hover:shadow-md"
    :class="[
      sizeClass,
      primary
        ? 'border-purple-600 bg-purple-700 text-purple-50 hover:bg-purple-800 hover:shadow-purple-300'
        : 'border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800',
    ]"
  >
    <slot />
  </button>
</template>
