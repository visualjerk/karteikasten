<script setup lang="ts">
import MenuItem from '@/components/MenuItem.vue'
import ActionButton from '@/components/ActionButton.vue'

import { login, logout, useUser } from '@/store/auth'
import type { GithubUser, AnonymousUser } from '@/server/trpc/context'

const { pending, data } = await useUser()

// Hopefully there is a better way to do this
// Looks like nuxt-trpc infers the type incorrectly
const user = computed<GithubUser | AnonymousUser | null>(() => {
  const user = data.value as GithubUser | AnonymousUser | null
  if (user && 'githubId' in user) {
    return user as GithubUser
  }
  return user
})

useHead({
  title: 'Karteikasten | Atomic Learning',
})
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header
      class="flex items-center gap-3 p-2 justify-between sticky top-0 z-10 bg-slate-50 border-b border-slate-200"
    >
      <NuxtLink to="/" class="text-purple-600 flex gap-1 items-center pl-2">
        <div
          class="bg-purple-800 h-7 w-7 flex items-center shrink-0 justify-center mr-1 rounded-full text-purple-300"
        >
          <mdicon name="school" size="20" />
        </div>
        <span class="font-bold text-purple-800 inline-block">Karteikasten</span>
        <span class="hidden sm:inline">|</span>
        <span class="hidden sm:inline">Atomic Learning</span>
      </NuxtLink>
      <div class="flex items-center gap-8">
        <nav class="flex items-center gap-2 hidden md:block">
          <MenuItem to="/">Your Boxes</MenuItem>
          <MenuItem to="/about">About</MenuItem>
        </nav>
        <nav class="flex items-center justify-end gap-2 w-48">
          <Transition
            enter-active-class="duration-200 ease-in"
            enter-from-class="transform opacity-0"
            enter-to-class="opacity-100"
          >
            <div v-if="!pending && user">
              <ActionButton
                @click="login"
                size="small"
                v-if="!user || !('githubId' in user)"
              >
                Login with GitHub
              </ActionButton>
              <ActionButton @click="logout" size="small" v-else>
                <img
                  :src="user.avatarUrl"
                  class="w-5 rounded-full border border-slate-300 mr-2"
                />
                Logout
              </ActionButton>
            </div>
          </Transition>
          <a
            href="https://github.com/visualjerk/karteikasten"
            class="flex px-2 py-1 text-slate-600 hover:text-slate-800"
            title="Open GitHub Repo"
            target="_blank"
          >
            <mdicon name="github" />
          </a>
        </nav>
      </div>
    </header>

    <main class="py-6 sm:py-10 px-4 max-w-screen-md m-auto">
      <NuxtPage />
    </main>
  </div>
</template>
