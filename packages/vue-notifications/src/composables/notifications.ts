import { inject } from 'vue'
import { notificationsSymbol } from '../symbols.js'

export function useNotifications() {
  return inject(notificationsSymbol)!
}
