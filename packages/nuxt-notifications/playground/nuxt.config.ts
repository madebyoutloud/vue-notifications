import { defineNuxtConfig } from 'nuxt/config'
import module from '../src/module'

export default defineNuxtConfig({
  modules: [
    'nuxt-icon',
    [module as any, {
      duration: 8000,
    }],
  ],

  notifications: {
    max: 10,
    duration: 6000,
  },

})
