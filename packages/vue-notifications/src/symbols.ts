import type { InjectionKey } from 'vue'
import type { ExtendedNotificationManager } from './NotificationManager'

export const notificationsSymbol: InjectionKey<ExtendedNotificationManager> = Symbol(`${NAME}:notifications`)
