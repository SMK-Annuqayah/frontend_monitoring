<template>
  <div id="app">
    <apexchart
      type="pie"
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
  el: '#app',
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      tampilkan: false,
      series: [],
      chartOptions: {
        chart: {
          width: 380,
          type: 'pie',
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    };
  },
  created() {
    axios
      .get("http://localhost:8000/api/auth/statistik-lokasi/", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        const apiData = response.data.data;
        const categories = apiData.map((item) => item.location);
        const dataForChart = apiData.map((item) => item.total);

        this.chartOptions.labels = categories; // Menggunakan lokasi sebagai label
        this.series = dataForChart;

        this.tampilkan = true;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};
</script>
