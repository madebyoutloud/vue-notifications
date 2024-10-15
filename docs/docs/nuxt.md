# Nuxt
Get started with Vue Modals using Nuxt.

## Installation

::: code-group
```sh-vue [npm]
npm add {{$nuxtJson.name}}
```
```sh-vue [pnpm]
pnpm add {{$nuxtJson.name}}
```
```sh-vue [yarn]
yarn add {{$nuxtJson.name}}
```
```sh-vue [bun]
bun add {{$nuxtJson.name}}
```
:::

## Setup

### 1. Register Nuxt module

See [Configuration](/docs/configuration) for options.

::: code-group
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
    '@outloud/nuxt-notifications', // [!code highlight]
  ],
  notifications: { /* options */ }
})
```
:::

### 2. Add modals container component

The best place is to add it to your `app.vue` file or layout in layouts folder.

::: code-group
```vue [app.vue]
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
