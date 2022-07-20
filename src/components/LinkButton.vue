<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'
import {
  useButtonStyleClasses,
  SizeClassKey,
} from '../hooks/use-button-style-classes'

const props = defineProps<{
  to: RouteLocationRaw
  primary?: boolean
  size?: SizeClassKey
}>()

const classes = useButtonStyleClasses(props)
</script>

<template>
  <router-link :to="to" :class="classes">
    <slot />
  </router-link>
</template>
