<template>
  <!-- Sidebar -->
  <ul
    class="navbar-nav bg-gradient-light sidebar sidebar-dark accordion"
    id="accordionSidebar"
    :class="{ toggled: sidebarToggled }"
  >
    <!-- Sidebar - Brand -->
    <a
      class="sidebar-brand d-flex align-items-center justify-content-center"
      href="#"
    >
      <div class="sidebar-brand-icon mt-2">
        <!-- <img src="/img/logo.png" alt="logo" width="50" /> -->
      </div>
      <div class="sidebar-brand-text ms-3">
                <span class="text-primary"><sup>SMK</sup>ANNUQAYAH</span>
      </div>
    </a>

    <!-- Divider -->
    <!-- <hr class="sidebar-divider my-0 mt-5"> -->

    <!-- Heading -->
    <div class="sidebar-heading mt-5 text-primary">Menu</div>
    <!-- Nav Item - Dashboard -->
    <li class="nav-item">
      <router-link
        class="nav-link text-primary"
        to="/admin-dashboard"
        active-class="font-weight-bold active-link"
      >
        <i class="bi bi-speedometer2 text-primary"></i>
        <span>Dashboard</span>
      </router-link>
    </li>


    
  </ul>
  <!-- End of Sidebar -->
</template>
<script>
export default {
  data() {
    return {
      sidebarToggled: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarToggled = !this.sidebarToggled;
    },
  },
};
</script>

<style>
@media (max-width: 576px) {
  /* Gaya CSS untuk menyembunyikan sidebar saat sidebarToggled bernilai false */
  .sidebar {
    display: none;
  }
}
/* Gaya CSS untuk menampilkan sidebar saat sidebarToggled bernilai true */
.toggle-sidebar {
  display: block !important;
  /* Tambahkan gaya CSS lain yang Anda inginkan untuk tampilan sidebar yang ditampilkan */
}
.nav-link.active-link,
.nav-link > i {
  font-weight: bold;
  color: #061387 !important;
}

.nav-link.active-link::before {
  content: "";
  display: block;
  width: 50%;
  height: 3px;
  background-color: #061387;
  position: absolute;
  bottom: 0;
}
</style>