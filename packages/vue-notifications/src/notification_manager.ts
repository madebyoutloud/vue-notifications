import { type Raw, reactive } from 'vue'
import type { NotificationDefaults, Notifications, SoftExtend, NotificationOptions, NotificationId } from './types.js'
import { Notification } from './notification.js'
import type { NotificationsConfig } from './config.js'

export type NotificationTypeFn = InstanceType<typeof NotificationManager>['open']

export type ExtendedNotificationManager = SoftExtend<NotificationManager, {
  [K in Notifications['type']]: NotificationTypeFn
}>

export class NotificationManager {
  private id = 1
  private defaults: Record<string, NotificationDefaults> = {}
  list = reactive<Raw<Notification>[]>([])
  queue = reactive<Raw<Notification>[]>([])

  constructor(readonly options: NotificationsConfig) {}

  parseOptions(...args: unknown[]) {
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
    return this.list.find((item) => item.id === id)
  }

  isOpen(notificationOrId: NotificationId | Notification) {
    const notification = this.resolve(notificationOrId)
    return !!notification && notification.status !== 'closed'
  }

  open(options: Partial<NotificationOptions>): Notification
  open(text: string, options?: Partial<NotificationOptions>): Notification
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  open(error: Error, options?: Partial<NotificationOptions>): Notification
  open(...args: unknown[]): Notification {
    const parsedOptions = this.parseOptions(...args)
    const type = parsedOptions.type || this.options.defaultType

    const defaults: NotificationOptions = {
      id: this.id++,
      type: this.options.defaultType,
      duration: this.options.duration,
      closable: true,
    }

    const mergedOptions: NotificationOptions = Object.assign(defaults, this.defaults[type], parsedOptions)

    const existing = this.get(mergedOptions.id)

    if (existing) {
      this.update(existing, mergedOptions)
      this.reset(existing)
      return existing
    }

    const notification = reactive(new Notification(mergedOptions))

    if (this.options.limit && this.list.length >= this.options.limit) {
      notification.status = 'queue'
    }

    this.getList(notification).push(notification)
    this.schedule(notification)

    return notification
  }

  promise(promise: Promise<any>, { pending, success, error, ...options }: Partial<NotificationOptions> & Record<'pending' | 'success' | 'error', Partial<NotificationOptions>>) {
    const notification = this.open({
      ...options,
      ...pending,
      loading: true,
    })

    promise.then(() => this.update(notification, {
      ...success,
      loading: false,
    })).catch((err) => this.update(notification, {
      text: err.message,
      ...error,
      loading: false,
    }))

    return notification
  }

  reset(id: NotificationId | Notification) {
    const notification = this.resolve(id)

    if (!notification || !notification.isActive) {
      return
    }

    notification.timerAt = undefined
    this.stop(notification)

    this.list.splice(this.list.indexOf(notification), 1)
    this.list.push(notification)

    !notification.isPaused && this.schedule(notification)
  }

  update(id: NotificationId | Notification, options: Partial<NotificationOptions>) {
    const notification = this.resolve(id)

    if (!notification) {
      return
    }

    notification.update(options)
    !notification.isPaused && this.schedule(notification)
  }

  close(id: NotificationId | Notification) {
    const notification = this.resolve(id)

    if (!notification || notification.status === 'closed') {
      return
    }

    this.stop(notification)

    const list = this.getList(notification)
    list.splice(list.indexOf(notification), 1)

    notification.status = 'closed'

    this.updateQueue()
  }

  pause(id: NotificationId | Notification) {
    const notification = this.resolve(id)

    if (!notification || !notification.timer) {
      return
    }

    notification.pausedAt = Date.now()
    this.stop(notification)
  }

  resume(id: NotificationId | Notification) {
    const notification = this.resolve(id)

    if (!notification || !notification.pausedAt) {
      return
    }

    const elapsed = Math.max(0, notification.pausedAt - (notification.timerAt ?? notification.pausedAt))

    notification.timerAt = Date.now() - elapsed
    notification.pausedAt = undefined

    this.schedule(notification)
  }

  private resolve(notificationOrId: NotificationId | Notification) {
    return notificationOrId instanceof Notification ? notificationOrId : this.get(notificationOrId)
  }

  private stop(notification: Notification) {
    if (notification.timer) {
      clearTimeout(notification.timer)
      notification.timer = undefined
    }
  }

  private schedule(notification: Notification) {
    if (!notification.isActive || notification.loading || notification.timer || !notification.duration) {
      return
    }

    notification.timerAt ??= Date.now()

    const duration = Math.max(0, notification.duration - (Date.now() - notification.timerAt))

    notification.timer = setTimeout(() => this.close(notification), duration)
  }

  private getList(notification: Notification) {
    return notification.status === 'queue' ? this.queue : this.list
  }

  private updateQueue() {
    const notifications = this.queue.splice(0, this.options.limit - this.list.length)

    for (const notification of notifications) {
      notification.status = 'active'
      this.list.push(notification)
      this.schedule(notification)
    }
  }
}
