# Styling

The library contains only critical styles to layout the notifications container and notification itself. It can be easily customized using custom css. You will probably only need to style `.o-notification` element.

Elements contains several variables to easily style them, without changing style properties.

## HTML tree
```html
<div class="o-notifications-container">
  <div class="o-notification type--info">
    <div class="o-notification-body">
      <div class="o-notification-icon">...</div>

      <div class="o-notification-content">...</div>

      <button class="o-notification-close">...</button>
    </div>
  </div>

  <div class="o-notification type--default">
    <div class="o-notification-body">
      <div class="o-notification-icon">...</div>
      
      <div class="o-notification-content">...</div>
    </div>
  </div>
</div>
```

## .o-notifications-container

### Variables
| Variable | Type | Default | Description |
| - | - | - | - |
| `--o-spacing` | `length` | `0.5rem` | Spacing between notifications |
| `--o-offset` | `length` | `1rem` | Offset from edge of window |
| `--o-max-width` | `length` | `26.25rem` | Max width |

## .o-notification
Notification is a man element of your notifications.


### Variables
| Variable | Type | Default | Description |
| - | - | - | - |
| `--o-padding` | `length` | `0.75rem` | Padding |
| `--o-gap` | `length` | `0.75rem` | Spacing between content |
| `--o-size` | `length` | `1.5rem` | Size of icon and close button |
| `--o-color` | `color` | `initial` | Background color |
| `--o-border-width` | `length` | `1px` | Border width |
| `--o-border-color` | `color` | `initial` | Border color |
| `--o-text-color` | `color` | `currentColor` | Text color |
| `--o-icon-size` | `length` | `1.5rem` | Icon size |
| `--o-icon-color` | `color` | `currentColor` | Icon color |

```scss
// You can define colors for each notification type (default, info, success, warning, error).
$types: (
  'default' : (
    'color' : '#F6F5FF',
    'border-color': '#CBCAFC',
    'icon-color': '#564AF7',
  ),
  'error' : (
    'color' : '#FFF0F0',
    'border-color': '#FFC2C2',
    'icon-color': '#FF0000',
  ),
);

.o-notification {
  border-radius: 10px;

  // and loop over types to set colors based on a class
  @each $type, $values in $types {
    &.type--#{$type} {
      @each $name, $value in $values {
        --o-#{$name}: #{$value};
      }
    }
  }

  .o-notification-title {
    font-size: 16px;
    font-weight: 600;
    color: #121827;
  }

  .o-notification-text {
    font-size: 14px;
    font-weight: 400;
    color: #384050;
  }

  .o-notification-close {
    background: none;
    opacity: 0.5;
    transition: opacity .3s;

    &:hover {
      opacity: 1;
    }
  }
}

```
