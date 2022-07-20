<script setup lang="ts">
import {
  useButtonStyleClasses,
  SizeClassKey,
} from '../hooks/use-button-style-classes'

const props = defineProps<{
  primary?: boolean
  size?: SizeClassKey
}>()

const classes = useButtonStyleClasses(props)
</script>

<template>
  <button :class="classes">
    <slot />
  </button>
</template>
