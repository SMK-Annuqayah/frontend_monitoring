<template>
<div class="preloader" v-if="reload"></div>
  <!-- Nav Item - User Information -->
  <div class="nav-item dropdown no-arrow">
    <a
      class="btn blueButton me-2 dropdown-toggle"
      href="#"
      id="userDropdown"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <i class="bi bi-plus"></i>
    </a>
    <!-- Dropdown - User Information -->
    <div
      class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
      aria-labelledby="userDropdown"
    >
      <a class="dropdown-item" href="#" data-toggle="modal" data-target="#manualModal">
        <i class="bi bi-person-fill fa-sm fa-fw mr-2 text-gray-400"></i>
        <!-- <i class="fas fa-solid fa-user "></i> -->
        Manual
      </a>
      <a
        class="dropdown-item"
        href="#"
        data-toggle="modal"
        data-target="#excelModal"
      >
        <i class="bi bi-people-fill fa-sm fa-fw mr-2 text-gray-400"></i>
        <!-- <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> -->
        Excel
      </a>
    </div>
  </div>

  <!-- manual -->
  <div
    class="modal fade"
    id="manualModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="manualModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="manualModalLabel">Manual Input User</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form enctype="multipart/form-data">
            <div class="mb-3">
              <label class="form-label">Nama</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="input nama"
                v-model="form.name"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Lokasi</label>
              <select
                v-model="selectedLokasi"
                class="form-select"
                aria-label="Default select example"
              >
                <option disabled>Pilih Lokasi</option>
                <option
                  v-for="item in lokasi"
                  :key="item.id"
                  :value="{
                    kodeData: item.kodeData,
                    namaData: item.namaData,
                  }"
                >
                  {{ item.namaData }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">NIK</label>
              <input
                type="number"
                class="form-control"
                id="nik"
                placeholder="input nik"
                v-model="form.nik"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Telp</label>
              <input
                type="number"
                class="form-control"
                id="telp"
                placeholder="input telp"
                v-model="form.telp"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="input email"
                v-model="form.email"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="submit" class="btn blueButton" @click="handleSubmit">
            Kirim
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- excel -->
  <div
    class="modal fade"
    id="excelModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="excelModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="excelModalLabel">Import User</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="form-label">File Excel</label>
              <input type="file" class="form-control" id="file" />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="updateNote">
            Kirim
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        name: "",
        kodeData: "",
        namaData: "",
        lokasi: "",
        nik: "",
        telp: "",
        email: ""
      },
      lokasi: [],
      selectedLokasi: [],
      reload: false
    };
  },
  methods: {
    async dataLokasi() {
      try {
        const response = await axios.get(`https://10.11.10.243/backend/public/api/lokasi`);
        this.lokasi = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    handleSubmit() {
      this.reload = true;
      let formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("kodeLokasi", this.selectedLokasi.kodeData);
      formData.append("namaLokasi", this.selectedLokasi.namaData);
      formData.append("nik", this.form.nik);
      formData.append("telp", this.form.telp);
      formData.append("email", this.form.email);
      console.log(formData);
      axios
        .post("https://10.11.10.243/backend/public/api/auth/register", formData, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.reload=false;
          console.log(response);
          this.showAlert("Data Berhasil di inputkan!!");
        });
          this.reload=false;
        $("#manualModal").modal("hide");
  },

    showAlert(message) {
      // Use sweetalert2
      this.$swal(message).then(() => {});
    },
  },
  created() {
    const currentTimeUTC = new Date().toUTCString();
    console.log("Waktu Sekarang (UTC):", currentTimeUTC);
    const token = sessionStorage.getItem("token"); // Ambil token dari local storage

    if (token) {
      try {
        const [headerBase64, signatureBase64] = token.split(".");
        const header = JSON.parse(atob(headerBase64));
        const signature = atob(signatureBase64);

        const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Mendekode bagian payload dari token JWT
        const expTimestamp = tokenPayload.exp;

        const expDate = new Date(expTimestamp * 1000); // Konversi Unix Timestamp ke JavaScript Date

        console.log("Waktu Kedaluwarsa (UTC):", expDate.toUTCString()); // Tampilkan waktu kedaluwarsa dalam format UTC

        if (new Date() > expDate) {
          console.log("Keluar");
          sessionStorage.removeItem("token");
          this.$router.push("/");
        } else {
          console.log("Aman");
        }
        const level = tokenPayload.level; // Ambil level pengguna dari payload
        this.name = tokenPayload.name;
        this.alamat = tokenPayload.alamat;
        if (level !== "1") {
          this.$router.push("/unauthorized");
        } else if (!header || !signature) {
          this.$router.push("/");
          localStorage.removeItem("token");
        }
        // success
        this.dataLokasi();
        // akhir
      } catch (error) {
        console.error("Error decoding token:", error);
        this.$router.push("/"); // Tindakan jika terjadi kesalahan dekode
      }
    } else {
      this.$router.push("/"); // Tindakan jika token tidak ada (pengguna belum terautentikasi)
    }
  },
};
</script>
<style scoped>
.preloader{ 
  position:fixed; 
  opacity: 0.9;
  left:0px; 
  top:0px; 
  width:100%; 
  height:100%; 
  z-index:999999; 
  background-color:#ffffff; 
  background-position:center center; 
  background-repeat:no-repeat; 
  background-image:url(/img/loader.gif);
}
</style>