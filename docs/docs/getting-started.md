# Getting Started
Get started with Vue Notifications quickly by following steps below.

If you are using Nuxt, you can skip this page and go to [Nuxt](/docs/nuxt) tutorial.


## Installation

::: code-group
```sh-vue [npm]
npm add {{$packageJson.name}}
```
```sh-vue [pnpm]
pnpm add {{$packageJson.name}}
```
```sh-vue [yarn]
yarn add {{$packageJson.name}}
```
```sh-vue [bun]
bun add {{$packageJson.name}}
```
:::

## Setup

### 1. Register the plugin to your app in your entry file.

See [Configuration](/docs/configuration) for options.

::: code-group
```ts [main.ts]
import { createApp } from 'vue'
import { createNotifications } from '@outloud/vue-notifications' // [!code highlight]
import App from './App.vue'

const app = createApp(App)
app.use(createNotifications({/* options */})) // [!code highlight]
app.mount('#app')
```
:::

### 2. Import required CSS

::: code-group
```ts [main.ts]
import '@outloud/vue-notifications/style.css' // [!code highlight]
```
:::

### 3. Add notifications container component

The best place is to add it to your main `App.vue` file.

::: code-group
```vue [App.vue]
<template>
  <div>
    ...

    <ONotificationsContainer /> // [!code highlight]
  </div>
</template>

<script setup lang="ts">
import { ONotificationsContainer } from '@outloud/vue-notifications' // [!code highlight]
</script>
```
:::
