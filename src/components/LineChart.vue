<template>
  <div id="chart">
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
      v-if="tampilkan"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import axios from "axios";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      tampilkan: false,
      series: [],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          labels: {
            formatter: (value) => Math.round(value), // Format nilai menjadi bilangan bulat
          },
        },
        plotOptions: {
          line: {
            markers: {
              size: 6,
            },
          },
        },
      },
    };
  },
  async created() {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/auth/statistik/",
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
    const data = response.data.data;

    if (data && data.length > 0) {
      const categories = data.map((item) => item.user.name); // Ambil nama pengguna dari data API
      const noteCounts = data.map((item) => item.note_count);

      this.chartOptions.xaxis.categories = categories; // Menggunakan array categories untuk sumbu x
      this.series = [{ name: "Jumlah TallySheet", data: noteCounts }];
      this.tampilkan = true;
    }
  } catch (error) {
    console.error(error);
  }
},

};
</script>
