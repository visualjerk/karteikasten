<script setup lang="ts">
import { useBoxes } from '@/store/boxes'
const { data: boxes } = await useBoxes()
</script>

<template>
  <article>
    <h1 class="mb-4">Atomic Learning</h1>
    <p class="mb-6">
      This tool helps you learn "atomic" things like vocabulary, formula and
      everything else that fits on a card.
    </p>

    <h2 class="mb-4">Your Boxes</h2>

    <div class="grid sm:grid-cols-2 gap-4">
      <NuxtLink
        to="/new-box"
        class="sm:h-40 p-6 text-2xl border border-dashed rounded-lg hover:shadow-lg flex items-center justify-center gap-2"
      >
        <mdicon name="plus-box-outline" size="30" />
        Create New Box
      </NuxtLink>
      <TransitionGroup
        enter-active-class="duration-200 ease-in"
        enter-from-class="transform opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="transform opacity-100"
        leave-to-class="opacity-0"
      >
        <NuxtLink
          v-for="(box, index) in boxes"
          :key="index"
          :to="`/box/${box.id}`"
          class="sm:h-40 p-6 text-2xl bg-white shadow-md rounded-lg hover:shadow-lg flex flex-col items-center justify-center"
        >
          <h3>{{ box.name }}</h3>
          <p class="text-sm">{{ box._count.cards }} Cards</p>
        </NuxtLink>
      </TransitionGroup>
    </div>
  </article>
</template>
