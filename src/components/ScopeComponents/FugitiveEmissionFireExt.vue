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
    <h1 class="text-2xl font-bold my-4">Capacity Information</h1>

    <table class="min-w-full text-left text-sm">
      <thead class="bg-gray-100 text-xs uppercase">
        <tr>
          <th class="px-4 py-2">Month</th>
          <th class="px-4 py-2">Sites</th>
          <th class="px-4 py-2">Type of Equipment</th>
          <!-- Fixed CO2 -->
          <th class="px-4 py-2">Fixed CO2 Capacity(kg)</th>
          <th class="px-4 py-2">Fixed CO2 Num. of Unity</th>
          <!-- Fixed HFC-227ea	 -->
          <th class="px-4 py-2">Fixed HFC-227ea Capacity(kg)</th>
          <th class="px-4 py-2">Fixed HFC-227ea Num. of Unity</th>
          <!-- Portable CO2 -->
          <th class="px-4 py-2">Portable CO2 Capacity(kg)</th>
          <th class="px-4 py-2">Portable CO2 Num. of Unity</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(row, index) in tableData" :key="index">
          <td class="px-4 py-2">{{ row.month }}</td>
          <td class="px-4 py-2">{{ row.sites }}</td>
          <td class="px-4 py-2">{{ row.equipment }}</td>
          <!-- Fixed CO2 -->
          <td class="px-4 py-2">
            <input
              type="number"
              class="w-full border rounded-lg px-2 py-1 text-gray-700"
              v-model="row.capacityFixedCO2"
            />
          </td>
          <td class="px-4 py-2">
            <input
              type="number"
              class="w-full border rounded-lg px-2 py-1 text-gray-700"
              v-model="row.unitFixedCO2"
            />
          </td>

          <!-- Fixed HFC-227ea	 -->
          <td class="px-4 py-2">
            <input
              type="number"
              class="w-full border rounded-lg px-2 py-1 text-gray-700"
              v-model="row.capacityHFC"
            />
          </td>
          <td class="px-4 py-2">
            <input
              type="number"
              class="w-full border rounded-lg px-2 py-1 text-gray-700"
              v-model="row.unitHFC"
            />
          </td>

          <!-- Portable CO2	 -->
          <td class="px-4 py-2">
            <input
              type="number"
              class="w-full border rounded-lg px-2 py-1 text-gray-700"
              v-model="row.capacityPortableCO2"
            />
          </td>
          <td class="px-4 py-2">
            <input
              type="number"
              class="w-full border rounded-lg px-2 py-1 text-gray-700"
              v-model="row.unitPortableCO2"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="py-5">
    <h1 class="text-2xl font-bold my-4">Total Capacity</h1>

    <table class="min-w-full text-left text-sm">
      <thead class="bg-gray-100 text-xs uppercase">
        <tr>
          <th class="px-4 py-2">Month</th>
          <th class="px-4 py-2">Sites</th>
          <th class="px-4 py-2">Type of Equipment</th>

          <th class="px-4 py-2">Fixed CO2 Total Capacity(kg)</th>
          <th class="px-4 py-2">Fixed HFC-227ea Total Capacity(kg)</th>
          <th class="px-4 py-2">Portable CO2 Total Capacity(kg)</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(row, index) in tableData" :key="index">
          <td class="px-4 py-2">{{ row.month }}</td>
          <td class="px-4 py-2">{{ row.sites }}</td>
          <td class="px-4 py-2">{{ row.equipment }}</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            <!-- {{ Math.round(row.petrolTJ * 1000) / 1000 }} -->
            {{ row.totalCapacityFixedCO2 }}
          </td>
          <td class="px-4 py-2">
            <!-- {{ Math.round(row.petrolTJ * 1000) / 1000 }} -->
            {{ row.totalHFC }}
          </td>
          <td class="px-4 py-2">
            <!-- {{ Math.round(row.petrolTJ * 1000) / 1000 }} -->
            {{ row.totalCapacityPortableCO2 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="py-5">
    <h1 class="text-2xl font-bold my-4">Emissions Produced</h1>

    <table class="min-w-full text-left text-sm">
      <thead class="bg-gray-100 text-xs uppercase">
        <tr>
          <th class="px-4 py-2">Month</th>
          <th class="px-4 py-2">Sites</th>
          <th class="px-4 py-2">Type of Equipment</th>
          <!-- Petrol -->
          <th class="px-4 py-2">Fixed CO2</th>
          <th class="px-4 py-2">Fixed HFC-227ea</th>
          <th class="px-4 py-2">Portable CO2</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(row, index) in tableData" :key="index">
          <td class="px-4 py-2">{{ row.month }}</td>
          <td class="px-4 py-2">{{ row.sites }}</td>
          <td class="px-4 py-2">{{ row.equipment }}</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(row.emissionsFixedCO2 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.emissionsHFC * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.emissionsPortableCO2 * 1000) / 1000 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="py-5">
    <h1 class="text-2xl font-bold my-4">Total Emissions kgCO2eq</h1>

    <table class="min-w-full text-left text-sm">
      <thead class="bg-gray-100 text-xs uppercase">
        <tr>
          <!-- kgCO2eq -->
          <th class="px-4 py-2">Fixed</th>
          <th class="px-4 py-2">Portable</th>
          <th class="px-4 py-2">Total</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(row, index) in tableData" :key="index">
          <!-- kgCO2eq -->
          <td class="px-4 py-2">
            {{ Math.round(row.totalEmissionFixed * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.emissionsPortableCO2 * 1000) / 1000 }}
          </td>
          <td class="px-4 py-2">
            {{ Math.round(row.totalEmission * 1000) / 1000 }}
          </td>
        </tr>
        <tr>
          <td class="px-4 py-2"></td>
          <td class="px-4 py-2">SUM</td>
          <!-- Petrol -->
          <td class="px-4 py-2">
            {{ Math.round(sumTotalEmission * 1000) / 1000 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "FugitiveEmissionFireExt",
  data() {
    return {
      tableData: [
        {
          month: "Jan",
          sites: "HQ",
          equipment: "Fire Extinguisher",
          capacityFixedCO2: 0,
          unitFixedCO2: 0,
          totalCapacityFixedCO2: 0,
          capacityHFC: 0,
          unitHFC: 0,
          totalHFC: 0,
          capacityPortableCO2: 0,
          unitPortableCO2: 0,
          totalCapacityPortableCO2: 0,
          emissionsFixedCO2: 0,
          emissionsHFC: 0,
          emissionsPortableCO2: 0,
          totalEmissionFixed: 0,
          totalEmission: 0,
        },
        {
          month: "Feb",
          sites: "HQ",
          equipment: "Fire Extinguisher",
          capacityFixedCO2: 0,
          unitFixedCO2: 0,
          totalCapacityFixedCO2: 0,
          capacityHFC: 0,
          unitHFC: 0,
          totalHFC: 0,
          capacityPortableCO2: 0,
          unitPortableCO2: 0,
          totalCapacityPortableCO2: 0,
          emissionsFixedCO2: 0,
          emissionsHFC: 0,
          emissionsPortableCO2: 0,
          totalEmissionFixed: 0,
          totalEmission: 0,
        },
        {
          month: "Mar",
          sites: "HQ",
          equipment: "Fire Extinguisher",
          capacityFixedCO2: 0,
          unitFixedCO2: 0,
          totalCapacityFixedCO2: 0,
          capacityHFC: 0,
          unitHFC: 0,
          totalHFC: 0,
          capacityPortableCO2: 0,
          unitPortableCO2: 0,
          totalCapacityPortableCO2: 0,
          emissionsFixedCO2: 0,
          emissionsHFC: 0,
          emissionsPortableCO2: 0,
          totalEmissionFixed: 0,
          totalEmission: 0,
        },
        {
          month: "Apr",
          sites: "HQ",
          equipment: "Fire Extinguisher",
          capacityFixedCO2: 0,
          unitFixedCO2: 0,
          totalCapacityFixedCO2: 0,
          capacityHFC: 0,
          unitHFC: 0,
          totalHFC: 0,
          capacityPortableCO2: 0,
          unitPortableCO2: 0,
          totalCapacityPortableCO2: 0,
          emissionsFixedCO2: 0,
          emissionsHFC: 0,
          emissionsPortableCO2: 0,
          totalEmissionFixed: 0,
          totalEmission: 0,
        },
        {
          month: "May",
          sites: "HQ",
          equipment: "Fire Extinguisher",
          capacityFixedCO2: 0,
          unitFixedCO2: 0,
          totalCapacityFixedCO2: 0,
          capacityHFC: 0,
          unitHFC: 0,
          totalHFC: 0,
          capacityPortableCO2: 0,
          unitPortableCO2: 0,
          totalCapacityPortableCO2: 0,
          emissionsFixedCO2: 0,
          emissionsHFC: 0,
          emissionsPortableCO2: 0,
          totalEmissionFixed: 0,
          totalEmission: 0,
        },
        {
          month: "June",
          sites: "HQ",
          equipment: "Fire Extinguisher",
          capacityFixedCO2: 0,
          unitFixedCO2: 0,
          totalCapacityFixedCO2: 0,
          capacityHFC: 0,
          unitHFC: 0,
          totalHFC: 0,
          capacityPortableCO2: 0,
          unitPortableCO2: 0,
          totalCapacityPortableCO2: 0,
          emissionsFixedCO2: 0,
          emissionsHFC: 0,
          emissionsPortableCO2: 0,
          totalEmissionFixed: 0,
          totalEmission: 0,
        },
        {
          month: "July",
          sites: "HQ",
          equipment: "Fire Extinguisher",
          capacityFixedCO2: 0,
          unitFixedCO2: 0,
          totalCapacityFixedCO2: 0,
          capacityHFC: 0,
          unitHFC: 0,
          totalHFC: 0,
          capacityPortableCO2: 0,
          unitPortableCO2: 0,
          totalCapacityPortableCO2: 0,
          emissionsFixedCO2: 0,
          emissionsHFC: 0,
          emissionsPortableCO2: 0,
          totalEmissionFixed: 0,
          totalEmission: 0,
        },
        {
          month: "Aug",
          sites: "HQ",
          equipment: "Fire Extinguisher",
          capacityFixedCO2: 0,
          unitFixedCO2: 0,
          totalCapacityFixedCO2: 0,
          capacityHFC: 0,
          unitHFC: 0,
          totalHFC: 0,
          capacityPortableCO2: 0,
          unitPortableCO2: 0,
          totalCapacityPortableCO2: 0,
          emissionsFixedCO2: 0,
          emissionsHFC: 0,
          emissionsPortableCO2: 0,
          totalEmissionFixed: 0,
          totalEmission: 0,
        },
        {
          month: "Sep",
          sites: "HQ",
          equipment: "Fire Extinguisher",
          capacityFixedCO2: 0,
          unitFixedCO2: 0,
          totalCapacityFixedCO2: 0,
          capacityHFC: 0,
          unitHFC: 0,
          totalHFC: 0,
          capacityPortableCO2: 0,
          unitPortableCO2: 0,
          totalCapacityPortableCO2: 0,
          emissionsFixedCO2: 0,
          emissionsHFC: 0,
          emissionsPortableCO2: 0,
          totalEmissionFixed: 0,
          totalEmission: 0,
        },
        {
          month: "Oct",
          sites: "HQ",
          equipment: "Fire Extinguisher",
          capacityFixedCO2: 0,
          unitFixedCO2: 0,
          totalCapacityFixedCO2: 0,
          capacityHFC: 0,
          unitHFC: 0,
          totalHFC: 0,
          capacityPortableCO2: 0,
          unitPortableCO2: 0,
          totalCapacityPortableCO2: 0,
          emissionsFixedCO2: 0,
          emissionsHFC: 0,
          emissionsPortableCO2: 0,
          totalEmissionFixed: 0,
          totalEmission: 0,
        },
        {
          month: "Nov",
          sites: "HQ",
          equipment: "Fire Extinguisher",
          capacityFixedCO2: 0,
          unitFixedCO2: 0,
          totalCapacityFixedCO2: 0,
          capacityHFC: 0,
          unitHFC: 0,
          totalHFC: 0,
          capacityPortableCO2: 0,
          unitPortableCO2: 0,
          totalCapacityPortableCO2: 0,
          emissionsFixedCO2: 0,
          emissionsHFC: 0,
          emissionsPortableCO2: 0,
          totalEmissionFixed: 0,
          totalEmission: 0,
        },
        {
          month: "Dec",
          sites: "HQ",
          equipment: "Fire Extinguisher",
          capacityFixedCO2: 0,
          unitFixedCO2: 0,
          totalCapacityFixedCO2: 0,
          capacityHFC: 0,
          unitHFC: 0,
          totalHFC: 0,
          capacityPortableCO2: 0,
          unitPortableCO2: 0,
          totalCapacityPortableCO2: 0,
          emissionsFixedCO2: 0,
          emissionsHFC: 0,
          emissionsPortableCO2: 0,
          totalEmissionFixed: 0,
          totalEmission: 0,
        },
      ],
      sumTotalEmission: 0,
    };
  },
  methods: {
    calculateFuelConsumption() {
      for (let i = 0; i < this.tableData.length; i++) {
        // Fixed CO2
        this.tableData[i].totalCapacityFixedCO2 =
          this.tableData[i].capacityFixedCO2 * this.tableData[i].unitFixedCO2;
        this.tableData[i].emissionsFixedCO2 =
          this.tableData[i].totalCapacityFixedCO2 * 1 * (2.5 / 100);

        // Fixed HFC-227ea
        this.tableData[i].totalHFC =
          this.tableData[i].capacityHFC * this.tableData[i].unitHFC;
        this.tableData[i].emissionsHFC =
          this.tableData[i].totalHFC * 3350 * (2.5 / 100);

        // Portable CO2
        this.tableData[i].totalCapacityPortableCO2 =
          this.tableData[i].capacityPortableCO2 *
          this.tableData[i].unitPortableCO2;
        this.tableData[i].emissionsPortableCO2 =
          this.tableData[i].totalCapacityPortableCO2 * 1 * (3.5 / 100);

        //  Total
        this.tableData[i].totalEmissionFixed =
          this.tableData[i].emissionsHFC + this.tableData[i].emissionsFixedCO2;
        this.tableData[i].totalEmission =
          this.tableData[i].totalEmissionFixed +
          this.tableData[i].emissionsPortableCO2;

        this.sumTotalEmission =
          this.sumTotalEmission + this.tableData[i].totalEmission;
      }
    },
  },
};
</script>
