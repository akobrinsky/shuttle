<script setup>
import ShuttleLogo from '@/assets/shuttle_logo_square_dark.svg?component'
import ChallengePrompt from '@/sections/ChallengePrompt.vue'
import Requirements from '@/sections/Requirements.vue'
import YourSolution from '@/sections/YourSolution.vue'
</script>

<template>
  <div class="flex flex-col items-center w-full text-slate-800 min-h-screen bg-stone-50">
    <div class="flex-none w-2/3 text-center py-10">
      <ShuttleLogo class="h-32 w-32 m-auto" />
    </div>
    <div class="flex-none w-2/3 mb-4">
      <ChallengePrompt />
    </div>
    <div class="flex-none w-1/2 mb-6">
      <Requirements />
    </div>
    <div class="flex-none w-full md:w-2/3 mb-4">
      <YourSolution />
    </div>
  </div>
</template>
