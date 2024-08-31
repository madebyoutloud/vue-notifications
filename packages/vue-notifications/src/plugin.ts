import type { App } from 'vue'
import { NotificationManager, type ExtendedNotificationManager } from './notification_manager.js'
import { notificationsSymbol } from './symbols.js'
import type { Notifications } from './types.js'
import { config as configDefaults, type NotificationsConfig } from './config.js'

function withType(manager: NotificationManager, type: string) {
  return (...args: unknown[]) => {
    const options = manager.parseOptions(...args)
    options.type = options.type || type

    return manager.open(options)
  }
}

export function createNotifications(options: Partial<NotificationsConfig> = {}) {
  const config: NotificationsConfig = Object.assign({}, configDefaults, options)

  if (!config.types.includes(config.defaultType)) {
    config.defaultType = config.types[0]!
  }

  const api = new NotificationManager(config) as ExtendedNotificationManager

  for (const type of config.types) {
    if (api[type as Notifications['type']] === undefined && type !== 'default') {
      api[type as Notifications['type']] = withType(api, type)
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
