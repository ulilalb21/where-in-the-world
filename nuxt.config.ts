// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxtjs/google-fonts', "@nuxt/image"],
  compatibilityDate: '2024-08-22',
  colorMode: {
    classSuffix: '',
  },
  googleFonts: {
    families: {
      Nunito: [300, 600, 800],
    },
    preload: true,
  },
});