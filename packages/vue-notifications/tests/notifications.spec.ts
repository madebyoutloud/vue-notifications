import { describe, expect, it } from 'vitest'
import { createNotifications } from '../src/plugin'

describe.concurrent('notifications', () => {
  it('creates api', async () => {
    const { api } = createNotifications({})

    expect(api.info).toBeTruthy()
  })
})
