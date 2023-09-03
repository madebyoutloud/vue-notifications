import { addComponent, addImports, addPlugin, addTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { NotificationDefaults, NotificationsConfig } from '@outloud/vue-notifications'

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
    nuxt.options.vite.optimizeDeps = nuxt.options.vite.optimizeDeps || {}
    nuxt.options.vite.optimizeDeps.include = nuxt.options.vite.optimizeDeps.include || []
    nuxt.options.vite.optimizeDeps.include.push('@outloud/vue-notifications')

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ types: '@outloud/vue-notifications' }, { types: '@outloud/nuxt-notifications' })
    })

    addTemplate({
      filename: 'nuxt-notifications.options.mjs',
      getContents() {
        return `export const options = ${JSON.stringify(options, null, 2)}`
      },
    })

    // Add runtime plugin before the router plugin
    // https://github.com/nuxt/framework/issues/9130
    nuxt.hook('modules:done', () => {
      addPlugin(resolver.resolve('./runtime/plugin'))
    })

    nuxt.options.css.unshift('@outloud/vue-notifications/style.css')

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
