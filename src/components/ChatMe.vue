<template>
  <div class="chat-container">
    <div v-if="showChatBox" class="chat-box">

      <div class="text-primary fw-bold">Halo, ada yang bisa dibantu?</div>
      <!-- <input v-model="message" type="text" placeholder="Masukkan pesan"> -->
       <textarea class="form-control" id="chat" v-model="message" rows="2"></textarea>
      <button @click="sendMessage" class="float-end">Kirim</button>
    </div>
    <div class="whatsapp-icon" :class="{ active: showChatBox }" @click="toggleChatBox">
      <i class="fab fa-whatsapp"></i>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      showChatBox: false,
      message: "",
      phoneNumber: "6281232357173",
      nama:"",
      lokasi:""
    };
  },
  methods: {
    toggleChatBox() {
      this.showChatBox = !this.showChatBox;
      if (!this.showChatBox) {
        this.message = "";
      }
    },
    async sendMessage(){
      // // const session = await whatsapp.startSession("ilsya");
      // const sessions = whatsapp.getAllSession();
      // // const session = whatsapp.getSession("ilsya");
      // // whatsapp.loadSessionsFromStorage();
      // await whatsapp.sendTextMessage({
      //   sessionId: "ilsya", // session ID
      //   to: "6281907150504", // always add country code (ex: 62)
      //   text: "Hi There, This is Message from Server!", // message you want to send
      // });




      const encodedMessage = encodeURIComponent(this.message);
      const token = sessionStorage.getItem("token"); // Ambil token dari local storage
      if (token) {
        try {
          const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Mendekode bagian payload dari token JWT
          this.nama = tokenPayload.name;
          this.lokasi = tokenPayload.namaLokasi;

          const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=Nama%3A%20${this.nama}%0ALokasi%3A%20${this.lokasi}%0APath%3A%20${this.$route.path}%0APesan%3A%20${encodedMessage}`;
          window.open(whatsappUrl, "_blank");
          this.message = "";
          this.toggleChatBox();
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else {
        const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
        this.message = "";
        this.toggleChatBox();
      }
    }
  },
  created() {
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .chat-container{
    display: none !important;
  }
}
.chat-container {
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  z-index: 1;
}

.whatsapp-icon {
  background-color: #25d366;
  color: #fff;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
  transition: background-color 0.3s ease;
}

.whatsapp-icon.active {
  background-color: #dc3545;
}

.chat-box {
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin-left: 10px;
  z-index: 2 !important;
}

.chat-box input {
  width: 200px;
  border: none;
  outline: none;
  padding: 5px;
  margin-right: 10px;
}

.chat-box button {
  margin-top: 5px;
  border: none;
  background-color: #25d366;
  color: white;
  border-radius: 4px;
}
</style>
