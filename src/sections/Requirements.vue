<script setup>
import { ref } from 'vue'

const showRequirements = ref(true)
const showExample = ref(true)
</script>

<template>
  <div class="flex mb-2 items-baseline gap-4">
    <h3 class="flex-none font-bold text-slate-600 text-lg">Instructions & Requirements</h3>
    <button class="link-primary text-md" @click="showRequirements = !showRequirements">
      [{{ showRequirements ? 'Hide' : 'Show' }}]
    </button>
  </div>
  <ul v-if="showRequirements" class="list-disc list-outside ml-6">
    <li>
      If it wasn't already clear, we use
      <a href="https://vuejs.org" target="_blank" class="link-primary">Vue.js</a> here at Shuttle,
      so the solution is expected to be in Vue
    </li>
    <li>
      The styling should be done using
      <a href="https://tailwindcss.com" target="_blank" class="link-primary">Tailwind CSS</a>
      classes when possible
    </li>
    <li>
      We also use
      <a href="https://pinia.vuejs.org" target="_blank" class="link-primary">Pinia</a>
      as the frontend datastore, depending on your approach you may or may not want to use it
    </li>
    <li>
      If you would like to add iconography, you can use
      <a href="https://heroicons.com" target="_blank" class="link-primary">Heroicons</a> which is
      available as the installed npm module <span class="text-pre">@heroicons/vue</span>
    </li>
    <li>
      You should build your solution inside the
      <span class="text-pre">/src/sections/YourSolution.vue</span>
      file, but add as many child/sibling components as you see fit
    </li>
    <li>
      To simulate backend API calls, a <span class="text-pre">/src/mock-api/api.js</span>
      file is included for you
    </li>
    <li>
      The mock api utilizes local storage to behave like a store that you may interact with in the
      backend
    </li>
    <li>
      The mock api exports <span class="text-pre">getData()</span> to get a list of dates,
      <span class="text-pre">saveData(indexOrId, data)</span> to save your updates and lastly
      <span class="text-pre">addData(data)</span> to add a new entry into the list
    </li>
    <li>
      These are meant as mere helpers to reduce the complexity of this exercise but feel free to
      make changes to the mock api as needed
    </li>
    <li>The "Reset Data" button at the bottom is there to help clear the mock api store</li>
    <li>The default view should be a tabular or list form (of dates)</li>
    <li>
      There should be an ability to edit each row/record, either inline or through an intermediary
      view
    </li>
    <li>There should be an ability to add a new row/record</li>
    <li>
      For inspiration, here's an example of what an implementation might look like:
      <figure class="bg-slate-200 rounded-md my-2 p-2">
        <figcaption class="flex justify-around" :class="{ 'mb-2': showExample }">
          <span class="flex-auto"> Example Implementation </span>
          <button
            class="rounded bg-slate-400 px-3 py-1 text-xs text-white"
            @click="showExample = !showExample"
          >
            {{ showExample ? 'Hide' : 'Show' }}
          </button>
        </figcaption>
        <img v-if="showExample" src="@/assets/example.png" class="h-full rounded overflow-hidden" />
      </figure>
    </li>
    <li>You should be able to see your solution live update below:</li>
  </ul>
</template>

<style lang="postcss" scoped>
.text-pre {
  @apply font-mono rounded bg-stone-200 font-normal py-1 px-2;
}
</style>
