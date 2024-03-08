<template>
  <figure class="qrcode">
    <qrcode-vue
      value="https://www.ptgaram.com/"
      tag="svg"
      :size="100" 
      level="H"
      :options="{
        errorCorrectionLevel: 'Q',
        width: 400,
      }"
    >
    </qrcode-vue>
    <img
      class="qrcode__image"
      src="/img/logo.png"
      alt="Chen Fengyuan"
      width="200"
    />
  </figure>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  data() {
    return {
      barcodeValue: '',
    };
  },
  components: {
    QrcodeVue,
  },
  methods: {

  },
};
</script>

<style scoped>
.qrcode {
  display: inline-block;
  font-size: 0;
  top: 20px;
  position: relative;
  text-align: center; /* Menengahkan elemen dalam .qrcode */
}

.qrcode__image {
  background-color: #ffffff;
  border-radius: 20%;
  height: 20%;
  overflow: hidden;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20%;
}
</style>
