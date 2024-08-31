import type { InjectionKey } from 'vue'
import type { ExtendedNotificationManager } from './notification_manager.js'

export const notificationsSymbol: InjectionKey<ExtendedNotificationManager> = Symbol(`${NAME}:notifications`)
