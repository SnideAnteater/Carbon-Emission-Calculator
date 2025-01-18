<template lang="">
  <!-- Navigation Links for Categories -->
  <div class="flex justify-between p-6">
    <button
      @click="currentView = 'StationaryCombustion'"
      :class="buttonClass('StationaryCombustion')"
    >
      Scope 1 - Stationary Combustion
    </button>
    <button
      @click="currentView = 'MobileCombustion'"
      :class="buttonClass('MobileCombustion')"
    >
      Scope 1 - Mobile Combustion
    </button>
    <button
      @click="currentView = 'FugitiveEmissionFireExt'"
      :class="buttonClass('FugitiveEmissionFireExt')"
    >
      Scope 1 - Fugitive Emission (Fire Extinguisher Used)
    </button>
  </div>
  <!-- Display Selected Component -->
  <component :is="currentView" class="mt-6"></component>
</template>
<script>
import StationaryCombustion from "./ScopeStatiionaryCombustion.vue";
import MobileCombustion from "./ScopeMobileCombustion.vue";
import FugitiveEmissionFireExt from "./FugitiveEmissionFireExt.vue";
export default {
  components: {
    StationaryCombustion,
    MobileCombustion,
    FugitiveEmissionFireExt,
  },
  data() {
    return {
      currentView: "StationaryCombustion",
    };
  },
  methods: {
    buttonClass(view) {
      console.log(view);
      return {
        " text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900":
          this.currentView === view,
        "py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700":
          this.currentView !== view,
      };
    },
  },
};
</script>
<style lang=""></style>
