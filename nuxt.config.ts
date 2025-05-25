// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  css: ['~/assets/css/tailwind.css'],
  routeRules: {
    // Cache all posts page for 15 minutes (900 seconds)
    '/posts': { ssr: true, swr: 900 },
    // Cache individual post pages for 15 minutes
    '/posts/**': { ssr: true, swr: 900 },
  }
})
