<template>
  <div>
    <div class="grid cols-2 flex-col items-start gap-5">
      <div class="option">
        <label for="type">Type</label>

        <select id="type" v-model="options.type" class="input">
          <option value="default">
            Default
          </option>
          <option value="success">
            Success
          </option>
          <option value="warning">
            Warning
          </option>
          <option value="error">
            Error
          </option>
        </select>
      </div>

      <div class="option">
        <label for="title">Title</label>

        <input id="title" v-model="options.title" class="input">
      </div>

      <div class="option">
        <label for="text">Text</label>

        <input id="text" v-model="options.text" class="input">
      </div>

      <div class="option">
        <label for="icon">Icon</label>

        <input id="icon" v-model="options.icon" class="input">
      </div>

      <div class="option">
        <label for="duration">Duration</label>

        <input id="duration" v-model.number="options.duration" class="input" type="number">
      </div>

      <div class="option">
        <label for="closable">Closable</label>

        <input id="closable" v-model="options.closable" type="checkbox">
      </div>

      <div class="option">
        <label for="loading">Loading</label>

        <input id="loading" v-model="options.loading" type="checkbox">
      </div>
    </div>

    <VPButton class="mt-5" text="Show notification" @click="show" />

    <slot :options="code"></slot>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { VPButton } from 'vitepress/theme'
import { useNotifications } from '@outloud/vue-notifications'

const notifications = useNotifications()

const options = reactive({
  type: 'default',
  title: '',
  text: 'Hello World',
  icon: 'material-symbols:circle-notifications-outline',
  closable: true,
  duration: 5000,
  loading: false,
})

const code = computed(() => {
  const space = '  '
  const text = ['{']

  for (const key in options) {
    const value = options[key]

    if (value === '') {
      continue
    }

    if (typeof value === 'string') {
      text.push(`${space + space}${key}: '${value}',`)
    } else {
      text.push(`${space + space}${key}: ${value},`)
    }
  }

  text.push(`${space}}`)

  return text.join('\n')
})

function show() {
  notifications.open(options)
}
</script>

<style lang="scss" scoped>
.option {
  @apply flex flex-col gap-1 items-start;
}

.input {
  background-color: var(--vp-c-bg-alt);
  width: 100%;
  height: 40px;
  border-radius: 6px;
  padding: 0 12px;
  font-size: 15px;
}
</style>
