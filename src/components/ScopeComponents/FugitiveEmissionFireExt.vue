<template>
  <!-- Button -->
  <!-- <button
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
  </button> -->

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
          <th class="px-4 py-2">Fixed CO2 Num. of unit</th>
          <!-- Fixed HFC-227ea	 -->
          <th class="px-4 py-2">Fixed HFC-227ea Capacity(kg)</th>
          <th class="px-4 py-2">Fixed HFC-227ea Num. of unit</th>
          <!-- Portable CO2 -->
          <th class="px-4 py-2">Portable CO2 Capacity(kg)</th>
          <th class="px-4 py-2">Portable CO2 Num. of unit</th>
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
            {{ Math.round(sums.total.emissions * 1000) / 1000 }}
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
      tableData: this.loadFromLocalStorage() || [
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
      sums: this.loadSumsFromLocalStorage() || {
        fixed: {
          CO2: 0,
          HFC: 0,
          total: 0,
        },
        portable: {
          CO2: 0,
        },
        total: {
          emissions: 0,
        },
      },
    };
  },

  methods: {
    loadFromLocalStorage() {
      const savedData = localStorage.getItem("fugitiveEmissionsData");
      return savedData ? JSON.parse(savedData) : null;
    },

    loadSumsFromLocalStorage() {
      const savedSums = localStorage.getItem("fugitiveEmissionsSums");
      return savedSums ? JSON.parse(savedSums) : null;
    },

    saveToLocalStorage() {
      localStorage.setItem(
        "fugitiveEmissionsData",
        JSON.stringify(this.tableData)
      );
      localStorage.setItem("fugitiveEmissionsSums", JSON.stringify(this.sums));
    },

    calculateFuelConsumption() {
      // Reset sums
      Object.keys(this.sums).forEach((key) => {
        Object.keys(this.sums[key]).forEach((subKey) => {
          this.sums[key][subKey] = 0;
        });
      });

      this.tableData.forEach((row) => {
        // Fixed CO2
        row.totalCapacityFixedCO2 = row.capacityFixedCO2 * row.unitFixedCO2;
        row.emissionsFixedCO2 = row.totalCapacityFixedCO2 * 1;
        this.sums.fixed.CO2 += row.emissionsFixedCO2;

        // Fixed HFC-227ea
        row.totalHFC = row.capacityHFC * row.unitHFC;
        row.emissionsHFC = row.totalHFC * 3350;
        this.sums.fixed.HFC += row.emissionsHFC;

        // Portable CO2
        row.totalCapacityPortableCO2 =
          row.capacityPortableCO2 * row.unitPortableCO2;
        row.emissionsPortableCO2 = row.totalCapacityPortableCO2 * 1;
        this.sums.portable.CO2 += row.emissionsPortableCO2;

        // Total
        row.totalEmissionFixed = row.emissionsHFC + row.emissionsFixedCO2;
        this.sums.fixed.total += row.totalEmissionFixed;

        row.totalEmission = row.totalEmissionFixed + row.emissionsPortableCO2;
        this.sums.total.emissions += row.totalEmission;
      });

      // Save updated data to localStorage
      this.saveToLocalStorage();
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
