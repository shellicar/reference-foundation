// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  telemetry: false,
  compatibilityDate: '2024-04-03',
  modules: ['@shellicar/build-version/nuxt'],
  devtools: { enabled: true },
  nitro: {
    preset: 'azure-functions',
  },
  devServer: {
    port: 3000,
  },
});
