<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBoxes } from '@/store/boxes'

const route = useRoute()
const { get } = useBoxes()
const box = computed(() => get(route.params.id as string))
</script>

<template>
  <h1 v-if="!box">Box not found</h1>
  <router-view v-else :box="box" />
</template>
