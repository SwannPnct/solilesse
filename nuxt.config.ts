// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/eslint-module', { /* module options */ }],
    'shadcn-nuxt',
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/tailwind.css'],
  imports: {
    dirs: ['stores']
  },
  runtimeConfig: {
    public: {
      dbName: "SOLILESSE",
      dbVersion: 1,
    }
  }
})
