export const NotificationTypes = ['info', 'success', 'warning', 'error'] as const

export type NotificationType = typeof NotificationTypes[number]

export type Position = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'

export interface NotificationsConfig {
  /** @default 'Icon' */
  icon: string
  /** @default 'material-symbols:close-rounded' */
  closeIcon: string
  /** @default 6000 */
  duration: number
  /** @default 'bottom-right' */
  position: Position
  /** @default 10 */
  max: number
  /** @default ['info', 'success', 'warning', 'error'] */
  types: readonly string[]
  /** @default 'info' */
  defaultType: string
  /** @default 'o-notification' */
  transition?: string
}

type ExtendedProperties<T> = { [P in keyof T]: T[P] }
type ExtendedConfig<T> = Config<T> & ExtendedProperties<T>

export class Config<T> {
  constructor(data: T) {
    Object.assign(this, data)
  }

  public set(options: Partial<T>) {
    Object.assign(this, options)
    return this
  }
}

function createConfig<T>(data: T): ExtendedConfig<T> {
  return new Config(data) as ExtendedConfig<T>
}

const globalConfig = createConfig<NotificationsConfig>({
  icon: 'Icon',
  closeIcon: 'material-symbols:close-rounded',
  duration: 5000,
  position: 'bottom-right',
  max: 5,
  types: NotificationTypes,
  defaultType: NotificationTypes[0],
  transition: 'o-notification',
})

export default globalConfig
