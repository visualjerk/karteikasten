<script setup lang="ts">
import {
  useButtonStyleClasses,
  SizeClassKey,
} from '@/hooks/use-button-style-classes'

const props = defineProps<{
  primary?: boolean
  size?: SizeClassKey
  busy?: boolean
}>()
const classes = computed(() => [
  ...useButtonStyleClasses(props).value,
  props.busy && 'relative pointer-events-none',
])
</script>

<template>
  <button :class="classes">
    <mdicon name="loading" class="animate-spin absolute" v-if="busy" />
    <span :class="busy && 'opacity-0'" class="flex"><slot /></span>
  </button>
</template>
