import { inject } from 'vue'
import { notificationsSymbol } from '../symbols'

export function useNotifications() {
  return inject(notificationsSymbol)!
}
