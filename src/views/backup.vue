<template>
  <div>
    <input v-model="dataToEncrypt" placeholder="Data rahasia">
    <button @click="encryptData">Enkripsi</button>
    <button @click="decryptData">Dekripsi</button>
    <p>Data yang dienkripsi: {{ encryptedData }}</p>
    <p>Data yang didekripsi: {{ decryptedData }}</p>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      dataToEncrypt: "",
      secretKey: "KunciRahasia", // Gantilah dengan kunci rahasia Anda
      encryptedData: "",
      decryptedData: "",
    };
  },
  methods: {
    // Fungsi untuk mengenkripsi data
    encryptData() {
      this.encryptedData = this.encrypt(this.dataToEncrypt, this.secretKey);
    },
    // Fungsi untuk mendekripsi data
    decryptData() {
      this.decryptedData = this.decrypt(this.encryptedData, this.secretKey);
    },
    // Fungsi untuk mengenkripsi data dengan AES
    encrypt(data, secretKey) {
      const ciphertext = CryptoJS.AES.encrypt(data, secretKey).toString();
      return this.shortenText(ciphertext, 20);
    },
    // Fungsi untuk mendekripsi data dengan AES
    decrypt(encryptedData, secretKey) {
      const fullCiphertext = this.expandText(encryptedData, 20);
      const bytes = CryptoJS.AES.decrypt(fullCiphertext, secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedData;
    },
    // Fungsi untuk memotong atau memperpanjang teks
    shortenText(text, length) {
      if (text.length <= length) {
        return text;
      } else {
        return text.substring(0, length);
      }
    },
    expandText(text, length) {
      while (text.length < length) {
        text += " "; // Memperpanjang dengan spasi
      }
      return text;
    },
  },
};
</script>
