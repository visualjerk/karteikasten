<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'
import {
  useButtonSizeClass,
  SizeClassKey,
} from '../hooks/use-button-size-class'

const props = defineProps<{
  to: RouteLocationRaw
  primary?: boolean
  size?: SizeClassKey
}>()

const sizeClass = useButtonSizeClass(props.size)
</script>

<template>
  <router-link
    :to="to"
    class="px-6 py-2 flex items-center border-2 font-medium rounded-md focus-visible:outline-2 outline-blue-500 outline-offset-4 hover:shadow-md"
    :class="[
      sizeClass,
      primary
        ? 'border-purple-600 bg-purple-700 text-purple-50 hover:bg-purple-800 hover:shadow-purple-300'
        : 'border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800',
    ]"
  >
    <slot />
  </router-link>
</template>
