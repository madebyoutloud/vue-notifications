# Configuration

You can change the configuration options during installation with the arguments:

```ts
import { createNotifications } from '@outloud/vue-notifications'

const notifications = createNotifications({
  // NotificationsConfig
})

export interface NotificationsConfig {
    /** @default 'Icon' */
    icon: string;
    /** @default 'material-symbols:close-rounded' */
    closeIcon: string;
    /** @default 'mdi:loading' */
    loadingIcon: string;
    /** @default 6000 */
    duration: number;
    /** @default 'bottom-right' */
    position: NotificationsPosition;
    /** @default 0 */
    limit: number;
    /** @default ['default', 'info', 'success', 'warning', 'error'] */
    types: readonly string[];
    /** @default 'default' */
    defaultType: string;
    /** @default false */
    stacked: boolean;
    transition?: string;
}
```

## Nuxt

Nuxt supports configuration with the same options as above in your `nuxt.config.ts` file. Additionally you can set defaults for notification types.

::: code-group
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  notifications: {
    info: {
      title: 'Info'
    },
    error: {
      icon: 'material-symbols:error'
      title: 'Error'
    }
  }
})
```
:::
