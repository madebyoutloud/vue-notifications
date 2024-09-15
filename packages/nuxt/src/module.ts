import { addComponent, addImports, addPlugin, addTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import { packageName, components, composables } from '@outloud/vue-notifications'
import type { ModuleOptions } from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@outloud/nuxt-notifications',
    configKey: 'notifications',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {},
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Transpile runtime
    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))

    // https://github.com/nuxt/framework/pull/8544
    nuxt.options.vite.optimizeDeps = nuxt.options.vite.optimizeDeps || {}
    nuxt.options.vite.optimizeDeps.include = nuxt.options.vite.optimizeDeps.include || []
    nuxt.options.vite.optimizeDeps.include.push(packageName)

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ types: packageName }, { types: '@outloud/nuxt-notifications' })
    })

    addTemplate({
      filename: 'nuxt-notifications.options.mjs',
      getContents() {
        return `export const options = ${JSON.stringify(options, null, 2)}`
      },
    })

    addPlugin(resolver.resolve('./runtime/plugin'))

    nuxt.options.css.push(`${packageName}/style.css`)

    addImports(composables.map(name => ({
      name,
      from: packageName,
    })))

    components.forEach(name => addComponent({
      name: `O${name}`,
      export: `O${name}`,
      filePath: packageName,
    }))
  },
})
