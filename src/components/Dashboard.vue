<template>
  <div class="p-6 mx-auto">
    <h1 class="text-2xl font-bold mb-4">Carbon Quanta</h1>

    <!-- Navigation Links for Categories -->
    <div class="flex space-x-4">
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
        @click="currentView = ''"
        :class="buttonClass('FugitiveEmissionAC')"
      >
        Scope 1 - Fugitive Emission (Air Conditioner)
      </button>
      <button
        @click="currentView = 'FugitiveEmissionFireExt'"
        :class="buttonClass('FugitiveEmissionFireExt')"
      >
        Scope 1 - Fugitive Emission (Fire Extinguisher Used)
      </button>
      <button
        @click="currentView = 'FugitiveEmissionFireExtLeak'"
        :class="buttonClass('FugitiveEmissionFireExtLeak')"
      >
        Scope 1 - Fugitive Emission (Fire Extinguisher Leakage)
      </button>
      <button @click="currentView = ''" :class="buttonClass('Electricity')">
        Scope 2 - Electricity
      </button>
    </div>

    <!-- Display Selected Component -->
    <component :is="currentView" class="mt-6"></component>
  </div>
</template>

<script>
import StationaryCombustion from "./ScopeComponents/ScopeStionaryCombustion.vue";
import MobileCombustion from "./ScopeComponents/ScopeMobileCombustion.vue";
// import FugitiveEmissionAC from "./ScopeComponents/FugitiveEmissionAC.vue";
import FugitiveEmissionFireExtLeak from "./ScopeComponents/FugitiveEmissionFireExt.vue";
import FugitiveEmissionFireExtLeak from "./ScopeComponents/FugitiveEmissionFireExtLeak.vue";

export default {
  name: "Dashboard",
  components: {
    StationaryCombustion,
    MobileCombustion,
    // FugitiveEmissionAC,
    FugitiveEmissionFireExt,
    FugitiveEmissionFireExtLeak,
  },
  data() {
    return {
      currentView: "StationaryCombustion",
    };
  },
  methods: {
    buttonClass(view) {
      return {
        "text-blue-500 font-semibold border-b-2 border-blue-500":
          this.currentView === view,
        "text-gray-500 hover:text-blue-500": this.currentView !== view,
      };
    },
  },
};
</script>

<style scoped>
button {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: color 0.3s, border-color 0.3s;
}
</style>
