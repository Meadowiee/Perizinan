// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  future: {
    compatibilityVersion: 4
  },

  devtools: { enabled: true },
  modules: ['@mhmdzaien/nuxt-sequelize', '@nuxtjs/tailwindcss'],
  css: ["@/assets/css/main.css"]
})