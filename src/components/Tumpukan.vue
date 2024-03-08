<template>
  <div>
    <div class="row">
      <div class="col-sm-1"></div>
      <div class="col-sm-10">
        <div class="row">
          <div class="col-sm-6">
            <div class="row">
                <label for="barang" class="form-label">Barang</label>
              <div class="col-sm-9">
                <select v-model="selectedBarang" class="form-select" aria-label="Default select example">
                  <option disabled value="">Pilih barang</option>
                  <option v-for="barang in listBarang" :key="barang.id" :value="barang.jenis_barang">{{ barang.jenis_barang }}</option>
                </select>
              </div>
              <div class="col-sm-3">
                <button @click="submitBarang" class="btn btn-primary ms-3"><i class="bi bi-plus"></i></button>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <label for="tumpukan" class="form-label">Tumpukan</label>
            <div class="row">
              <div class="col-sm-9">
                <input v-model="tumpukan" placeholder="Masukkan tumpukan" class="form-control"/>
              </div>
              <div class="col-sm-3">
                <button @click="submitTumpukan" class="btn btn-primary ms-3"><i class="bi bi-plus"></i></button>
              </div>
            </div>
          </div>
        </div>
        <h4 class="text-center mt-4">Data Barang</h4>
        <table class="bordered-table">
          <thead>
            <tr>
              <th>Barang</th>
              <th v-for="header in headers" :key="header" class="text-center">{{ header }}</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataBarang" :key="index">
              <td>{{ item.barang }}</td>
              <td v-for="header in headers" :key="header">
                <ul>
                  <li v-for="tumpukan in item.tumpukan[header]" :key="tumpukan" class="bordered-li">
                    {{ tumpukan }}
                  </li>
                </ul>
              </td>
              <td>{{ getTotalTumpukan(item) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-1"></div>
    </div>


  </div>
</template>

<style>
.bordered-table {
  border-collapse: collapse;
}

.bordered-table th,
.bordered-table td {
  border: 1px solid #ccc;
  padding: 5px;
}

.bordered-li {
  border-bottom: 1px solid #ccc;
  padding: 5px;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedBarang: "",
      tumpukan: "",
      listBarang: [],
      dataBarang: [],
      headers: [], // Menyimpan nama header
    };
  },
  created() {
    this.fetchBarang();
  },
  methods: {
    fetchBarang() {
      axios
        .get('http://localhost:8080/api/barang')
        .then(response => {
          this.listBarang = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    submitBarang() {
      if (this.selectedBarang) {
        this.dataBarang.push({ barang: this.selectedBarang, tumpukan: {} });
        this.selectedBarang = "";
      }
    },
    submitTumpukan() {
      if (this.tumpukan && this.dataBarang.length > 0) {
        const lastBarang = this.dataBarang[this.dataBarang.length - 1];
        const header = Object.keys(lastBarang.tumpukan).length + 1;
        if (header <= 10) {
          if (!this.headers.includes(header.toString())) {
            this.headers.push(header.toString());
          }
          if (!lastBarang.tumpukan[header.toString()]) {
            lastBarang.tumpukan[header.toString()] = [];
          }
          lastBarang.tumpukan[header.toString()].push(parseInt(this.tumpukan));
        }
        this.tumpukan = "";
      }
    },
    getTotalTumpukan(item) {
      let total = 0;
      for (const header in item.tumpukan) {
        for (const tumpukan of item.tumpukan[header]) {
          total += tumpukan;
        }
      }
      return total;
    },
  },
};
</script>
