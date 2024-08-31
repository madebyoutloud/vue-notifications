import { NotificationType, type NotificationsPosition } from './types.js'

export const config: NotificationsConfig = {
  icon: 'Icon',
  closeIcon: 'mdi:close',
  loadingIcon: 'mdi:loading',
  duration: 6000,
  position: 'bottom-right',
  limit: 0,
  types: NotificationType,
  defaultType: NotificationType[0],
  transition: undefined,
  stacked: false,
}

export interface NotificationsConfig {
  /** @default 'Icon' */
  icon: string
  /** @default 'material-symbols:close-rounded' */
  closeIcon: string
  /** @default 'mdi:loading' */
  loadingIcon: string
  /** @default 6000 */
  duration: number
  /** @default 'bottom-right' */
  position: NotificationsPosition
  /** @default 0 */
  limit: number
  /** @default ['default', 'info', 'success', 'warning', 'error'] */
  types: readonly string[]
  /** @default 'default' */
  defaultType: string
  /** @default false */
  stacked: boolean
  transition?: string
}
