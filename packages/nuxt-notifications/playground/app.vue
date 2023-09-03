<template>
  <div>
    <button type="button" @click="open()">
      Open notification
    </button>

    <ONotificationsContainer />
  </div>
</template>

<script setup lang="ts">
import { ONotificationsContainer, useNotifications } from '@outloud/vue-notifications'

const notifications = useNotifications()

function open() {
  notifications.open('Test', {
    duration: 0,
  })
}
</script>
