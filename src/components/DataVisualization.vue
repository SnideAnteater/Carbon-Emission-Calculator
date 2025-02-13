<template>
  <div class="p-6">
    <div class="grid justify-items-center mb-4">
      <h2 class="text-3xl font-semibold">Overall Emissions</h2>
    </div>
    <div class="grid grid-cols-2">
      <div class="p-4 rounded-lg">
        <div class="flex justify-center items-center h-96">
          <canvas ref="overallPieChart"></canvas>
        </div>
      </div>
      <div class="p-4 rounded-lg">
        <div class="flex justify-center items-center h-96">
          <canvas ref="overallBarChart"></canvas>
        </div>
      </div>
    </div>
    <div class="grid grid-cols">
      <div class="p-4 rounded-lg">
        <div class="flex justify-center items-center">
          <canvas ref="scopeOneLineChart"></canvas>
        </div>
      </div>
    </div>
    <div class="grid grid-cols">
      <div class="p-4 rounded-lg">
        <div class="flex justify-center items-center">
          <canvas ref="scopeTwoLineChart"></canvas>
        </div>
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
      var kgCO2eqData = [];
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

      for (var i = 0; i < 12; i++) {
        kgCO2eqData.push(
          stationaryData[i].kgCO2Eq +
            mobileData[i].kgCO2Eq +
            fireExtData[i].totalEmission
        );
      }

      const pieConfig = {
        labels: ["Scope 1", "Scope 2"],
        datasets: [
          {
            label: "Dataset 1",
            data: [
              stationarySums.total.kgCO2eq +
                mobileSums.total.kgCO2eq +
                fireExtSums.total.emissions,
              electricityData.overallTotalEmission,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 1)", // Stationary Emissions
              "rgba(54, 162, 235, 1)", // Electricity Emissions
            ],
          },
        ],
      };

      const barConfig = {
        labels: stationaryData.map((row) => row.month),
        datasets: [
          {
            label: "Scope 1",
            data: kgCO2eqData.map((row) => row),
            backgroundColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: "Scope 2",
            data: electricityData.totalEmissionByMonth.map((row) => row),
            backgroundColor: "rgba(54, 162, 235, 1)",
          },
        ],
      };

      const scopeOneLineConfig = {
        labels: stationaryData.map((row) => row.month),
        datasets: [
          {
            label: "Scope 1",
            data: kgCO2eqData.map((row) => row),
            tension: 0.5,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 1)",
          },
        ],
      };

      const scopeTwoLineConfig = {
        labels: stationaryData.map((row) => row.month),
        datasets: [
          {
            label: "Scope 2",
            data: electricityData.totalEmissionByMonth.map((row) => row),
            tension: 0.5,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 1)",
          },
        ],
      };

      this.createOverallPieChart(pieConfig);
      this.createOverallBarChart(barConfig);
      this.createScopeOneLineChart(scopeOneLineConfig);
      this.createScopeTwoLineChart(scopeTwoLineConfig);
    },
    createOverallPieChart(pieChartConfig) {
      if (this.charts.overallPie) {
        this.charts.overallPie.destroy();
      }
      const ctx = this.$refs.overallPieChart;
      this.charts.overallPie = new Chart(ctx, {
        type: "pie",
        data: pieChartConfig,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: "top",
              align: "center",
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

    createOverallBarChart(barChartConfig) {
      if (this.charts.overallBar) {
        this.charts.overallBar.destroy();
      }
      const ctx = this.$refs.overallBarChart;
      this.charts.overallBar = new Chart(ctx, {
        type: "bar",
        data: barChartConfig,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: "top",
              align: "center",
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

    createScopeOneLineChart(scopeOneLineChart) {
      if (this.charts.scopeOneLine) {
        this.charts.scopeOneLine.destroy();
      }
      const ctx = this.$refs.scopeOneLineChart;
      this.charts.scopeOneLine = new Chart(ctx, {
        type: "line",
        data: scopeOneLineChart,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: "top",
              align: "center",
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
    createScopeTwoLineChart(scopeOneLineChart) {
      if (this.charts.scopeTwoLine) {
        this.charts.scopeTwoLine.destroy();
      }
      const ctx = this.$refs.scopeTwoLineChart;
      this.charts.scopeTwoLine = new Chart(ctx, {
        type: "line",
        data: scopeOneLineChart,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: "top",
              align: "center",
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
  },

  beforeDestroy() {
    // Cleanup charts
    // Object.values(this.charts).forEach((chart) => chart.destroy());
  },
};
</script>
