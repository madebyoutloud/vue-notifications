export type { NotificationOptions, NotificationDefaults, Notifications } from './types'
export type { NotificationsConfig } from './config.js'
export { NotificationManager, type ExtendedNotificationManager } from './notification_manager.js'
export { Notification } from './notification.js'

// components
export { default as ONotificationsContainer } from './components/Container.vue'
export { default as ONotifications } from './components/Notification.vue'

// composables
export * from './composables/notifications.js'

// plugin
export { createNotifications } from './plugin'

export const packageName = NAME
export const components = ['Notification']
export const composables = ['useNotifications']
