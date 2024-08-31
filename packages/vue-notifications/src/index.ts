export type { NotificationOptions } from './types'
export { NotificationManager, type ExtendedNotificationManager } from './notification_manager'
export { Notification } from './notification'

// components
export { default as ONotificationsContainer } from './components/Container.vue'
export { default as ONotifications } from './components/Notification.vue'

// composables
export * from './composables/notifications'

// plugin
export { createNotifications } from './plugin'

export const packageName = NAME
export const components = ['Notification']
export const composables = ['useNotifications']
