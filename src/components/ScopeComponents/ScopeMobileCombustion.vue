<template>
  <div class="py-5">
    <!-- Mobile Combustion Charts -->
    <div class="p-4 rounded-lg shadow">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Mobile Combustion Emissions</h2>
        <button
          @click="handleUpdate"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Graph
        </button>
      </div>
      <canvas ref="mobileChart"></canvas>
    </div>
    <h1 class="text-2xl font-bold my-4">Fuel Information</h1>

    <table class="min-w-full text-left text-sm">
      <thead class="bg-slate-500 text-slate-50 text-xs uppercase">
        <tr>
          <th class="px-4 py-2">Month</th>
          <th class="px-4 py-2">Sites</th>
          <th class="px-4 py-2">Type of Equipment</th>
          <!-- Petrol -->
          <th class="px-4 py-2">Petrol (litres)</th>
          <th class="px-4 py-2">Petrol (TJ)</th>
          <!-- Diesel -->
          <th class="px-4 py-2">Diesel (litres)</th>
          <th class="px-4 py-2">Diesel (TJ)</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 text-white">
        <tr v-for="(row, index) in tableData" :key="index">
          <td class="px-4 py-2">{{ row.month }}</td>
          <td class="px-4 py-2">{{ row.sites }}</td>
          <td class="px-4 py-2">{{ row.equipment }}</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            <input
              type="number"
              class="w-full border rounded-lg px-2 py-1 text-gray-700"
              v-model="row.petrolLitres"
            />
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.petrolTJ * 1000) / 1000 }}
          </td>
          <!-- Diesel -->
          <td class="px-4 py-2">
            <input
              type="number"
              class="w-full border rounded-lg px-2 py-1 text-gray-700"
              v-model="row.dieselLitres"
            />
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.dieselTJ * 1000) / 1000 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="py-5">
    <h1 class="text-2xl font-bold my-4">Petrol Fuel Emissions</h1>

    <table class="min-w-full text-left text-sm">
      <thead class="bg-slate-500 text-slate-50 text-xs uppercase">
        <tr>
          <th class="px-4 py-2">Month</th>
          <th class="px-4 py-2">Sites</th>
          <th class="px-4 py-2">Type of Equipment</th>
          <!-- Petrol -->
          <th class="px-4 py-2">Petrol (kgCO2)</th>
          <th class="px-4 py-2">Petrol (kgCH4)</th>
          <th class="px-4 py-2">Petrol (kgN2O)</th>
          <th class="px-4 py-2">Petrol (kgCO2eq)</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 text-white">
        <tr v-for="(row, index) in tableData" :key="index">
          <td class="px-4 py-2">{{ row.month }}</td>
          <td class="px-4 py-2">{{ row.sites }}</td>
          <td class="px-4 py-2">{{ row.equipment }}</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(row.petrolkgCO2 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.petrolkgCH4 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.petrolkgN2O * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.petrolkgCO2eq * 1000) / 1000 }}
          </td>
        </tr>
        <tr>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2">SUM</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(sums.petrol.kgCO2 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sums.petrol.kgCH4 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sums.petrol.kgN2O * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sums.petrol.kgCO2eq * 1000) / 1000 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="py-5">
    <h1 class="text-2xl font-bold my-4">Diesel Emissions</h1>

    <table class="min-w-full text-left text-sm">
      <thead class="bg-slate-500 text-slate-50 text-xs uppercase">
        <tr>
          <th class="px-4 py-2">Month</th>
          <th class="px-4 py-2">Sites</th>
          <th class="px-4 py-2">Type of Equipment</th>
          <!-- Petrol -->
          <th class="px-4 py-2">Diesel (kgCO2)</th>
          <th class="px-4 py-2">Diesel (kgCH4)</th>
          <th class="px-4 py-2">Diesel (kgN2O)</th>
          <th class="px-4 py-2">Diesel (kgCO2eq)</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 text-white">
        <tr v-for="(row, index) in tableData" :key="index">
          <td class="px-4 py-2">{{ row.month }}</td>
          <td class="px-4 py-2">{{ row.sites }}</td>
          <td class="px-4 py-2">{{ row.equipment }}</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(row.dieselkgCO2 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.dieselkgCH4 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.dieselkgN2O * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.dieselkgCO2eq * 1000) / 1000 }}
          </td>
        </tr>
        <tr>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2">SUM</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(sums.diesel.kgCO2 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sums.diesel.kgCH4 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sums.diesel.kgN2O * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sums.diesel.kgCO2eq * 1000) / 1000 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="py-5">
    <h1 class="text-2xl font-bold my-4">Total Emissions</h1>

    <table class="min-w-full text-left text-sm">
      <thead class="bg-slate-500 text-slate-50 text-xs uppercase">
        <tr>
          <th class="px-4 py-2">Month</th>
          <th class="px-4 py-2">Sites</th>
          <th class="px-4 py-2">Type of Equipment</th>
          <!-- Petrol -->
          <th class="px-4 py-2">kgCO2</th>
          <th class="px-4 py-2">kgCH4</th>
          <th class="px-4 py-2">kgN2O</th>
          <th class="px-4 py-2">kgCO2eq</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 text-white">
        <tr v-for="(row, index) in tableData" :key="index">
          <td class="px-4 py-2">{{ row.month }}</td>
          <td class="px-4 py-2">{{ row.sites }}</td>
          <td class="px-4 py-2">{{ row.equipment }}</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(row.kgCO2 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.kgCH4 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.kgN20 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.kgCO2Eq * 1000) / 1000 }}
          </td>
        </tr>
        <tr>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2">SUM</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(sums.total.kgCO2 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sums.total.kgCH4 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sums.total.kgN2O * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sums.total.kgCO2eq * 1000) / 1000 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "MobileCombustion",
  data() {
    return {
      charts: {},
      tableData: this.loadFromLocalStorage() || [
        {
          month: "Jan",
          sites: "HQ",
          equipment: "Owned Car",
          petrolLitres: 0,
          petrolTJ: 0,
          petrolkgCO2: 0,
          petrolkgCH4: 0,
          petrolkgN2O: 0,
          petrolkgCO2eq: 0,
          dieselLitres: 0,
          dieselTJ: 0,
          dieselkgCO2: 0,
          dieselkgCH4: 0,
          dieselkgN2O: 0,
          dieselkgCO2eq: 0,
          lpgLitres: 0,
          lpgTJ: 0,
          lpgkgCO2: 0,
          lpgkgCH4: 0,
          lpgkgN2O: 0,
          lpgkgCO2eq: 0,
          naturalGasMMBTU: 0,
          naturalGasTJ: 0,
          naturalGaskgCO2: 0,
          naturalGaskgCH4: 0,
          naturalGaskgN2O: 0,
          naturalGaskgCO2eq: 0,
          kgCO2: 0,
          kgCH4: 0,
          kgN20: 0,
          kgCO2Eq: 0,
        },
        {
          month: "Feb",
          sites: "HQ",
          equipment: "Owned Car",
          petrolLitres: 0,
          petrolTJ: 0,
          petrolkgCO2: 0,
          petrolkgCH4: 0,
          petrolkgN2O: 0,
          petrolkgCO2eq: 0,
          dieselLitres: 0,
          dieselTJ: 0,
          dieselkgCO2: 0,
          dieselkgCH4: 0,
          dieselkgN2O: 0,
          dieselkgCO2eq: 0,
          lpgLitres: 0,
          lpgTJ: 0,
          lpgkgCO2: 0,
          lpgkgCH4: 0,
          lpgkgN2O: 0,
          lpgkgCO2eq: 0,
          naturalGasMMBTU: 0,
          naturalGasTJ: 0,
          naturalGaskgCO2: 0,
          naturalGaskgCH4: 0,
          naturalGaskgN2O: 0,
          naturalGaskgCO2eq: 0,
          kgCO2: 0,
          kgCH4: 0,
          kgN20: 0,
          kgCO2Eq: 0,
        },
        {
          month: "Mar",
          sites: "HQ",
          equipment: "Owned Car",
          petrolLitres: 0,
          petrolTJ: 0,
          petrolkgCO2: 0,
          petrolkgCH4: 0,
          petrolkgN2O: 0,
          petrolkgCO2eq: 0,
          dieselLitres: 0,
          dieselTJ: 0,
          dieselkgCO2: 0,
          dieselkgCH4: 0,
          dieselkgN2O: 0,
          dieselkgCO2eq: 0,
          lpgLitres: 0,
          lpgTJ: 0,
          lpgkgCO2: 0,
          lpgkgCH4: 0,
          lpgkgN2O: 0,
          lpgkgCO2eq: 0,
          naturalGasMMBTU: 0,
          naturalGasTJ: 0,
          naturalGaskgCO2: 0,
          naturalGaskgCH4: 0,
          naturalGaskgN2O: 0,
          naturalGaskgCO2eq: 0,
          kgCO2: 0,
          kgCH4: 0,
          kgN20: 0,
          kgCO2Eq: 0,
        },
        {
          month: "Apr",
          sites: "HQ",
          equipment: "Owned Car",
          petrolLitres: 0,
          petrolTJ: 0,
          petrolkgCO2: 0,
          petrolkgCH4: 0,
          petrolkgN2O: 0,
          petrolkgCO2eq: 0,
          dieselLitres: 0,
          dieselTJ: 0,
          dieselkgCO2: 0,
          dieselkgCH4: 0,
          dieselkgN2O: 0,
          dieselkgCO2eq: 0,
          lpgLitres: 0,
          lpgTJ: 0,
          lpgkgCO2: 0,
          lpgkgCH4: 0,
          lpgkgN2O: 0,
          lpgkgCO2eq: 0,
          naturalGasMMBTU: 0,
          naturalGasTJ: 0,
          naturalGaskgCO2: 0,
          naturalGaskgCH4: 0,
          naturalGaskgN2O: 0,
          naturalGaskgCO2eq: 0,
          kgCO2: 0,
          kgCH4: 0,
          kgN20: 0,
          kgCO2Eq: 0,
        },
        {
          month: "May",
          sites: "HQ",
          equipment: "Owned Car",
          petrolLitres: 0,
          petrolTJ: 0,
          petrolkgCO2: 0,
          petrolkgCH4: 0,
          petrolkgN2O: 0,
          petrolkgCO2eq: 0,
          dieselLitres: 0,
          dieselTJ: 0,
          dieselkgCO2: 0,
          dieselkgCH4: 0,
          dieselkgN2O: 0,
          dieselkgCO2eq: 0,
          lpgLitres: 0,
          lpgTJ: 0,
          lpgkgCO2: 0,
          lpgkgCH4: 0,
          lpgkgN2O: 0,
          lpgkgCO2eq: 0,
          naturalGasMMBTU: 0,
          naturalGasTJ: 0,
          naturalGaskgCO2: 0,
          naturalGaskgCH4: 0,
          naturalGaskgN2O: 0,
          naturalGaskgCO2eq: 0,
          kgCO2: 0,
          kgCH4: 0,
          kgN20: 0,
          kgCO2Eq: 0,
        },
        {
          month: "June",
          sites: "HQ",
          equipment: "Owned Car",
          petrolLitres: 0,
          petrolTJ: 0,
          petrolkgCO2: 0,
          petrolkgCH4: 0,
          petrolkgN2O: 0,
          petrolkgCO2eq: 0,
          dieselLitres: 0,
          dieselTJ: 0,
          dieselkgCO2: 0,
          dieselkgCH4: 0,
          dieselkgN2O: 0,
          dieselkgCO2eq: 0,
          lpgLitres: 0,
          lpgTJ: 0,
          lpgkgCO2: 0,
          lpgkgCH4: 0,
          lpgkgN2O: 0,
          lpgkgCO2eq: 0,
          naturalGasMMBTU: 0,
          naturalGasTJ: 0,
          naturalGaskgCO2: 0,
          naturalGaskgCH4: 0,
          naturalGaskgN2O: 0,
          naturalGaskgCO2eq: 0,
          kgCO2: 0,
          kgCH4: 0,
          kgN20: 0,
          kgCO2Eq: 0,
        },
        {
          month: "July",
          sites: "HQ",
          equipment: "Owned Car",
          petrolLitres: 0,
          petrolTJ: 0,
          petrolkgCO2: 0,
          petrolkgCH4: 0,
          petrolkgN2O: 0,
          petrolkgCO2eq: 0,
          dieselLitres: 0,
          dieselTJ: 0,
          dieselkgCO2: 0,
          dieselkgCH4: 0,
          dieselkgN2O: 0,
          dieselkgCO2eq: 0,
          lpgLitres: 0,
          lpgTJ: 0,
          lpgkgCO2: 0,
          lpgkgCH4: 0,
          lpgkgN2O: 0,
          lpgkgCO2eq: 0,
          naturalGasMMBTU: 0,
          naturalGasTJ: 0,
          naturalGaskgCO2: 0,
          naturalGaskgCH4: 0,
          naturalGaskgN2O: 0,
          naturalGaskgCO2eq: 0,
          kgCO2: 0,
          kgCH4: 0,
          kgN20: 0,
          kgCO2Eq: 0,
        },
        {
          month: "Aug",
          sites: "HQ",
          equipment: "Owned Car",
          petrolLitres: 0,
          petrolTJ: 0,
          petrolkgCO2: 0,
          petrolkgCH4: 0,
          petrolkgN2O: 0,
          petrolkgCO2eq: 0,
          dieselLitres: 0,
          dieselTJ: 0,
          dieselkgCO2: 0,
          dieselkgCH4: 0,
          dieselkgN2O: 0,
          dieselkgCO2eq: 0,
          lpgLitres: 0,
          lpgTJ: 0,
          lpgkgCO2: 0,
          lpgkgCH4: 0,
          lpgkgN2O: 0,
          lpgkgCO2eq: 0,
          naturalGasMMBTU: 0,
          naturalGasTJ: 0,
          naturalGaskgCO2: 0,
          naturalGaskgCH4: 0,
          naturalGaskgN2O: 0,
          naturalGaskgCO2eq: 0,
          kgCO2: 0,
          kgCH4: 0,
          kgN20: 0,
          kgCO2Eq: 0,
        },
        {
          month: "Sep",
          sites: "HQ",
          equipment: "Owned Car",
          petrolLitres: 0,
          petrolTJ: 0,
          petrolkgCO2: 0,
          petrolkgCH4: 0,
          petrolkgN2O: 0,
          petrolkgCO2eq: 0,
          dieselLitres: 0,
          dieselTJ: 0,
          dieselkgCO2: 0,
          dieselkgCH4: 0,
          dieselkgN2O: 0,
          dieselkgCO2eq: 0,
          lpgLitres: 0,
          lpgTJ: 0,
          lpgkgCO2: 0,
          lpgkgCH4: 0,
          lpgkgN2O: 0,
          lpgkgCO2eq: 0,
          naturalGasMMBTU: 0,
          naturalGasTJ: 0,
          naturalGaskgCO2: 0,
          naturalGaskgCH4: 0,
          naturalGaskgN2O: 0,
          naturalGaskgCO2eq: 0,
          kgCO2: 0,
          kgCH4: 0,
          kgN20: 0,
          kgCO2Eq: 0,
        },
        {
          month: "Oct",
          sites: "HQ",
          equipment: "Owned Car",
          petrolLitres: 0,
          petrolTJ: 0,
          petrolkgCO2: 0,
          petrolkgCH4: 0,
          petrolkgN2O: 0,
          petrolkgCO2eq: 0,
          dieselLitres: 0,
          dieselTJ: 0,
          dieselkgCO2: 0,
          dieselkgCH4: 0,
          dieselkgN2O: 0,
          dieselkgCO2eq: 0,
          lpgLitres: 0,
          lpgTJ: 0,
          lpgkgCO2: 0,
          lpgkgCH4: 0,
          lpgkgN2O: 0,
          lpgkgCO2eq: 0,
          naturalGasMMBTU: 0,
          naturalGasTJ: 0,
          naturalGaskgCO2: 0,
          naturalGaskgCH4: 0,
          naturalGaskgN2O: 0,
          naturalGaskgCO2eq: 0,
          kgCO2: 0,
          kgCH4: 0,
          kgN20: 0,
          kgCO2Eq: 0,
        },
        {
          month: "Nov",
          sites: "HQ",
          equipment: "Owned Car",
          petrolLitres: 0,
          petrolTJ: 0,
          petrolkgCO2: 0,
          petrolkgCH4: 0,
          petrolkgN2O: 0,
          petrolkgCO2eq: 0,
          dieselLitres: 0,
          dieselTJ: 0,
          dieselkgCO2: 0,
          dieselkgCH4: 0,
          dieselkgN2O: 0,
          dieselkgCO2eq: 0,
          lpgLitres: 0,
          lpgTJ: 0,
          lpgkgCO2: 0,
          lpgkgCH4: 0,
          lpgkgN2O: 0,
          lpgkgCO2eq: 0,
          naturalGasMMBTU: 0,
          naturalGasTJ: 0,
          naturalGaskgCO2: 0,
          naturalGaskgCH4: 0,
          naturalGaskgN2O: 0,
          naturalGaskgCO2eq: 0,
          kgCO2: 0,
          kgCH4: 0,
          kgN20: 0,
          kgCO2Eq: 0,
        },
        {
          month: "Dec",
          sites: "HQ",
          equipment: "Owned Car",
          petrolLitres: 0,
          petrolTJ: 0,
          petrolkgCO2: 0,
          petrolkgCH4: 0,
          petrolkgN2O: 0,
          petrolkgCO2eq: 0,
          dieselLitres: 0,
          dieselTJ: 0,
          dieselkgCO2: 0,
          dieselkgCH4: 0,
          dieselkgN2O: 0,
          dieselkgCO2eq: 0,
          lpgLitres: 0,
          lpgTJ: 0,
          lpgkgCO2: 0,
          lpgkgCH4: 0,
          lpgkgN2O: 0,
          lpgkgCO2eq: 0,
          naturalGasMMBTU: 0,
          naturalGasTJ: 0,
          naturalGaskgCO2: 0,
          naturalGaskgCH4: 0,
          naturalGaskgN2O: 0,
          naturalGaskgCO2eq: 0,
          kgCO2: 0,
          kgCH4: 0,
          kgN20: 0,
          kgCO2Eq: 0,
        },
      ],
      sums: this.loadSumsFromLocalStorage() || {
        petrol: {
          kgCO2: 0,
          kgCH4: 0,
          kgN2O: 0,
          kgCO2eq: 0,
        },
        diesel: {
          kgCO2: 0,
          kgCH4: 0,
          kgN2O: 0,
          kgCO2eq: 0,
        },
        total: {
          kgCO2: 0,
          kgCH4: 0,
          kgN2O: 0,
          kgCO2eq: 0,
        },
      },
    };
  },

  mounted() {
    this.createMobileChart();
  },

  methods: {
    createMobileChart() {
      if (this.charts.mobile) {
        this.charts.mobile.destroy();
      }

      const ctx = this.$refs.mobileChart;
      this.charts.mobile = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.tableData.map((row) => row.month),
          datasets: [
            {
              label: "Petrol CO2eq",
              data: this.tableData.map((row) => row.petrolkgCO2eq),
              backgroundColor: "rgba(255, 99, 132, 1)",
            },
            {
              label: "Diesel CO2eq",
              data: this.tableData.map((row) => row.dieselkgCO2eq),
              backgroundColor: "rgba(54, 162, 235, 1)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Monthly Mobile Emissions",
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
      const savedData = localStorage.getItem("mobileCombustionData");
      return savedData ? JSON.parse(savedData) : null;
    },

    loadSumsFromLocalStorage() {
      const savedSums = localStorage.getItem("mobileCombustionSums");
      return savedSums ? JSON.parse(savedSums) : null;
    },

    saveToLocalStorage() {
      localStorage.setItem(
        "mobileCombustionData",
        JSON.stringify(this.tableData)
      );
      localStorage.setItem("mobileCombustionSums", JSON.stringify(this.sums));
    },

    calculateFuelConsumption() {
      // Reset sums
      Object.keys(this.sums).forEach((key) => {
        Object.keys(this.sums[key]).forEach((subKey) => {
          this.sums[key][subKey] = 0;
        });
      });

      this.tableData.forEach((row) => {
        // Calculate Petrol
        row.petrolTJ = row.petrolLitres * 0.0000277;
        row.petrolkgCO2 = row.petrolTJ * 69300;
        row.petrolkgCH4 = row.petrolTJ * 25;
        row.petrolkgN2O = row.petrolTJ * 8;
        row.petrolkgCO2eq =
          row.petrolkgCO2 * 1 + row.petrolkgCH4 * 28 + row.petrolkgN2O * 265;

        // Update petrol sums
        this.sums.petrol.kgCO2 += row.petrolkgCO2;
        this.sums.petrol.kgCH4 += row.petrolkgCH4;
        this.sums.petrol.kgN2O += row.petrolkgN2O;
        this.sums.petrol.kgCO2eq += row.petrolkgCO2eq;

        // Calculate Diesel
        row.dieselTJ = row.dieselLitres * 0.000037;
        row.dieselkgCO2 = row.dieselTJ * 74100;
        row.dieselkgCH4 = row.dieselTJ * 3.9;
        row.dieselkgN2O = row.dieselTJ * 3.9;
        row.dieselkgCO2eq =
          row.dieselkgCO2 * 1 + row.dieselkgCH4 * 28 + row.dieselkgN2O * 265;

        // Update diesel sums
        this.sums.diesel.kgCO2 += row.dieselkgCO2;
        this.sums.diesel.kgCH4 += row.dieselkgCH4;
        this.sums.diesel.kgN2O += row.dieselkgN2O;
        this.sums.diesel.kgCO2eq += row.dieselkgCO2eq;

        // Calculate row totals
        row.kgCO2 = row.petrolkgCO2 + row.dieselkgCO2;
        row.kgCH4 = row.petrolkgCH4 + row.dieselkgCH4;
        row.kgN20 = row.petrolkgN2O + row.dieselkgN2O;
        row.kgCO2Eq = row.petrolkgCO2eq + row.dieselkgCO2eq;

        // Update total sums
        this.sums.total.kgCO2 += row.kgCO2;
        this.sums.total.kgCH4 += row.kgCH4;
        this.sums.total.kgN2O += row.kgN20;
        this.sums.total.kgCO2eq += row.kgCO2Eq;
      });

      // Save updated data to localStorage
      this.saveToLocalStorage();
    },

    handleUpdate() {
      this.createMobileChart();
    },
  },

  // Watch for changes in input values
  watch: {
    tableData: {
      handler(newVal) {
        this.calculateFuelConsumption();
      },
      deep: true,
    },
  },
};
</script>
