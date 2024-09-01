<template>
  <div
    ref="$el"
    class="o-notifications-container"
    :class="`position--${notifications.options.position}`"
    @mouseenter="expand"
    @mouseleave="collapse"
  >
    <div ref="$spacer" class="o-notifications-spacer"></div>

    <transition-group :name="notifications.options.transition">
      <Notification
        v-for="(item, i) in notifications.list"
        :key="item.id"
        ref="$notifications"
        :notification="item"
        :stacked="notifications.options.stacked"
        :collapsed="isCollapsed && i !== notifications.list.length - 1"
        @close="notifications.close(item)"
        @mouseenter="notifications.pause(item)"
        @mouseleave="notifications.resume(item)"
      />
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, type ComponentPublicInstance } from 'vue'
import { useNotifications } from '../composables/notifications.js'
import Notification from './Notification.vue'

const notifications = useNotifications()
const isCollapsed = ref(true)
const $el = ref<HTMLElement>()
const $spacer = ref<HTMLElement>()
const $notifications = ref<ComponentPublicInstance<typeof Notification>[]>([])
const collapsedSpacing = 12

watch([notifications.list, isCollapsed], () => {
  notifications.options.stacked && nextTick(updatePositions)
})

function updatePositions() {
  if (!$el.value) {
    return
  }

  const isTop = notifications.options.position.startsWith('top')
  const direction = isTop ? 1 : -1
  const spacing = $spacer.value?.offsetWidth || 0
  let offset = 0

  Array.from<HTMLElement>($notifications.value.map((item) => item.$el))
    .reverse()
    .forEach((el, i) => {
      const { offsetHeight } = el

      if (isTop) {
        el.style.top = '0'
      } else {
        el.style.bottom = '0'
      }

      const y = (isCollapsed.value ? i * collapsedSpacing : offset) * direction
      const scale = isCollapsed.value ? 1 - (i * 0.025) : 1

      el.style.setProperty('--y', `${y}px`)
      el.style.setProperty('--s', String(scale))

      offset += offsetHeight + spacing
    })

  $el.value.style.height = isCollapsed.value ? 'auto' : `${offset}px`
}

function expand() {
  isCollapsed.value = false
}

function collapse() {
  isCollapsed.value = true
}
</script>

<style lang="scss">
.o-notifications-container {
  --o-spacing: #{rem(8)};
  --o-offset: #{rem(16)};
  --o-max-width: #{rem(420)};
  position: fixed;
  z-index: 2000;
  max-width: var(--o-max-width);
  width: calc(100% - var(--o-offset) * 2);

  &.position--bottom-right {
    bottom: var(--o-offset);
    right: var(--o-offset);
  }
  &.position--bottom-left {
    bottom: var(--o-offset);
    left: var(--o-offset);
  }
  &.position--top-right {
    top: calc(var(--o-offset) - var(--o-spacing));
    right: var(--o-offset);
  }
  &.position--top-left {
    top: calc(var(--o-offset) - var(--o-spacing));
    left: var(--o-offset);
  }

  .o-notifications-spacer {
    width: var(--o-spacing);
    position: absolute;
  }
}
</style>
