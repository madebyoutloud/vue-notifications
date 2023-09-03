import { createNotifications } from '@outloud/vue-notifications'
import { defineNuxtPlugin } from '#app'
// @ts-expect-error this file will be created by module
import { options } from '#build/nuxt-notifications.options'

export default defineNuxtPlugin(({ vueApp }) => {
  const { defaults, ...config } = options
  const plugin = createNotifications(config)

  if (defaults) {
    for (const type in defaults) {
      plugin.api.setDefaults(type, defaults[type])
    }
  }

  vueApp.use(plugin)

  return {
    provide: {
      notifications: plugin.api,
    },
  }
})

declare module '#app' {
  interface NuxtApp {
    $notifications: import('@outloud/vue-notifications').ExtendedNotificationManager
  }
}
