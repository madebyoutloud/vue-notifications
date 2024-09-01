# Notification Manager

## Properties
### options
Type: [`NotificationsConfig`](/docs/configuration).

### list
Type: `Notification[]`

### queue
Type: `Notification[]`

## Methods

Notification manager also has method for each notification type `default`, `info`, `success`, `warning`, `error` with same options as `open` method. 

### setDefaults
Set default values for type. [`NotificationDefaults`](#types)
```ts
setDefaults(type: string, defaults: NotificationDefaults): void;
```

### get
Finds notification by ID.
```ts
get(id: NotificationId): Notification | undefined;
```

### isOpen
Returns whether the notification is currently open or not.
```ts
isOpen(notificationOrId: Notification | NotificationId): boolean;
```

### open
Shows a new notification. [`NotificationOptions`](#types)
```ts
open(options: Partial<NotificationOptions>): Notification;
open(text: string, options: Partial<NotificationOptions>): Notification;
open(error: Error, options: Partial<NotificationOptions>): Notification;
```

### promise
Shows a new notification using promise. [`NotificationOptions`](#types)
```ts
promise(promise: Promise<any> options: Partial<NotificationOptions>): Notification;
```

### reset
Resets notification timer and moves it to front.
```ts
reset(id: NotificationId | Notification): void;
```

### update
Updates data for existing notification. [`NotificationOptions`](#types)
```ts
update(id: NotificationId | Notification, options: Partial<NotificationOptions>): void;
```

### close
Closes active notification.
```ts
close(id: NotificationId | Notification): void;
```

### pause
Pauses notification's timer;
```ts
pause(id: NotificationId | Notification): void;
```

### resume
Resumes notification's timer;
```ts
resume(id: NotificationId | Notification): void;
```

## Types


```ts
interface NotificationDefaults {
  title?: string;
  text?: string;
  icon?: string;
}

interface NotificationOptions {
  id: NotificationId;
  type: string;
  title?: string;
  text?: string;
  icon?: string;
  closable?: boolean;
  loading?: boolean;
  duration: number;
  component?: Component;
  props?: Record<string, any>;
}
```
