<template>
  <div class="p-6">
    <div class="grid grid-cols-2 gap-6">
      <!-- Stationary Combustion Charts -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">
          Stationary Combustion Emissions
        </h2>
        <canvas ref="stationaryChart"></canvas>
      </div>

      <!-- Mobile Combustion Charts -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Mobile Combustion Emissions</h2>
        <canvas ref="mobileChart"></canvas>
      </div>

      <!-- Electricity Consumption -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">
          Electricity Consumption by Region
        </h2>
        <canvas ref="electricityChart"></canvas>
      </div>

      <!-- Fire Extinguisher Emissions -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Fire Extinguisher Emissions</h2>
        <canvas ref="fireExtChart"></canvas>
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
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
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

      this.createStationaryChart(stationaryData);
      this.createMobileChart(mobileData);
      this.createElectricityChart(electricityData);
      this.createFireExtChart(fireExtData);
    },

    createStationaryChart(data) {
      const ctx = this.$refs.stationaryChart;
      this.charts.stationary = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.months,
          datasets: [
            {
              label: "Petrol CO2eq",
              data: data.map((row) => row.petrolkgCO2eq),
              borderColor: "rgb(255, 99, 132)",
              tension: 0.1,
            },
            {
              label: "Diesel CO2eq",
              data: data.map((row) => row.dieselkgCO2eq),
              borderColor: "rgb(54, 162, 235)",
              tension: 0.1,
            },
            {
              label: "LPG CO2eq",
              data: data.map((row) => row.lpgkgCO2eq),
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
            {
              label: "Natural Gas CO2eq",
              data: data.map((row) => row.naturalGaskgCO2eq),
              borderColor: "rgb(153, 102, 255)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Monthly Emissions by Fuel Type",
            },
          },
        },
      });
    },

    createMobileChart(data) {
      const ctx = this.$refs.mobileChart;
      this.charts.mobile = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.months,
          datasets: [
            {
              label: "Petrol CO2eq",
              data: data.map((row) => row.petrolkgCO2eq),
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Diesel CO2eq",
              data: data.map((row) => row.dieselkgCO2eq),
              backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Monthly Mobile Emissions",
            },
          },
        },
      });
    },

    createElectricityChart(data) {
      const ctx = this.$refs.electricityChart;
      if (!data.emissionsByRegion) return;

      const datasets = this.months.map((month, index) => ({
        month,
        ...data.emissionsByRegion[index],
      }));

      this.charts.electricity = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.months,
          datasets: [
            {
              label: "Peninsular Malaysia",
              data: datasets.map((d) => d["Peninsular Malaysia"]),
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Sabah",
              data: datasets.map((d) => d["Sabah"]),
              backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
            {
              label: "Sarawak",
              data: datasets.map((d) => d["Sarawak"]),
              backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Monthly Electricity Emissions by Region",
            },
          },
        },
      });
    },

    createFireExtChart(data) {
      const ctx = this.$refs.fireExtChart;
      this.charts.fireExt = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.months,
          datasets: [
            {
              label: "Fixed CO2",
              data: data.map((row) => row.emissionsFixedCO2),
              borderColor: "rgb(255, 99, 132)",
              tension: 0.1,
            },
            {
              label: "Fixed HFC",
              data: data.map((row) => row.emissionsHFC),
              borderColor: "rgb(54, 162, 235)",
              tension: 0.1,
            },
            {
              label: "Portable CO2",
              data: data.map((row) => row.emissionsPortableCO2),
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Monthly Fire Extinguisher Emissions",
            },
          },
        },
      });
    },
  },
  beforeDestroy() {
    // Cleanup charts
    Object.values(this.charts).forEach((chart) => chart.destroy());
  },
};
</script>
