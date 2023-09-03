import { shallowReactive } from 'vue'
import type { NotificationId, NotificationOptions } from './Notification'
import { Notification } from './Notification'
import type { NotificationType, NotificationsConfig } from './config'

export type NotificationDefaults = {
  title?: string
  text?: string
  icon?: string
}

export type NotificationTypeFn = InstanceType<typeof NotificationManager>['open']
export type ExtendedNotificationManager = NotificationManager & Record<Exclude<NotificationType, keyof NotificationManager>, NotificationTypeFn>

export class NotificationManager {
  private id = 1
  private defaults: Record<string, NotificationDefaults> = {
    info: {
      icon: 'mdi:information',
    },
    success: {
      icon: 'mdi:check-circle',
    },
    warning: {
      icon: 'mdi:alert-circle',
    },
    error: {
      icon: 'mdi:close-circle',
    },
  }

  list = shallowReactive<Notification[]>([])

  constructor(private options: NotificationsConfig) {}

  private reset(notification: Notification) {
    notification.timestamp = Date.now()
    notification.timer && clearTimeout(notification.timer)
    notification.timer = undefined

    this.list.splice(this.list.indexOf(notification), 1)
    this.list.push(notification)

    this.schedule(notification)
  }

  private schedule(notification: Notification) {
    if (notification.duration > 0) {
      notification.timer = setTimeout(() => this.close(notification), notification.duration)
    }
  }

  private closeExtra() {
    if (this.list.length > this.options.max) {
      this.list.splice(0, this.list.length - this.options.max)
    }
  }

  private parseOptions(...args: unknown[]) {
    let text: string | undefined
    let error: Error | undefined
    if (typeof args[0] === 'string') {
      text = args.shift() as string
    }

    if (args[0] instanceof Error) {
      error = args.shift() as Error
    }

    const options = (args.shift() || {}) as Partial<NotificationOptions>

    text && (options.text = text)

    if (error) {
      options.text = error.message
      options.type = 'error'
    }

    return options
  }

  setDefaults(type: string, defaults: NotificationDefaults) {
    this.defaults[type] = defaults
  }

  get(id: NotificationId) {
    return this.list.find(item => item.id === id)
  }

  getIsOpen(notificationOrId: NotificationId | Notification) {
    return this.list.some(item => item.id === notificationOrId || item === notificationOrId)
  }

  open(options: Partial<NotificationOptions>): Notification
  open(text: string, options?: Partial<NotificationOptions>): Notification
  open(error: Error, options?: Partial<NotificationOptions>): Notification
  open(...args: unknown[]): Notification {
    let mergedOptions: NotificationOptions = Object.assign({
      id: this.id++,
      type: this.options.defaultType,
      duration: this.options.duration,
      closable: true,
    }, this.parseOptions(...args))

    const defaults = this.defaults[mergedOptions.type]

    if (defaults) {
      mergedOptions = Object.assign({}, defaults, mergedOptions)
    }

    const existing = this.get(mergedOptions.id)

    if (existing) {
      this.reset(existing)
      return existing
    }

    const notification = new Notification(mergedOptions)

    this.schedule(notification)
    this.list.push(notification)

    this.closeExtra()

    return notification
  }

  close(notificationOrId: NotificationId | Notification) {
    const notification = notificationOrId instanceof Notification ? notificationOrId : this.get(notificationOrId)

    if (!notification) {
      return false
    }

    const index = this.list.indexOf(notification)
    if (index === -1) {
      return false
    }

    this.list.splice(index, 1)
    return true
  }

  withType(type: string) {
    return (...args: unknown[]) => {
      const options = this.parseOptions(...args)
      options.type = options.type || type

      return this.open(options)
    }
  }
}
