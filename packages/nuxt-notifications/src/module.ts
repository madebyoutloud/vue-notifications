import { addComponent, addImports, addPlugin, addTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import { packageName, type NotificationDefaults, type NotificationsConfig } from '@outloud/vue-notifications'

export default defineNuxtModule({
  meta: {
    name: '@outloud/nuxt-notifications',
    configKey: 'notifications',
  },
  defaults: {} as Partial<NotificationsConfig & { defaults: Record<string, NotificationDefaults> }>,
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Transpile runtime
    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))

    // https://github.com/nuxt/framework/pull/8544
    // nuxt.options.vite.optimizeDeps = nuxt.options.vite.optimizeDeps || {}
    // nuxt.options.vite.optimizeDeps.include = nuxt.options.vite.optimizeDeps.include || []
    // nuxt.options.vite.optimizeDeps.include.push('@outloud/vue-notifications')

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ types: '@outloud/vue-notifications' }, { types: '@outloud/nuxt-notifications' })
    })

    addTemplate({
      filename: 'nuxt-notifications.options.mjs',
      getContents() {
        return `export const options = ${JSON.stringify(options, null, 2)}`
      },
    })

    addPlugin(resolver.resolve('./runtime/plugin'))

    nuxt.options.css.push(`${packageName}/style.css`)

    addImports({
      name: 'useNotifications',
      from: '@outloud/vue-notifications',
    })

    addComponent({
      name: 'ONotification',
      export: 'ONotification',
      filePath: '@outloud/vue-notifications',
    })
  },
})
