<template>
  <!-- Button -->
  <button
    @click="calculateFuelConsumption()"
    id="calculateFuelConsumption"
    class="group relative inline-block focus:outline-none focus:ring"
  >
    <span
      class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
    ></span>

    <span
      class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
    >
      Calculate
    </span>
  </button>

  <div class="py-5">
    <h1 class="text-2xl font-bold my-4">Fuel Information</h1>

    <table class="min-w-full text-left text-sm">
      <thead class="bg-gray-100 text-xs uppercase">
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
      <tbody class="divide-y divide-gray-200">
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
            {{ Math.round(row.petrolTJ * 100) / 100 }}
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
            {{ Math.round(row.dieselTJ * 100) / 100 }}
          </td>
          <!-- LPG -->
          <td class="px-4 py-2">
            <input
              type="number"
              class="w-full border rounded-lg px-2 py-1 text-gray-700"
              v-model="row.lpgLitres"
            />
          </td>
          <td class="px-4 py-2">{{ Math.round(row.lpgTJ * 100) / 100 }}</td>
          <!-- Natural Gas -->
          <td class="px-4 py-2">
            <input
              type="number"
              class="w-full border rounded-lg px-2 py-1 text-gray-700"
              v-model="row.naturalGasMMBTU"
            />
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.naturalGasTJ * 100) / 100 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="py-5">
    <h1 class="text-2xl font-bold my-4">Petrol Fuel Emissions</h1>

    <table class="min-w-full text-left text-sm">
      <thead class="bg-gray-100 text-xs uppercase">
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
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(row, index) in tableData" :key="index">
          <td class="px-4 py-2">{{ row.month }}</td>
          <td class="px-4 py-2">{{ row.sites }}</td>
          <td class="px-4 py-2">{{ row.equipment }}</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(row.petrolkgCO2 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.petrolkgCH4 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.petrolkgN2O * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.petrolkgCO2eq * 100) / 100 }}
          </td>
        </tr>
        <tr>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2">SUM</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(sumPetrolkgco2 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sumPetrolkgCH4 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sumPetrolkgN2O * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sumPetrolkgCO2eq * 100) / 100 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="py-5">
    <h1 class="text-2xl font-bold my-4">Diesel Emissions</h1>

    <table class="min-w-full text-left text-sm">
      <thead class="bg-gray-100 text-xs uppercase">
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
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(row, index) in tableData" :key="index">
          <td class="px-4 py-2">{{ row.month }}</td>
          <td class="px-4 py-2">{{ row.sites }}</td>
          <td class="px-4 py-2">{{ row.equipment }}</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(row.dieselkgCO2 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.dieselkgCH4 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.dieselkgN2O * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.dieselkgCO2eq * 100) / 100 }}
          </td>
        </tr>
        <tr>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2">SUM</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(sumDieselkgco2 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sumDieselkgCH4 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sumDieselkgN2O * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sumDieselkgCO2eq * 100) / 100 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="py-5">
    <h1 class="text-2xl font-bold my-4">LPG Emissions</h1>

    <table class="min-w-full text-left text-sm">
      <thead class="bg-gray-100 text-xs uppercase">
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
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(row, index) in tableData" :key="index">
          <td class="px-4 py-2">{{ row.month }}</td>
          <td class="px-4 py-2">{{ row.sites }}</td>
          <td class="px-4 py-2">{{ row.equipment }}</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(row.lpgkgCO2 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.lpgkgCH4 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.lpgkgN2O * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.lpgkgCO2eq * 100) / 100 }}
          </td>
        </tr>
        <tr>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2">SUM</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(sumLPGkgco2 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sumLPGkgCH4 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sumLPGkgN2O * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sumLPGkgCO2eq * 100) / 100 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="py-5">
    <h1 class="text-2xl font-bold my-4">Natural Gas Emissions</h1>

    <table class="min-w-full text-left text-sm">
      <thead class="bg-gray-100 text-xs uppercase">
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
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(row, index) in tableData" :key="index">
          <td class="px-4 py-2">{{ row.month }}</td>
          <td class="px-4 py-2">{{ row.sites }}</td>
          <td class="px-4 py-2">{{ row.equipment }}</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(row.naturalGaskgCO2 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.naturalGaskgCH4 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.naturalGaskgN2O * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.naturalGaskgCO2eq * 100) / 100 }}
          </td>
        </tr>
        <tr>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2">SUM</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(sumNGkgco2 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sumNGkgCH4 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sumNGkgN2O * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sumNGkgCO2eq * 100) / 100 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="py-5">
    <h1 class="text-2xl font-bold my-4">Total Emissions</h1>

    <table class="min-w-full text-left text-sm">
      <thead class="bg-gray-100 text-xs uppercase">
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
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(row, index) in tableData" :key="index">
          <td class="px-4 py-2">{{ row.month }}</td>
          <td class="px-4 py-2">{{ row.sites }}</td>
          <td class="px-4 py-2">{{ row.equipment }}</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(row.kgCO2 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.kgCH4 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.kgN20 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.kgCO2Eq * 100) / 100 }}
          </td>
        </tr>
        <tr>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2">SUM</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(sumKgCO2 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sumKgCH4 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sumKgN20 * 100) / 100 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(sumKgC02Eq * 100) / 100 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "StationaryCombustion",
  data() {
    return {
      tableData: [
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
      sumPetrolkgco2: 0,
      sumPetrolkgCH4: 0,
      sumPetrolkgN2O: 0,
      sumPetrolkgCO2eq: 0,
      sumDieselkgco2: 0,
      sumDieselkgCH4: 0,
      sumDieselkgN2O: 0,
      sumDieselkgCO2eq: 0,
      sumLPGkgco2: 0,
      sumLPGkgCH4: 0,
      sumLPGkgN2O: 0,
      sumLPGkgCO2eq: 0,
      sumNGkgco2: 0,
      sumNGkgCH4: 0,
      sumNGkgN2O: 0,
      sumNGkgCO2eq: 0,
      sumKgCO2: 0,
      sumKgCH4: 0,
      sumKgN20: 0,
      sumKgC02Eq: 0,
    };
  },
  methods: {
    calculateFuelConsumption() {
      for (let i = 0; i < this.tableData.length; i++) {
        // PETROL DATA
        this.tableData[i].petrolTJ = this.tableData[i].petrolLitres * 0.0000277;
        this.tableData[i].petrolkgCO2 = this.tableData[i].petrolTJ * 69300;
        this.tableData[i].petrolkgCH4 = this.tableData[i].petrolTJ * 3;
        this.tableData[i].petrolkgN2O = this.tableData[i].petrolTJ * 0.6;
        this.tableData[i].petrolkgCO2eq =
          this.tableData[i].petrolkgCO2 * 1 +
          this.tableData[i].petrolkgCH4 * 28 +
          this.tableData[i].petrolkgN2O * 265;
        this.sumPetrolkgco2 =
          this.sumPetrolkgco2 + this.tableData[i].petrolkgCO2;
        this.sumPetrolkgCH4 =
          this.sumPetrolkgCH4 + this.tableData[i].petrolkgCH4;
        this.sumPetrolkgN2O =
          this.sumPetrolkgN2O + this.tableData[i].petrolkgN2O;
        this.sumPetrolkgCO2eq =
          this.sumPetrolkgCO2eq + this.tableData[i].petrolkgCO2eq;

        // Diesel Data
        this.tableData[i].dieselTJ = this.tableData[i].dieselLitres * 0.000037;
        this.tableData[i].dieselkgCO2 = this.tableData[i].dieselTJ * 74100;
        this.tableData[i].dieselkgCH4 = this.tableData[i].dieselTJ * 3;
        this.tableData[i].dieselkgN2O = this.tableData[i].dieselTJ * 0.6;
        this.tableData[i].dieselkgCO2eq =
          this.tableData[i].dieselkgCO2 * 1 +
          this.tableData[i].dieselkgCH4 * 28 +
          this.tableData[i].dieselkgN2O * 265;
        this.sumDieselkgco2 =
          this.sumDieselkgco2 + this.tableData[i].dieselkgCO2;
        this.sumDieselkgCH4 =
          this.sumDieselkgCH4 + this.tableData[i].dieselkgCH4;
        this.sumDieselkgN2O =
          this.sumDieselkgN2O + this.tableData[i].dieselkgN2O;
        this.sumDieselkgCO2eq =
          this.sumDieselkgCO2eq + this.tableData[i].dieselkgCO2eq;

        // LPG Data
        this.tableData[i].lpgTJ = this.tableData[i].lpgLitres * 0.0000246;
        this.tableData[i].lpgkgCO2 = this.tableData[i].lpgTJ * 63100;
        this.tableData[i].lpgkgCH4 = this.tableData[i].lpgTJ * 1;
        this.tableData[i].lpgkgN2O = this.tableData[i].lpgTJ * 0.1;
        this.tableData[i].lpgkgCO2eq =
          this.tableData[i].lpgkgCO2 * 1 +
          this.tableData[i].lpgkgCH4 * 28 +
          this.tableData[i].lpgkgN2O * 265;
        this.sumLPGkgco2 = this.sumLPGkgco2 + this.tableData[i].lpgkgCO2;
        this.sumLPGkgCH4 = this.sumLPGkgCH4 + this.tableData[i].lpgkgCH4;
        this.sumLPGkgN2O = this.sumLPGkgN2O + this.tableData[i].lpgkgN2O;
        this.sumLPGkgCO2eq = this.sumLPGkgCO2eq + this.tableData[i].lpgkgCO2eq;

        // Natural Gas Data
        this.tableData[i].naturalGasTJ =
          this.tableData[i].naturalGasMMBTU * 0.0010552;
        this.tableData[i].naturalGaskgCO2 =
          this.tableData[i].naturalGasTJ * 56100;
        this.tableData[i].naturalGaskgCH4 = this.tableData[i].naturalGasTJ * 1;
        this.tableData[i].naturalGaskgN2O =
          this.tableData[i].naturalGasTJ * 0.1;
        this.tableData[i].naturalGaskgCO2eq =
          this.tableData[i].naturalGaskgCO2 * 1 +
          this.tableData[i].naturalGaskgCH4 * 28 +
          this.tableData[i].naturalGaskgN2O * 265;
        this.sumNGkgN2O = this.sumNGkgN2O + this.tableData[i].naturalGaskgCO2;
        this.sumNGkgCH4 = this.sumNGkgCH4 + this.tableData[i].naturalGaskgCH4;
        this.sumNGkgN2O = this.sumNGkgN2O + this.tableData[i].naturalGaskgN2O;
        this.sumNGkgCO2eq =
          this.sumNGkgCO2eq + this.tableData[i].naturalGaskgCO2eq;

        this.tableData[i].kgCO2 =
          this.tableData[i].petrolkgCO2 +
          this.tableData[i].dieselkgCO2 +
          this.tableData[i].lpgkgCO2 +
          this.tableData[i].naturalGaskgCO2;

        this.tableData[i].kgCH4 =
          this.tableData[i].petrolkgCH4 +
          this.tableData[i].dieselkgCH4 +
          this.tableData[i].lpgkgCH4 +
          this.tableData[i].naturalGaskgCH4;

        this.tableData[i].kgN20 =
          this.tableData[i].petrolkgN2O +
          this.tableData[i].dieselkgN2O +
          this.tableData[i].lpgkgN2O +
          this.tableData[i].naturalGaskgN2O;

        this.tableData[i].kgCO2Eq =
          this.tableData[i].petrolkgCO2eq +
          this.tableData[i].dieselkgCO2eq +
          this.tableData[i].lpgkgCO2eq +
          this.tableData[i].naturalGaskgCO2eq;

        this.sumKgCO2 = this.sumKgCO2 + this.tableData[i].kgCO2;
        this.sumKgCH4 = this.sumDieselkgCH4 + this.tableData[i].kgCH4;
        this.sumKgN20 = this.sumKgN20 + this.tableData[i].kgN20;
        this.sumKgC02Eq = this.sumKgC02Eq + this.tableData[i].kgCO2Eq;
      }
    },
  },
};
</script>
