import { beforeAll, describe, expect, it } from 'vitest'
import { mount, config } from '@vue/test-utils'
import Notification from '~/components/Notification.vue'
import { createNotifications } from '~/plugin.js'

describe.concurrent('Notification.vue', () => {
  beforeAll(() => {
    config.global.plugins = [createNotifications()]
  })

  it('renders the component', async () => {
    const title = 'Title'
    const text = 'Text'
    const wrapper = mount(Notification, {
      props: {
        type: 'info',
        title,
        text,
      },
    })

    expect(wrapper.find('.o-notification-title').text()).toEqual(title)
    expect(wrapper.find('.o-notification-text').text()).toEqual(text)
  })
})
