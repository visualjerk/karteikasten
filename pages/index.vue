<script setup lang="ts">
import { useBoxes } from '@/store/boxes'
const { data: boxes } = await useBoxes()
</script>

<template>
  <article>
    <h1 class="mb-8">Atomic Learning</h1>
    <p class="mb-10">
      This tool helps you learn "atomic" things like vocabulary, formula and
      everything else that fits on a card. Read more about it in our
      <NuxtLink to="/about" class="text-purple-600 hover:text-purple-700"
        >about page</NuxtLink
      >.
    </p>

    <h2 class="mb-4">Your Boxes</h2>

    <div class="grid sm:grid-cols-2 gap-6">
      <NuxtLink
        to="/new-box"
        class="sm:h-40 p-6 text-2xl border border-slate-300 border-dashed rounded-lg hover:shadow-lg flex items-center justify-center gap-2"
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
        <div v-for="(box, index) in boxes" :key="index" class="relative">
          <div class="absolute top-1 inset-x-4">
            <div
              class="absolute inset-x-4 -bottom-1 h-4 bg-white shadow-sm shadow-slate-300 border-t rounded-t-md border-slate-200 scale-90 -translate-y-2"
            ></div>
            <div
              class="absolute inset-x-4 -bottom-1 h-4 bg-white shadow-sm shadow-slate-300 border-t rounded-t-md border-slate-200 scale-95 -translate-y-1"
            ></div>
            <div
              class="absolute inset-x-4 -bottom-1 h-4 bg-gradient-to-t from-slate-300 to-white shadow-md shadow-slate-300 border-t rounded-t-md border-slate-200"
            ></div>
          </div>
          <NuxtLink
            :to="`/box/${box.id}`"
            class="sm:h-40 p-6 text-2xl bg-white shadow-md rounded-lg hover:shadow-lg flex flex-col items-center justify-center relative border-t border-slate-200"
          >
            <h3>{{ box.name }}</h3>
            <p class="text-sm">{{ box._count.cards }} Cards</p>
          </NuxtLink>
        </div>
      </TransitionGroup>
    </div>
  </article>
</template>
