<template>
  <transition-group class="o-notifications-container" :class="[`position--${config.position}`]" tag="div" :name="config.transition">
    <Notification
      v-for="item in notifications.list"
      :key="item.id"
      v-bind="item.toProps()"
      @close="notifications.close(item)"
    >
      <template v-if="item.component">
        <component :is="item.component" v-bind="item.props" />
      </template>
    </Notification>
  </transition-group>
</template>

<script lang="ts" setup>
import { useNotifications } from '../composables/notifications'
import config from '../config'
import Notification from './Notification.vue'

const notifications = useNotifications()
</script>

<style lang="scss">
.o-notifications-container {
  --o-offset: #{rem(16)};
  --o-max-width: #{rem(480)};
  --o-gap: #{rem(8)};
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 2000;
  max-width: var(--o-max-width);
  width: calc(100% - var(--o-offset) * 2);
  gap: var(--o-gap);

  &.position--bottom-right {
    bottom: var(--o-offset);
    right: var(--o-offset);
  }
  &.position--bottom-left {
    bottom: var(--o-offset);
    left: var(--o-offset);
  }
  &.position--top-right {
    top: var(--o-offset);
    right: var(--o-offset);
    flex-direction: column-reverse;
  }
  &.position--top-left {
    top: var(--o-offset);
    left: var(--o-offset);
    flex-direction: column-reverse;
  }
}

.o-notification-move,
.o-notification-enter-active,
.o-notification-leave-active {
  transition: all .5s ease;
}

.o-notification-enter-from,
.o-notification-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
