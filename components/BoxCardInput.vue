<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <input
    class="p-2 text-lg text-slate-700 font-medium outline-none border-b-2 border-transparent focus:border-purple-600 hover:border-purple-600"
    :value="modelValue"
    @input="handleInput"
  />
</template>
