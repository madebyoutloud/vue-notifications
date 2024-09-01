import type { Notifications ,  NotificationDefaults,  NotificationsConfig } from '@outloud/vue-notifications'

export interface ModuleOptions extends Partial<NotificationsConfig> {
  defaults?: Partial<Record<Notifications['type'], NotificationDefaults>>
}
