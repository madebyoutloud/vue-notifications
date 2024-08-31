import { toRaw, type Component } from 'vue'
import type { NotificationId, NotificationOptions, NotificationStatus } from './types.js'

export class Notification {
  id!: NotificationId
  type!: string
  title?: string | null
  text?: string | null
  icon?: string | null
  closable = false
  loading = false
  duration!: number
  component?: Component
  status: NotificationStatus = 'active'
  props?: Record<string, any>

  timestamp = Date.now()
  timerAt?: number
  pausedAt?: number

  timer?: ReturnType<typeof setTimeout>

  constructor(options: NotificationOptions) {
    this.update(options)
  }

  get isActive() {
    return this.status === 'active'
  }

  get isPaused() {
    return this.pausedAt !== undefined
  }

  update({ component, props, ...options }: Partial<NotificationOptions>) {
    Object.assign(this, options)
    component && (this.component = toRaw(component))
    props && (this.props = toRaw(props))
  }
}
