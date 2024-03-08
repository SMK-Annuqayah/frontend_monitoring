<template>
  <!-- Topbar -->
  <nav
    class="navbar navbar-expand navbar-light customNav bgCustom topbar mb-4 static-top shadow"
  >
    <!-- Sidebar Toggle (Topbar) -->
    <form class="form-inline" @submit.prevent>
      <!-- <button
        id="sidebarToggleTop"
        class="btn btn-link d-md-none rounded-circle mr-3 text-light"
        @click="sidebarToggled"
      >
        <i class="fa fa-bars"></i>
      </button> -->
    </form>
    <!-- Topbar Navbar -->
    <ul class="navbar-nav ml-auto">


      <!-- <li class="nav-item dropdown no-arrow mx-1">
        <a
          class="nav-link dropdown-toggle"
          href="#"
        >
          <button class="btn btn-warning">Kokagram</button>
          
          <span class="badge badge-danger badge-counter fs-5">$</span>
        </a>
      </li> -->
      <div class="topbar-divider d-none d-sm-block"></div>

      <!-- Nav Item - User Information -->
      <li class="nav-item dropdown no-arrow">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="mr-2 d-none d-lg-inline text-white small">{{
            this.name
          }}</span>
          <!-- <img
            :src="'https://backend-webmember.lumirainternational.com/storage/profile/' + gambar"
            alt=" gambarprofile"
            class="img-profile rounded-circle"
          /> -->
        </a>
        <!-- Dropdown - User Information -->
        <div
          class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="userDropdown"
        >
          <a
            class="dropdown-item"
            href="#"
            data-toggle="modal"
            data-target="#logoutModal"
            @click="konfirmasi()"
          >
            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Logout
          </a>
        </div>
      </li>
    </ul>
  </nav>
  <!-- End of Topbar -->
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  // props: ["id"],
  props: {
    sidebarToggled: Boolean, // Terima properti sidebarToggled dari komponen induk (App.vue)
  },

  data() {
    return {
      name: "",
      gambar: "",
      user_id: "",
    };
  },
  methods: {
    sidebarToggled() {
      this.$emit("toggle-sidebar", !this.sidebarToggled);
    },
    konfirmasi() {
      Swal.fire({
        title: "Apakah Anda yakin ingin logout?",
        text: "Anda akan keluar dari akun ini.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Logout",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.logout();
        }
      });
    },
    logout() {
      const token = sessionStorage.getItem("token");
      if (!token) {
        // Jika token tidak ditemukan, tampilkan pesan kesalahan menggunakan Swal.fire()
        Swal.fire({
          title: "Logout gagal",
          text: "Token tidak ditemukan.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
        return;
      }

      axios
        .post(`https://backend-webmember.lumirainternational.com/api/auth/logout`, null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          Swal.fire({
            title: `Logout berhasil!`,
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });

          // Redirect ke halaman tertentu
          sessionStorage.removeItem("token");
          this.$router.push("/"); // or the desired redirect route
        })
        .catch((error) => {
          console.error(error);

          // Jika terjadi kesalahan, tampilkan pesan kesalahan menggunakan Swal.fire()
          Swal.fire({
            title: "Logout gagal",
            text: "Terjadi kesalahan saat melakukan logout.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        });
    },
  },
  created() {
    const token = sessionStorage.getItem("token"); // Ambil token dari local storage

    if (token) {
      try {
        const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Mendekode bagian payload dari token JWT
        this.name = tokenPayload.name;
        this.user_id = tokenPayload.id;
        this.gambar = tokenPayload.gambar;
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
.customNav {
  border-bottom: 5px solid #fac800;
}
.bgCustom {
  background-color: #061387;
}
</style>
