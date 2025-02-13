<template>
  <div class="p-6 mx-auto">
    <!-- Mobile Combustion Charts -->
    <div class="p-4 rounded-lg shadow shadow-black mb-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Electricity Consumption by Region</h2>
        <button
          @click="handleUpdate"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Graph
        </button>
      </div>
      <canvas ref="electricityChart"></canvas>
    </div>
    <h2 class="text-2xl font-semibold mb-4">Purchased Electricity</h2>

    <!-- Electricity Table -->
    <table class="min-w-full text-left text-sm">
      <thead class="bg-slate-500 text-slate-50 text-xs uppercase">
        <tr>
          <th class="px-4 py-2">Building Name</th>
          <th class="px-4 py-2">Region</th>
          <th class="px-4 py-2">Jan</th>
          <th class="px-4 py-2">Feb</th>
          <th class="px-4 py-2">Mar</th>
          <th class="px-4 py-2">Apr</th>
          <th class="px-4 py-2">May</th>
          <th class="px-4 py-2">Jun</th>
          <th class="px-4 py-2">Jul</th>
          <th class="px-4 py-2">Aug</th>
          <th class="px-4 py-2">Sep</th>
          <th class="px-4 py-2">Oct</th>
          <th class="px-4 py-2">Nov</th>
          <th class="px-4 py-2">Dec</th>
        </tr>
      </thead>
      <tbody class="divide-y text-gray-700 divide-gray-200">
        <tr v-for="(row, index) in tableData" :key="index">
          <!-- Editable Building Name -->
          <td class="p-2 text-center">
            <input
              v-model="row.buildingName"
              type="text"
              class="w-full border rounded-lg px-2 py-1 text-gray-700"
            />
          </td>

          <!-- Region Dropdown -->
          <td class="p-2">
            <select
              v-model="row.region"
              class="w-full border rounded-lg px-2 py-1 text-gray-700"
            >
              <option disabled value="">Select Region</option>
              <option v-for="region in regions" :key="region" :value="region">
                {{ region }}
              </option>
            </select>
          </td>

          <!-- Monthly Inputs -->
          <td v-for="month in months" :key="month" class="p-2">
            <input
              v-model.number="row[month.toLowerCase()]"
              type="number"
              class="w-full border rounded-lg px-2 py-1 text-gray-700"
              placeholder="0"
              min="0"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Add Row Button -->
    <button
      @click="addRow()"
      class="m-4 group relative inline-block focus:outline-none focus:ring"
    >
      <span
        class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-green-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
      ></span>
      <span
        class="border-white relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
      >
        Add Row
      </span>
    </button>

    <!-- Calculate Totals Button -->
    <!-- <button
      @click="calculateTotals()"
      class="m-4 group relative inline-block focus:outline-none focus:ring"
    >
      <span
        class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
      ></span>
      <span
        class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
      >
        Calculate Totals
      </span>
    </button> -->

    <!-- Total Electricity Consumption -->
    <div v-if="totals.length > 0" class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Total Electricity Consumption</h2>
      <table class="min-w-full text-center">
        <thead class="bg-slate-500 text-slate-50 text-xs uppercase">
          <tr>
            <th>Month</th>
            <th>Total Consumption</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 text-white">
          <tr v-for="(total, index) in totals" :key="index">
            <td>{{ months[index] }}</td>
            <td>{{ total }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Emissions by Region -->
    <div v-if="emissionsByRegion.length > 0" class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Emissions by Region</h2>
      <table class="min-w-full text-center">
        <thead class="bg-slate-500 text-slate-50 text-xs uppercase">
          <tr>
            <th>Month</th>
            <th v-for="region in regions" :key="region">{{ region }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 text-white">
          <tr
            v-for="(monthEmission, monthIndex) in emissionsByRegion"
            :key="monthIndex"
          >
            <td>{{ months[monthIndex] }}</td>
            <td v-for="region in regions" :key="region">
              {{ monthEmission[region] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Total Emission by Month -->
    <div v-if="totalEmissionByMonth.length > 0" class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Total Emission by Month</h2>
      <table class="min-w-full text-center">
        <thead class="bg-gray-100 text-xs uppercase">
          <tr>
            <th>Month</th>
            <th>Total Emission (kgCO2e)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 text-white">
          <tr v-for="(total, index) in totalEmissionByMonth" :key="index">
            <td>{{ months[index] }}</td>
            <td>{{ total }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Total Emission by Building -->
    <div v-if="totalEmissionByBuilding.length > 0" class="mt-8">
      <h3 class="text-xl font-semibold mb-4">Total Emission by Building</h3>
      <table class="min-w-full text-center">
        <thead class="bg-gray-100 text-xs uppercase">
          <tr>
            <th>Building</th>
            <th>Total Emission (kgCO2e)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 text-white">
          <tr v-for="(emission, index) in totalEmissionByBuilding" :key="index">
            <td>{{ emission.buildingName }}</td>
            <td>{{ emission.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Overall Emission -->
    <div
      v-if="overallTotalEmission !== null"
      class="mt-8 justify-center text-center"
    >
      <h3 class="text-xl font-semibold mb-4">
        Overall Total Emission (kgCO2e)
      </h3>
      <h1 class="text-xl font-semibold mb-4">{{ overallTotalEmission }}</h1>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  name: "PurchasedElectricity",
  data() {
    return {
      charts: {},
      data: this.loadFromLocalStorage() || [],
      tableData: this.loadFromLocalStorage() || [],
      regions: ["Peninsular Malaysia", "Sabah", "Sarawak"],
      emissionFactors: {
        "Peninsular Malaysia": 0.758,
        Sabah: 0.425,
        Sarawak: 0.198,
      },
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
      totals: [],
      emissionsByRegion: [],
      totalEmissionByMonth: [],
      totalEmissionByBuilding: [],
      overallTotalEmission: null,
    };
  },

  mounted() {
    this.createElectricityChart();
  },

  methods: {
    createElectricityChart() {
      if (this.charts.electricityChart) {
        this.charts.electricityChart.destroy();
      }

      const ctx = this.$refs.electricityChart;
      const datasets = !this.data.emissionsByRegion
        ? this.months.map((month) => ({
            month,
            "Peninsular Malaysia": 0,
            Sabah: 0,
            Sarawak: 0,
          }))
        : this.months.map((month, index) => ({
            month,
            ...this.data.emissionsByRegion[index],
          }));

      this.charts.electricityChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.months,
          datasets: [
            {
              label: "Peninsular Malaysia",
              data: datasets.map((d) => d["Peninsular Malaysia"]),
              backgroundColor: "rgba(255, 99, 132)",
            },
            {
              label: "Sabah",
              data: datasets.map((d) => d["Sabah"]),
              backgroundColor: "rgba(54, 162, 235)",
            },
            {
              label: "Sarawak",
              data: datasets.map((d) => d["Sarawak"]),
              backgroundColor: "rgba(75, 192, 192)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Monthly Electricity Emissions by Region",
              color: "white",
            },
            legend: {
              position: "top",
              labels: {
                font: {
                  size: 14,
                },
                color: "white",
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                color: "rgba(255, 255, 255, 0.5)",
              },
              ticks: {
                color: "white",
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(255, 255, 255, 0.5)",
              },
              ticks: {
                color: "white",
              },
            },
          },
        },
      });
    },

    loadFromLocalStorage() {
      const savedData = localStorage.getItem("electricityData");
      return savedData ? JSON.parse(savedData) : null;
    },

    saveToLocalStorage() {
      localStorage.setItem(
        "electricityData",
        JSON.stringify({
          tableData: this.tableData,
          totals: this.totals,
          emissionsByRegion: this.emissionsByRegion,
          totalEmissionByMonth: this.totalEmissionByMonth,
          totalEmissionByBuilding: this.totalEmissionByBuilding,
          overallTotalEmission: this.overallTotalEmission,
        })
      );
      this.data = JSON.parse(localStorage.getItem("electricityData") || "{}");
    },

    addRow() {
      const newRow = {
        buildingName: `Location ${this.tableData.length + 1}`,
        region: "",
      };
      this.months.forEach((month) => (newRow[month.toLowerCase()] = 0));
      this.tableData.push(newRow);
      this.saveToLocalStorage();
    },

    calculateTotals() {
      this.calculateTotalConsumption();
      this.calculateEmissionsByRegion();
      this.calculateTotalEmissionByMonth();
      this.calculateTotalEmissionByBuilding();
      this.calculateOverallEmission();
      this.saveToLocalStorage();
    },

    calculateTotalConsumption() {
      this.totals = this.months.map((month) => {
        return this.tableData.reduce(
          (sum, row) => sum + (row[month.toLowerCase()] || 0),
          0
        );
      });
    },

    calculateEmissionsByRegion() {
      this.emissionsByRegion = this.months.map((month) => {
        const emissions = {};
        this.regions.forEach((region) => {
          emissions[region] = this.tableData
            .filter((row) => row.region === region)
            .reduce(
              (sum, row) =>
                sum +
                (row[month.toLowerCase()] || 0) * this.emissionFactors[region],
              0
            );
        });
        return emissions;
      });
    },

    calculateTotalEmissionByMonth() {
      this.totalEmissionByMonth = this.emissionsByRegion.map(
        (monthEmission) => {
          return Object.values(monthEmission).reduce(
            (sum, emission) => sum + emission,
            0
          );
        }
      );
    },

    calculateTotalEmissionByBuilding() {
      this.totalEmissionByBuilding = this.tableData.map((row) => {
        const total = this.months.reduce((sum, month) => {
          const factor = this.emissionFactors[row.region] || 0;
          return sum + (row[month.toLowerCase()] || 0) * factor;
        }, 0);
        return { buildingName: row.buildingName, total };
      });
    },

    calculateOverallEmission() {
      this.overallTotalEmission = this.totalEmissionByMonth.reduce(
        (sum, emission) => sum + emission,
        0
      );
    },

    handleUpdate() {
      this.createElectricityChart();
    },
  },

  // Watch for changes in input values
  watch: {
    tableData: {
      handler(newVal) {
        this.calculateTotals();
      },
      deep: true,
    },
  },

  // Load data when component is created
  created() {
    const savedData = localStorage.getItem("electricityData");
    if (savedData) {
      const data = JSON.parse(savedData);
      this.tableData = data.tableData;
      this.totals = data.totals;
      this.emissionsByRegion = data.emissionsByRegion;
      this.totalEmissionByMonth = data.totalEmissionByMonth;
      this.totalEmissionByBuilding = data.totalEmissionByBuilding;
      this.overallTotalEmission = data.overallTotalEmission;
    }
  },
};
</script>

<style scoped>
/* Optional styling */
</style>
