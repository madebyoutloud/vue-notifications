import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { createNotifications } from '@outloud/vue-notifications'
import packageJson from '../../../packages/vue-notifications/package.json'
import nuxtJson from '../../../packages/nuxt/package.json'
import Icon from '../../components/Icon.vue'
import Layout from './Layout.vue'

import './style.css'
import 'uno.css'
import '@outloud/vue-notifications/style.css'
import '../../../packages/vue-notifications/playground/style.scss'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.config.globalProperties.$packageJson = packageJson
    app.config.globalProperties.$nuxtJson = nuxtJson

    app.use(createNotifications({
      stacked: true,
    }))

    app.component('Icon', Icon)
  },
  Layout,
}

export default theme
