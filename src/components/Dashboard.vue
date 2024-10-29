<template>
  <div class="p-6 mx-auto">
    <h1 class="text-2xl font-bold mb-4">Carbon Quanta</h1>

    <!-- Navigation Links for Categories -->
    <div class="flex space-x-4">
      <router-link
        to="/stationary-combustion"
        class="text-sm font-medium text-gray-500 hover:text-blue-500"
      >
        Scope 1 - Stationary Combustion
      </router-link>
      <router-link
        to="/mobile-combustion"
        class="text-sm font-medium text-gray-500 hover:text-blue-500"
      >
        Scope 1 - Mobile Combustion
      </router-link>
      <router-link
        to="/fugitive-emission-ac"
        class="text-sm font-medium text-gray-500 hover:text-blue-500"
      >
        Scope 1 - Fugitive Emission (Air Conditioner)
      </router-link>
      <router-link
        to="/fugitive-emission-fire-ext"
        class="text-sm font-medium text-gray-500 hover:text-blue-500"
      >
        Scope 1 - Fugitive Emission (Fire Extinguisher)
      </router-link>
    </div>

    <!-- Display Selected Component -->
    <router-view class="mt-6"></router-view>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
};
</script>
