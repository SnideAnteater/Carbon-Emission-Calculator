<template>
  <div class="p-6">
    <div class="p-4 rounded-lg shadow">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Overall Emissions</h2>
      </div>
      <div class="flex justify-center items-center h-svh">
        <canvas ref="overallChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "DataVisualization",
  data() {
    return {
      charts: {},
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      // Load data from localStorage
      const stationaryData = JSON.parse(
        localStorage.getItem("stationaryCombustionData") || "[]"
      );
      const stationarySums = JSON.parse(
        localStorage.getItem("stationaryCombustionSums") || "{}"
      );

      const mobileData = JSON.parse(
        localStorage.getItem("mobileCombustionData") || "[]"
      );
      const mobileSums = JSON.parse(
        localStorage.getItem("mobileCombustionSums") || "{}"
      );

      const electricityData = JSON.parse(
        localStorage.getItem("electricityData") || "{}"
      );

      const fireExtData = JSON.parse(
        localStorage.getItem("fugitiveEmissionsData") || "[]"
      );
      const fireExtSums = JSON.parse(
        localStorage.getItem("fugitiveEmissionsSums") || "{}"
      );

      const config = {
        labels: [
          "Stationary Combustion Emission",
          "Mobile Combustion Emission",
          "Fugitive Emissons",
          "Electricity Emissons",
        ],
        datasets: [
          {
            label: "Dataset 1",
            data: [
              stationarySums.total.kgCO2eq,
              mobileSums.total.kgCO2eq,
              fireExtSums.total.emissions,
              electricityData.overallTotalEmission,
            ],
            backgroundColor: [
              "rgb(75, 192, 192)", // Stationary Emissions
              "rgb(153, 102, 255)", // Mobile Emissions
              "rgb(255, 159, 64)", // Fire Extinguisher Emissions
              "rgb(255, 205, 86)", // Electricity Emissions
            ],
          },
        ],
      };

      this.createOverallPieChart(config);
    },
    createOverallPieChart(exampleConfig) {
      if (this.charts.overall) {
        this.charts.overall.destroy();
      }
      const ctx = this.$refs.overallChart;
      this.charts.overall = new Chart(ctx, {
        type: "pie",
        data: exampleConfig,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: "top",
              align: "start",
              labels: {
                font: {
                  size: 14,
                },
                color: "white",
              },
            },
          },
        },
      });
    },
  },

  beforeDestroy() {
    // Cleanup charts
    // Object.values(this.charts).forEach((chart) => chart.destroy());
  },
};
</script>
