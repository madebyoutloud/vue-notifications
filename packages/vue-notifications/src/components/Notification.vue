<template>
  <div class="o-notification" :class="classNames">
    <div class="o-notification-body">
      <div v-if="activeIcon" class="o-notification-icon">
        <component :is="notifications.options.icon" :name="activeIcon" />
      </div>

      <div class="o-notification-content">
        <div>
          <div v-if="notification.title" class="o-notification-title">
            {{ notification.title }}
          </div>
          <div v-if="notification.text" class="o-notification-text">
            {{ notification.text }}
          </div>
        </div>

        <slot>
          <template v-if="notification.component">
            <component :is="notification.component" v-bind="notification.props" @close="close" />
          </template>
        </slot>
      </div>

      <slot name="actions"></slot>

      <!-- <div class="o-notification-indicator" /> -->

      <button v-if="notification.closable" type="button" class="o-notification-close" @click="close">
        <component :is="notifications.options.icon" :name="notifications.options.closeIcon" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNotifications } from '../composables/notifications'
import type { Notification } from '../notification'

interface Props {
  notification: Notification
  stacked?: boolean
  collapsed?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

defineSlots<{
  default?(): any
  actions?(): any
}>()

const notifications = useNotifications()

const activeIcon = computed(() => {
  return props.notification.loading ? notifications.options.loadingIcon : props.notification.icon
})

const classNames = computed(() => {
  const list = [`type--${props.notification.type}`]

  props.notification.loading && list.push('is--loading')

  if (props.stacked) {
    list.push('is--stacked')
    props.collapsed && list.push('is--collapsed')
  }

  return list
})

function close() {
  emit('close')
}
</script>

<style lang="scss">
.o-notification {
  --o-padding: #{rem(12)};
  --o-gap: var(--o-padding);
  --o-color: initial;
  --o-border-width: 1px;
  --o-border-color: initial;
  --o-text-color: currentColor;
  --o-size: #{rem(24)};
  --o-icon-size: #{rem(24)};
  --o-icon-color: var(--o-text-color);
  --y: 0;
  --s: 1;
  position: relative;
  width: 100%;
  border: var(--o-border-width) solid var(--o-border-color);
  background-color: var(--o-color);
  color: var(--o-text-color);
  padding: var(--o-padding);
  margin-top: var(--o-spacing);

  .o-notification-body {
    display: flex;
    align-items: flex-start;
    gap: var(--o-gap);
    transition: opacity .4s ease;
  }

  .o-notification-icon,
  .o-notification-close {
    flex: 0 0 auto;
    width: var(--o-size);
    height: var(--o-size);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .o-notification-icon {
    color: var(--o-icon-color);
    font-size: var(--o-icon-size);
  }

  .o-notification-content {
    align-self: center;
    flex: 1 1 auto;
    min-width: 0;
    overflow-wrap: break-word;
  }

  .o-notification-close {
    font-size: #{rem(20)};
  }

  &.is--stacked {
    position: absolute;
    transform: translate3d(0, var(--y), 0) scale(var(--s));
    transition: transform .4s ease;
    bottom: 0;
  }

  &.is--collapsed {
    .o-notification-body {
      opacity: 0;
    }
  }

  &.is--loading {
    .o-notification-icon {
      animation: o-notifications-loading 1s linear infinite;
    }
  }

  &.v-move,
  &.v-enter-active,
  &.v-leave-active {
    transition: opacity .4s ease, transform .4s ease;
  }

  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
    transform: translate3d(50px, var(--y), 0) scale(var(--s));
  }

  &.v-leave-active {
    position: absolute;
  }

  @keyframes o-notifications-loading {
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
