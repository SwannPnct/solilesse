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
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{rel: 'icon', type: 'image/x-icon', href: '/logo.webp'}]
    }
  }
})
