<script setup lang="ts">
import LinkButton from '../components/LinkButton.vue'
import { useBoxes } from '../store/boxes'

const { all: boxes } = useBoxes()
</script>

<template>
  <article class="text-lg text-slate-700">
    <h1 class="text-3xl mb-4 text-slate-800">Learn words and more</h1>
    <p class="mb-6">
      This tool helps you learn things like vocabulary, formula and everything
      else that fits on a card.
    </p>

    <h2 class="text-2xl mb-4">Your Boxes</h2>

    <div class="grid grid-cols-2 gap-4">
      <RouterLink
        to="/new-box"
        class="p-6 text-2xl border border-dashed rounded-lg hover:shadow-lg flex items-center justify-center gap-2"
      >
        <svg style="width: 30px; height: 30px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M11,7H13V11H17V13H13V17H11V13H7V11H11V7Z"
          />
        </svg>
        Create New Box</RouterLink
      >
      <RouterLink
        v-for="box in boxes"
        :key="box.id"
        :to="`/box/${box.id}`"
        class="p-6 text-2xl bg-white shadow-md rounded-lg hover:shadow-lg text-center"
      >
        {{ box.name }}
      </RouterLink>
    </div>
  </article>
</template>
