<template>
  <div class="space-y-4">
    <!-- Scope 1 -->
    <div>
      <label for="Scope1" class="block text-sm font-medium text-blue-500"
        >Scope 1</label
      >
      <div class="relative mt-1.5">
        <input
          type="text"
          list="Scope1Item"
          id="Scope1"
          class="w-full rounded-lg border-gray-300 pe-10 text-gray-700 sm:text-sm"
          placeholder="Please select"
          v-model="selectedScope1"
        />
        <span class="absolute inset-y-0 end-0 flex w-8 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5 text-gray-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </span>
      </div>

      <datalist id="Scope1Item">
        <option v-for="n in 100" :key="n" :value="n - 1">{{ n - 1 }}</option>
      </datalist>
    </div>

    <!-- Scope 2 -->
    <div>
      <label for="Scope2" class="block text-sm font-medium text-blue-500"
        >Scope 2</label
      >
      <div class="relative mt-1.5">
        <input
          type="text"
          list="Scope2Item"
          id="Scope2"
          class="w-full rounded-lg border-gray-300 pe-10 text-gray-700 sm:text-sm"
          placeholder="Please select"
          v-model="selectedScope2"
        />
        <span class="absolute inset-y-0 end-0 flex w-8 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5 text-gray-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </span>
      </div>

      <datalist id="Scope2Item">
        <option v-for="n in 100" :key="n" :value="n - 1">{{ n - 1 }}</option>
      </datalist>
    </div>

    <!-- Scope 3 -->
    <div>
      <label for="Scope3" class="block text-sm font-medium text-blue-500"
        >Scope 3</label
      >
      <div class="relative mt-1.5">
        <input
          type="text"
          list="Scope3Item"
          id="Scope3"
          class="w-full rounded-lg border-gray-300 pe-10 text-gray-700 sm:text-sm"
          placeholder="Please select"
          v-model="selectedScope3"
        />
        <span class="absolute inset-y-0 end-0 flex w-8 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5 text-gray-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </span>
      </div>

      <datalist id="Scope3Item">
        <option v-for="n in 100" :key="n" :value="n - 1">{{ n - 1 }}</option>
      </datalist>
    </div>

    <!-- Display selected values for each scope -->
    <div class="mt-4 p-4 bg-gray-100 rounded-lg">
      <h3 class="font-bold text-lg">Selected Values:</h3>
      <ul>
        <li>Scope 1: {{ selectedScope1 || "None selected" }}</li>
        <li>Scope 2: {{ selectedScope2 || "None selected" }}</li>
        <li>Scope 3: {{ selectedScope3 || "None selected" }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedScope1: null,
      selectedScope2: null,
      selectedScope3: null,
    };
  },
};
</script>

<style scoped>
/* You can add additional styles here */
</style>
