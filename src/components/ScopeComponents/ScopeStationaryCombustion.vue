<template>
  <div class="py-5">
    <!-- Stationary Combustion Charts -->
    <div class="bg-white p-4 rounded-lg shadow">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Stationary Combustion Emissions</h2>
        <button
          @click="handleUpdate"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Graph
        </button>
      </div>
      <div style="height: 400px">
        <canvas ref="stationaryChart"></canvas>
      </div>
    </div>

    <h1 class="text-2xl font-bold my-4">Fuel Information</h1>
    <table class="min-w-full text-left text-sm">
      <thead class="text-xs uppercase bg-slate-500 text-slate-50">
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
          <!-- LPG -->
          <th class="px-4 py-2">LPG (litres)</th>
          <th class="px-4 py-2">LPG (TJ)</th>
          <!-- Natural Gas -->
          <th class="px-4 py-2">Natural Gas (mmbtu)</th>
          <th class="px-4 py-2">Natural Gas (TJ)</th>
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
          <!-- LPG -->
          <td class="px-4 py-2">
            <input
              type="number"
              class="w-full border rounded-lg px-2 py-1 text-gray-700"
              v-model="row.lpgLitres"
            />
          </td>
          <td class="px-4 py-2">{{ Math.round(row.lpgTJ * 1000) / 1000 }}</td>
          <!-- Natural Gas -->
          <td class="px-4 py-2">
            <input
              type="number"
              class="w-full border rounded-lg px-2 py-1 text-gray-700"
              v-model="row.naturalGasMMBTU"
            />
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.naturalGasTJ * 1000) / 1000 }}
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
    <h1 class="text-2xl font-bold my-4">LPG Emissions</h1>

    <table class="min-w-full text-left text-sm">
      <thead class="bg-slate-500 text-slate-50 text-xs uppercase">
        <tr>
          <th class="px-4 py-2">Month</th>
          <th class="px-4 py-2">Sites</th>
          <th class="px-4 py-2">Type of Equipment</th>
          <!-- Petrol -->
          <th class="px-4 py-2">LPG (kgCO2)</th>
          <th class="px-4 py-2">LPG (kgCH4)</th>
          <th class="px-4 py-2">LPG (kgN2O)</th>
          <th class="px-4 py-2">LPG (kgCO2eq)</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 text-white">
        <tr v-for="(row, index) in tableData" :key="index">
          <td class="px-4 py-2">{{ row.month }}</td>
          <td class="px-4 py-2">{{ row.sites }}</td>
          <td class="px-4 py-2">{{ row.equipment }}</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(row.lpgkgCO2 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.lpgkgCH4 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.lpgkgN2O * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.lpgkgCO2eq * 1000) / 1000 }}
          </td>
        </tr>
        <tr>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2">SUM</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(sums.lpg.kgCO2 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sums.lpg.kgCH4 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sums.lpg.kgN2O * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sums.lpg.kgCO2eq * 1000) / 1000 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="py-5">
    <h1 class="text-2xl font-bold my-4">Natural Gas Emissions</h1>

    <table class="min-w-full text-left text-sm">
      <thead class="bg-slate-500 text-slate-50 text-xs uppercase">
        <tr>
          <th class="px-4 py-2">Month</th>
          <th class="px-4 py-2">Sites</th>
          <th class="px-4 py-2">Type of Equipment</th>
          <!-- Petrol -->
          <th class="px-4 py-2">Natural Gas (kgCO2)</th>
          <th class="px-4 py-2">Natural Gas (kgCH4)</th>
          <th class="px-4 py-2">Natural Gas (kgN2O)</th>
          <th class="px-4 py-2">Natural Gas (kgCO2eq)</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 text-white">
        <tr v-for="(row, index) in tableData" :key="index">
          <td class="px-4 py-2">{{ row.month }}</td>
          <td class="px-4 py-2">{{ row.sites }}</td>
          <td class="px-4 py-2">{{ row.equipment }}</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(row.naturalGaskgCO2 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.naturalGaskgCH4 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.naturalGaskgN2O * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.naturalGaskgCO2eq * 1000) / 1000 }}
          </td>
        </tr>
        <tr>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2">SUM</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(sums.naturalGas.kgCO2 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sums.naturalGas.kgCH4 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sums.naturalGas.kgN2O * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sums.naturalGas.kgCO2eq * 1000) / 1000 }}
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
  name: "StationaryCombustion",
  data() {
    return {
      charts: {},
      tableData: this.loadFromLocalStorage() || [
        {
          month: "Jan",
          sites: "HQ",
          equipment: "Generators",
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
          equipment: "Generators",
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
          equipment: "Generators",
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
          equipment: "Generators",
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
          equipment: "Generators",
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
          equipment: "Generators",
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
          equipment: "Generators",
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
          equipment: "Generators",
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
          equipment: "Generators",
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
          equipment: "Generators",
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
          equipment: "Generators",
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
          equipment: "Generators",
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
        lpg: {
          kgCO2: 0,
          kgCH4: 0,
          kgN2O: 0,
          kgCO2eq: 0,
        },
        naturalGas: {
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
    this.createStationaryChart();
  },

  methods: {
    loadFromLocalStorage() {
      const savedData = localStorage.getItem("stationaryCombustionData");
      return savedData ? JSON.parse(savedData) : null;
    },

    loadSumsFromLocalStorage() {
      const savedSums = localStorage.getItem("stationaryCombustionSums");
      return savedSums ? JSON.parse(savedSums) : null;
    },

    createStationaryChart() {
      if (this.charts.stationary) {
        this.charts.stationary.destroy();
      }

      const ctx = this.$refs.stationaryChart;
      this.charts.stationary = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.tableData.map((row) => row.month),
          datasets: [
            {
              label: "Petrol CO2eq",
              data: this.tableData.map((row) => row.petrolkgCO2eq),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              fill: true,
            },
            {
              label: "Diesel CO2eq",
              data: this.tableData.map((row) => row.dieselkgCO2eq),
              borderColor: "rgb(54, 162, 235)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: true,
            },
            {
              label: "LPG CO2eq",
              data: this.tableData.map((row) => row.lpgkgCO2eq),
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
            {
              label: "Natural Gas CO2eq",
              data: this.tableData.map((row) => row.naturalGaskgCO2eq),
              borderColor: "rgb(153, 102, 255)",
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 750,
          },
          plugins: {
            title: {
              display: true,
              text: "Monthly Emissions by Fuel Type",
            },
            legend: {
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },

    saveToLocalStorage() {
      localStorage.setItem(
        "stationaryCombustionData",
        JSON.stringify(this.tableData)
      );
      localStorage.setItem(
        "stationaryCombustionSums",
        JSON.stringify(this.sums)
      );
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
        row.petrolkgCH4 = row.petrolTJ * 3;
        row.petrolkgN2O = row.petrolTJ * 0.6;
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
        row.dieselkgCH4 = row.dieselTJ * 3;
        row.dieselkgN2O = row.dieselTJ * 0.6;
        row.dieselkgCO2eq =
          row.dieselkgCO2 * 1 + row.dieselkgCH4 * 28 + row.dieselkgN2O * 265;

        // Update diesel sums
        this.sums.diesel.kgCO2 += row.dieselkgCO2;
        this.sums.diesel.kgCH4 += row.dieselkgCH4;
        this.sums.diesel.kgN2O += row.dieselkgN2O;
        this.sums.diesel.kgCO2eq += row.dieselkgCO2eq;

        // Calculate LPG
        row.lpgTJ = row.lpgLitres * 0.0000246;
        row.lpgkgCO2 = row.lpgTJ * 63100;
        row.lpgkgCH4 = row.lpgTJ * 1;
        row.lpgkgN2O = row.lpgTJ * 0.1;
        row.lpgkgCO2eq =
          row.lpgkgCO2 * 1 + row.lpgkgCH4 * 28 + row.lpgkgN2O * 265;

        // Update LPG sums
        this.sums.lpg.kgCO2 += row.lpgkgCO2;
        this.sums.lpg.kgCH4 += row.lpgkgCH4;
        this.sums.lpg.kgN2O += row.lpgkgN2O;
        this.sums.lpg.kgCO2eq += row.lpgkgCO2eq;

        // Calculate Natural Gas
        row.naturalGasTJ = row.naturalGasMMBTU * 0.0010552;
        row.naturalGaskgCO2 = row.naturalGasTJ * 56100;
        row.naturalGaskgCH4 = row.naturalGasTJ * 1;
        row.naturalGaskgN2O = row.naturalGasTJ * 0.1;
        row.naturalGaskgCO2eq =
          row.naturalGaskgCO2 * 1 +
          row.naturalGaskgCH4 * 28 +
          row.naturalGaskgN2O * 265;

        // Update Natural Gas sums
        this.sums.naturalGas.kgCO2 += row.naturalGaskgCO2;
        this.sums.naturalGas.kgCH4 += row.naturalGaskgCH4;
        this.sums.naturalGas.kgN2O += row.naturalGaskgN2O;
        this.sums.naturalGas.kgCO2eq += row.naturalGaskgCO2eq;

        // Calculate row totals
        row.kgCO2 =
          row.petrolkgCO2 +
          row.dieselkgCO2 +
          row.lpgkgCO2 +
          row.naturalGaskgCO2;
        row.kgCH4 =
          row.petrolkgCH4 +
          row.dieselkgCH4 +
          row.lpgkgCH4 +
          row.naturalGaskgCH4;
        row.kgN20 =
          row.petrolkgN2O +
          row.dieselkgN2O +
          row.lpgkgN2O +
          row.naturalGaskgN2O;
        row.kgCO2Eq =
          row.petrolkgCO2eq +
          row.dieselkgCO2eq +
          row.lpgkgCO2eq +
          row.naturalGaskgCO2eq;

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
      this.calculateFuelConsumption();
      this.createStationaryChart();
    },
  },
};
</script>
