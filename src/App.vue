<template>
  <div id="page-top" :class="{ 'dark-mode': isDarkMode }">
    <router-view/>
    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>
  </div>
</template>

<script>
export default{
  data() {
  return {
    isDarkMode: true
  };
},

}
</script>
