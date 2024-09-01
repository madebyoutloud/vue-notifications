<template>
  <div>
    <VPButton class="mt-5" text="Show notification" @click="show" />
  </div>
</template>

<script lang="ts" setup>
import { VPButton } from 'vitepress/theme'
import { useNotifications } from '@outloud/vue-notifications'

const notifications = useNotifications()

function show() {
  const promise = new Promise<void>((resolve, reject) => {
    return setTimeout(() => Math.random() > 0.4 ? resolve() : reject(new Error('Failed')), 2000)
  })

  notifications.promise(promise, {
    text: 'This is a promise notification',
    success: {
      icon: 'material-symbols:check-circle-outline',
      text: 'Promise resolved',
      type: 'success',
    },
    error: {
      icon: 'material-symbols:error',
      text: 'En error occurred',
      type: 'error',
    },
  })
}
</script>
