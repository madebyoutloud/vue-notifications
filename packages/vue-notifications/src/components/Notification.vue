<template>
  <div class="o-notification" :class="classNames">
    <div v-if="icon" class="o-notification-icon">
      <component :is="config.icon" :name="icon" />
    </div>

    <div class="o-notification-content">
      <div>
        <div v-if="title" class="o-notification-title">
          {{ title }}
        </div>
        <div v-if="text" class="o-notification-text">
          {{ text }}
        </div>
      </div>

      <slot />
    </div>

    <slot name="actions" />

    <!-- <div class="o-notification-indicator" /> -->

    <button v-if="closable" type="button" class="o-notification-close" @click="emit('close')">
      <component :is="config.icon" :name="config.closeIcon" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import config from '../config'

const props = withDefaults(defineProps<{
  type?: string
  icon?: string
  title?: string
  text?: string
  variant?: string
  closable?: boolean
}>(), {
  type: () => config.defaultType,
  variant: 'default',
  closable: true,
})

const emit = defineEmits<{
  close: []
}>()

const classNames = computed(() => [`variant--${props.variant}`, `type--${props.type}`])
</script>

<style lang="scss">
.o-notification {
  --o-padding: #{rem(12)};
  --o-gap: var(--o-padding);
  --o-color: initial;
  --o-border-width: 1px;
  --o-border-color: initial;
  --o-text-color: currentColor;
  display: flex;
  align-items: flex-start;
  border: var(--o-border-width) solid var(--o-border-color);
  background-color: var(--o-color);
  border-color: var(--border-color);
  color: var(--o-text-color);
  padding: var(--o-padding);
  gap: var(--o-gap);

  .o-notification-content {
    flex: 1 1 auto;
    min-width: 0;
    overflow-wrap: break-word;
  }

  .o-notification-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: rem(28);
    aspect-ratio: 1;
  }
}
</style>
