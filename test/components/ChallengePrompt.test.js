import { describe, expect, it } from 'vitest'

import ChallengePrompt from '@/sections/ChallengePrompt.vue'
import { mount } from '@vue/test-utils'

const setup = () => mount(ChallengePrompt)

describe('ChallengePrompt', () => {
  it('should toggle welcome message', async () => {
    const wrapper = setup()

    expect(wrapper.findByTestId('welcome-message').exists()).toBe(true)

    await wrapper.get('[data-testid="prompt-toggle"]').trigger('click')

    expect(wrapper.findByTestId('welcome-message').exists()).toBe(false)
  })
})
