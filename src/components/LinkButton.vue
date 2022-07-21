<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'
import {
  useButtonStyleClasses,
  ButtonStyleProps,
} from '@/hooks/use-button-style-classes'

interface ButtonProps extends ButtonStyleProps {
  to: RouteLocationRaw
}

const props = defineProps<ButtonProps>()
const classes = useButtonStyleClasses(props)
</script>

<template>
  <router-link :to="to" :class="classes">
    <slot />
  </router-link>
</template>
