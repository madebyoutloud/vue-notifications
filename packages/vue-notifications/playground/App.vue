<template>
  <div class="w-full h-full min-h-screen bg-neutral-50 dark:bg-neutral-900">
    <h1>App</h1>

    <div class="flex">
      <input
        id="title"
        v-model="options.title"
        type="checkbox"
      >

      <label for="title">Title</label>
    </div>

    <div class="flex">
      <input
        id="text"
        v-model="options.text"
        type="checkbox"
      >

      <label for="text">Text</label>
    </div>

    <div class="flex">
      <input
        id="icon"
        v-model="options.icon"
        type="checkbox"
      >

      <label for="icon">Icon</label>
    </div>

    <button type="button" @click="open">
      Open
    </button>

    <button type="button" @click="promise">
      Promise
    </button>

    <ONotificationsContainer />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ONotificationsContainer, useNotifications } from '~/index'

const notifications = useNotifications()

const options = reactive({
  title: true,
  text: true,
  icon: true,
})

function open() {
  notifications.open({
    title: options.title ? 'My notification title' : undefined,
    text: options.text ? 'My notification message' : undefined,
    icon: options.icon ? 'mdi:account' : undefined,
    loading: true,
    duration: 0,
  })
}

function promise() {
  notifications.promise(new Promise((resolve) => {
    setTimeout(resolve, 2000)
  }), {
    text: 'My notification message',
    // duration: 0,
    success: {
      text: 'Success',
      icon: 'mdi:check',
    },
  })
}
</script>

<style lang="scss">

</style>
