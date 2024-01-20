<script setup>
import { ref } from 'vue'

const showPrompt = ref(true)
</script>

<template>
  <div class="mb-4">
    <div class="flex justify-around items-center">
      <h1 class="flex-auto mb-4 text-3xl font-bold text-slate-600">Shuttle Frontend Challenge</h1>
      <div class="flex-none">
        <button
          class="rounded px-4 py-2 bg-slate-400 text-white font-semibold"
          @click="showPrompt = !showPrompt"
        >
          {{ showPrompt ? 'Hide' : 'Show' }} Prompt
        </button>
      </div>
    </div>
    <template v-if="showPrompt">
      <p class="mb-2">
        Hi! Thanks for your interest in joining the Shuttle engineering team! We are thrilled at the
        prospect of having someone with your skills and experience contribute to our engineering
        team.
      </p>
      <p class="mb-2">
        As a part of our hiring process, we have designed an engineering challenge that will allow
        us to better understand your technical knowledge, design-thinking capabilities,
        problem-solving skills, and your ability to ship high-quality products. We believe that this
        challenge will give you a glimpse into the kind of work you would be involved in at Shuttle,
        as well as provide us with valuable insights into your approach to solving real-world
        engineering problems.
      </p>
      <p class="mb-2">
        The challenge we have prepared for you is deliberately open-ended, allowing you the
        flexibility to showcase your creativity and problem-solving prowess. It is designed to take
        approximately 2-4 hours to complete, providing you with a reasonable timeframe to delve into
        the task while ensuring it doesn't overly burden your schedule.
      </p>
    </template>
  </div>
  <div v-if="showPrompt" class="mb-4">
    <h3 class="mb-4 text-xl font-semibold text-slate-600">The Challenge</h3>
    <p class="mb-2">
      At Shuttle, we believe in capturing appropriate contextual data on individuals to empower the
      automation of actions without requiring additional input from users. One significant value
      proposition of our product is the ability to automate tasks based on personalized data, making
      the user experience seamless and efficient.
    </p>
    <p class="mb-2">
      Your task is to address a specific usability challenge related to data entry, especially when
      dealing with a substantial amount of information. We want to enhance the user experience by
      tackling the ability to capture important dates and relationships effectively. Examples of
      such data include anniversaries, family birthdays, or any significant event that holds
      personal importance to the user.
    </p>
    <p class="mb-2 font-semibold">
      Design and build an interface that best allows a user to input a series of important dates and
      relationships. This interface should be user-friendly, intuitive, and capable of handling
      various types of data entries seamlessly. Imagine this component as either an onboarding step
      for new users or a panel within the settings dialog for existing users to manage and update
      their personal information.
    </p>
  </div>
</template>
