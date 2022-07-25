import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@/assets/css/main.css'],
  build: {
    postcss: {
      postcssOptions: require('./postcss.config.cjs'),
    },
    transpile: ['mdi-vue'],
  },
  modules: ['trpc-nuxt'],
  trpc: {
    baseURL: process.env.APP_URL || 'http://localhost:3000',
    endpoint: '/trpc',
  },
  typescript: {
    strict: true, // required to make input/output types work
  },
})
