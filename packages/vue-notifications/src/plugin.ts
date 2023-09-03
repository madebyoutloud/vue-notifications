import type { App } from 'vue'
import type { ExtendedNotificationManager } from './NotificationManager'
import { NotificationManager } from './NotificationManager'
import type { NotificationType, NotificationsConfig } from './config'
import config from './config'
import { notificationsSymbol } from './symbols'

export function createNotifications(options: Partial<NotificationsConfig> = {}) {
  config.set(options)

  if (!config.types.includes(config.defaultType)) {
    config.defaultType = config.types[0]
  }

  const api = new NotificationManager(config) as ExtendedNotificationManager

  for (const type of config.types) {
    if (api[type as NotificationType] === undefined) {
      api[type as NotificationType] = api.withType(type)
    }
  }

  function install(app: App) {
    app.config.globalProperties.$notifications = api
    app.provide(notificationsSymbol, api)
  }

  return {
    api,
    install,
  }
}
