import type { ExtendedNotificationManager } from './NotificationManager'

export * from './config'
export * from './NotificationManager'
export * from './Notification'

// components
export { default as ONotificationsContainer } from './components/Container.vue'
export { default as ONotifications } from './components/Notification.vue'

// composables
export * from './composables/notifications'

// plugin
export { createNotifications } from './plugin'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    /**
     * Notifications global state for the list and also provides
     * functions that can be used to control it. {@link ExtendedNotificationManager}
     */
    $notifications: ExtendedNotificationManager
  }
}
