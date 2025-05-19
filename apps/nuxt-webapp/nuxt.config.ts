// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  telemetry: false,
  compatibilityDate: '2024-04-26',
  modules: ['@shellicar/build-version/nuxt'],
  buildVersion: {
    versionCalculator: process.env.CI ? 'git' : undefined,
    debug: true,
  },
  ssr: false,
  devtools: { enabled: true },
  nitro: {
    preset: 'azure-functions',
  },
  vite: {
    clearScreen: false,
    server: {
      proxy: {
        '^/api/.*': {
          target: 'http://127.0.0.1:7071',
          secure: false,
          changeOrigin: true,
        },
      },
    },
  },
  devServer: {
    port: 3000,
  },
});
