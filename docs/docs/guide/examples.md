# Example

## Interactive

An interactive example of the possible options.

<InteractiveExample>
  <template #default="{ options }">
    
```html-vue
<template>
  <button @click="open">Show notification</button>
</template>

<script lang="ts" setup>
import { useNotifications } from '@outloud/vue-notifications'

const notifications = useNotifications()

function open() {
  notifications.open({{ options }})
}
</script>
```

  </template>
</InteractiveExample>

## Promise

<Promise />

```vue
<template>
  <button @click="open">Show notification</button>
</template>

<script lang="ts" setup>
import { useNotifications } from '@outloud/vue-notifications'

const notifications = useNotifications()

function open() {
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
```

<script setup>
import InteractiveExample from '../../components/InteractiveExample.vue'
import Promise from '../../examples/Promise.vue'
</script>
