# Usage

It's super easy to display notification from any place in your code using `useNotifications` composable.

```vue
<template>
  <button @click="alert">Show notification</button>
</template>

<script lang="ts" setup>
import { useNotifications } from '@outloud/vue-notifications'

const notifications = useNotifications()

function alert() {
  notifications.open('This is alert notification.', {
    duration: 10000,
  })
}
</script>
```
