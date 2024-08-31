import { createApp } from 'vue'
import App from './App.vue'
import Icon from './Icon.vue'
import { createNotifications } from '~/index.js'

import 'uno.css'
import '@unocss/reset/tailwind-compat.css'
import './style.scss'

const app = createApp(App)

app.use(createNotifications({
  stacked: true,
}))
app.component('Icon', Icon)
app.mount('#app')
