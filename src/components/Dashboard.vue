<template>
  <div class="p-6 mx-auto min-w-[60vw] max-w-[60vw]">
    <!-- <h1 class="text-2xl font-bold mb-4">Carbon Quanta</h1> -->
    <img class="w-52" src="../assets/CQLogo.png" alt="" />

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
            @click="currentView = 'ScopeOneDashboard'"
            :class="buttonClass('ScopeOneDashboard')"
          >
            <span class="icon">
              <img class="h-8 w-8" src="../assets/s1.png" alt="" />
            </span>
            <span class="text">Scope 1</span>
          </a>
        </li>
        <li>
          <a
            @click="currentView = 'Electricity'"
            :class="buttonClass('Electricity')"
          >
            <span class="icon">
              <img class="h-8 w-8" src="../assets/s2.png" alt="" />
            </span>
            <span class="text">Scope 2</span>
          </a>
        </li>
        <li>
          <a
            @click="currentView = 'ScopeThreeDashboard'"
            :class="buttonClass('ScopeThreeDashboard')"
          >
            <span class="icon">
              <img class="h-8 w-8" src="../assets/s3.png" alt="" />
            </span>
            <span class="text">Scope 3</span>
          </a>
        </li>
        <li>
          <a @click="currentView = 'Settings'" :class="buttonClass('Settings')">
            <span class="icon">
              <img class="h-8 w-8" src="../assets/server.svg" alt="" />
            </span>
            <span class="text">Settings</span>
          </a>
        </li>
      </ul>
    </div>
    <!-- Display Selected Component -->
    <component :is="currentView"></component>
  </div>
</template>

<script>
import ScopeOneDashboard from "./ScopeComponents/ScopeOneDashboard.vue";
import Electricity from "./ScopeComponents/Electricity.vue";
import DataVisualization from "./DataVisualization.vue";
import ScopeThreeDashboard from "./ScopeComponents/ScopeThreeDashboard.vue";
import Settings from "./common/Settings.vue";

export default {
  name: "Dashboard",
  components: {
    ScopeOneDashboard,
    Electricity,
    DataVisualization,
    ScopeThreeDashboard,
    Settings,
  },
  data() {
    return {
      currentView: "DataVisualization",
    };
  },
  methods: {
    buttonClass(view) {
      // console.log(view);
      return {
        " active": this.currentView === view,
        "": this.currentView !== view,
      };
    },
  },
};
</script>
