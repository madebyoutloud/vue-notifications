export type NotificationId = string | number

export interface NotificationOptions {
  id: NotificationId
  type: string
  title?: string
  text?: string
  icon?: string
  closable?: boolean
  duration: number
}

export class Notification {
  readonly id: NotificationId
  readonly type: string
  readonly title?: string
  readonly text?: string
  readonly icon?: string
  readonly closable = false
  readonly duration: number
  timestamp = Date.now()

  timer?: ReturnType<typeof setTimeout>

  constructor(options: NotificationOptions) {
    Object.assign(this, options)
  }

  public get props() {
    return {
      type: this.type,
      title: this.title,
      text: this.text,
      icon: this.icon,
      closable: this.closable,
    }
  }
}
