// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  telemetry: false,
  devtools: { enabled: true },
  compatibilityDate: '2025-04-26',
  vite: {
    clearScreen: false,
  },
  devServer: {
    host: '0.0.0.0',
    port: 3001,
  },
});
