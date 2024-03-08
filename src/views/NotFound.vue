<template>
  <div class="container-fluid">
    <!-- 404 Error Text -->
    <!-- <h1>Not Found</h1> -->
    <div class="text-center">
      <div class="error mx-auto" data-text="404">404</div>
      <p class="lead text-gray-800 mb-5">Halaman tidak ditemukan</p>
      <p class="text-gray-500 mb-0">
        Halaman yang anda tuju tidak tersedia...
      </p>
      <!-- <a href="index.html">&larr; Kembali ke Dashboard</a> -->
      <router-link :to='role+"-dashboard"'>&larr; Kembali ke Dashboard</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      role: null
    };
  },
  methods: {},
  created() {
    const currentTimeUTC = new Date().toUTCString();
    console.log("Waktu Sekarang (UTC):", new Date());

    const token = localStorage.getItem("token"); // Ambil token dari local storage

    if (token) {
      try {
        const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Mendekode bagian payload dari token JWT
        const expTimestamp = tokenPayload.exp;

        const expDate = new Date(expTimestamp * 1000); // Konversi Unix Timestamp ke JavaScript Date

        console.log("Waktu Kedaluwarsa (UTC):", expDate); // Tampilkan waktu kedaluwarsa dalam format UTC

        if (new Date() > expDate) {
          console.log("Keluar");
          this.$router.push("/");
        } else {
          console.log("Aman");
        }

        this.role = tokenPayload.role; // Ambil role pengguna dari payload
        this.user_id = tokenPayload.id;
        if (this.role !== "user" && this.role !== "admin") {
          this.$router.push("/unauthorized");
        }

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