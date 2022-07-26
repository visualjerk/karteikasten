<script setup lang="ts">
import LinkButton from '@/components/LinkButton.vue'
import { useBox } from '@/store/boxes'

const route = useRoute()
const { data: box, pending } = await useBox(Number(route.params.id))
</script>

<template>
  <article>
    <Transition
      enter-active-class="duration-200 ease-in"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="absolute"
    >
      <div v-if="box" key="page">
        <NuxtPage :box="box" />
      </div>
      <div v-else-if="pending" key="pending">
        <div
          class="h-9 mt-2 mb-9 w-1/3 bg-slate-200 rounded-lg animate-pulse"
        ></div>
        <div class="h-80 mt-2 bg-slate-200 rounded-lg animate-pulse"></div>
      </div>
      <div v-else key="notfound">
        <h1 class="mb-8">Box not found</h1>
        <div
          class="p-8 border border-slate-300 border-dashed rounded-lg flex flex-col items-center justify-center"
        >
          <mdicon
            name="emoticon-sad-outline"
            size="60"
            class="mb-4 text-slate-300"
          />
          <p class="mb-8">
            Oh snap ... the box you are looking for does not exists.
          </p>
          <LinkButton to="/" primary size="large">Go back home </LinkButton>
        </div>
      </div>
    </Transition>
  </article>
</template>
