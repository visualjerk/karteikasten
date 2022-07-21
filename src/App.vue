<script setup lang="ts">
import MenuItem from '@/components/MenuItem.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header
      class="flex items-center gap-3 p-2 justify-between sticky top-0 z-10 bg-slate-50 border-b border-slate-200"
    >
      <router-link to="/" class="text-purple-600 flex gap-1 items-center pl-2">
        <div
          class="bg-purple-800 h-7 w-7 flex items-center justify-center mr-1 rounded-full text-purple-300"
        >
          <svg style="width: 20px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"
            />
          </svg>
        </div>
        <span class="font-bold text-purple-800 inline-block">Karteikasten</span>
        <span>|</span>
        Atomic Learning
      </router-link>
      <nav class="flex items-center gap-2">
        <MenuItem to="/">Your Boxes</MenuItem>
      </nav>
    </header>

    <main class="py-10 px-4 max-w-screen-md m-auto">
      <router-view />
    </main>
  </div>
</template>
