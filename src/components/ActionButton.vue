<script setup lang="ts">
import {
  useButtonStyleClasses,
  ButtonStyleProps,
} from '@/hooks/use-button-style-classes'

interface ButtonProps extends ButtonStyleProps {}

const props = defineProps<ButtonProps>()
const classes = useButtonStyleClasses(props)
</script>

<template>
  <button :class="classes">
    <slot />
  </button>
</template>
