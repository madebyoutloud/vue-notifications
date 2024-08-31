import type { Component } from 'vue'
import type { ExtendedNotificationManager } from './notification_manager.js'

export type NotificationId = string | number
export type NotificationStatus = 'queue' | 'active' | 'closed'

export interface NotificationOptions {
  id: NotificationId
  type: string
  title?: string
  text?: string
  icon?: string
  closable?: boolean
  loading?: boolean
  duration: number
  component?: Component
  props?: Record<string, any>
}

export interface NotificationDefaults {
  title?: string
  text?: string
  icon?: string
}

export const NotificationType = ['default', 'info', 'success', 'warning', 'error'] as const

export type NotificationType = typeof NotificationType[number]

export type NotificationsPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'

export type SoftExtend<A, B> = A & Omit<B, keyof A>

export interface Notifications {
  type: Exclude<NotificationType, 'default'>
}

declare module 'vue' {
  export interface ComponentCustomProperties {
    /**
     * Notifications global state for the list and also provides
     * functions that can be used to control it. {@link ExtendedNotificationManager}
     */
    $notifications: ExtendedNotificationManager
  }
}
