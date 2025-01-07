<template>
  <div class="p-6 mx-auto">
    <h1 class="text-2xl font-bold mb-4">Carbon Quanta</h1>

    <div class="navigation flex justify-center items-center">
      <ul>
        <li>
          <a
            @click="currentView = 'DataVisualization'"
            :class="buttonClass('DataVisualization')"
          >
            <span class="icon">
              <img class="h-8 w-8" src="../assets/analytics.svg" alt="" />
            </span>
            <span class="text">Overview</span>
          </a>
        </li>
        <li>
          <a
            @click="currentView = 'StationaryCombustion'"
            :class="buttonClass('StationaryCombustion')"
          >
            <span class="icon">
              <img class="h-8 w-8" src="../assets/s1.png" alt="" />
            </span>
            <span class="text">Scope 1</span>
          </a>
        </li>
        <li>
          <a
            @click="currentView = 'MobileCombustion'"
            :class="buttonClass('MobileCombustion')"
          >
            <span class="icon">
              <img class="h-8 w-8" src="../assets/s2.png" alt="" />
            </span>
            <span class="text">Scope 2</span>
          </a>
        </li>
        <li>
          <a
            @click="currentView = 'FugitiveEmissionFireExt'"
            :class="buttonClass('FugitiveEmissionFireExt')"
          >
            <span class="icon">
              <img class="h-8 w-8" src="../assets/s3.png" alt="" />
            </span>
            <span class="text">Scope 3</span>
          </a>
        </li>
        <li>
          <a
            @click="currentView = 'PurchasedElectricity'"
            :class="buttonClass('Electricity')"
          >
            <span class="icon">
              <img class="h-8 w-8" src="../assets/server.svg" alt="" />
            </span>
            <span class="text">Setting</span>
          </a>
        </li>
      </ul>
    </div>

    <!-- Navigation Links for Categories -->
    <div class="flex space-x-4">
      <button
        @click="currentView = 'DataVisualization'"
        :class="buttonClass('DataVisualization')"
      >
        Data Visualization
      </button>
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
      <!-- <button
        @click="currentView = ''"
        :class="buttonClass('FugitiveEmissionAC')"
      >
        Scope 1 - Fugitive Emission (Air Conditioner)
      </button> -->
      <button
        @click="currentView = 'FugitiveEmissionFireExt'"
        :class="buttonClass('FugitiveEmissionFireExt')"
      >
        Scope 1 - Fugitive Emission (Fire Extinguisher Used)
      </button>
      <!-- <button
        @click="currentView = 'FugitiveEmissionFireExtLeak'"
        :class="buttonClass('FugitiveEmissionFireExtLeak')"
      >
        Scope 1 - Fugitive Emission (Fire Extinguisher Leakage)
      </button> -->
      <button
        @click="currentView = 'PurchasedElectricity'"
        :class="buttonClass('Electricity')"
      >
        Scope 2 - Electricity
      </button>
    </div>

    <!-- Display Selected Component -->
    <component :is="currentView" class="mt-6"></component>
  </div>
</template>

<script>
import StationaryCombustion from "./ScopeComponents/ScopeStatiionaryCombustion.vue";
import MobileCombustion from "./ScopeComponents/ScopeMobileCombustion.vue";
// import FugitiveEmissionAC from "./ScopeComponents/FugitiveEmissionAC.vue";
import FugitiveEmissionFireExt from "./ScopeComponents/FugitiveEmissionFireExt.vue";
import FugitiveEmissionFireExtLeak from "./ScopeComponents/FugitiveEmissionFireExtLeak.vue";
import PurchasedElectricity from "./ScopeComponents/Electricity.vue";
import DataVisualization from "./DataVisualization.vue";

export default {
  name: "Dashboard",
  components: {
    StationaryCombustion,
    MobileCombustion,
    // FugitiveEmissionAC,
    FugitiveEmissionFireExt,
    FugitiveEmissionFireExtLeak,
    PurchasedElectricity,
    DataVisualization,
  },
  data() {
    return {
      currentView: "DataVisualization",
    };
  },
  methods: {
    buttonClass(view) {
      return {
        " active": this.currentView === view,
        "": this.currentView !== view,
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
