export type { NotificationOptions, NotificationDefaults, Notifications } from './types'
export type { NotificationsConfig } from './config.js'
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
