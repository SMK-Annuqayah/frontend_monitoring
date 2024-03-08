<script setup>
import Captcha from "../components/Captcha.vue";
import ChatMe from "../components/ChatMe.vue";
</script>
<template>
  <div class="container">
    <ChatMe />
    <!-- Outer Row -->
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Selamat Datang!</h1>
                  </div>
                  <form class="user" @submit.prevent="login">
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control form-control-user"
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Masukkan Email"
                        v-model="form.email"
                      />
                    </div>
                    <div class="form-group">
                      <div class="row">
                        <div class="col-10">
                          <input
                            :type="showPassword ? 'text' : 'password'"
                            class="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Masukkan Password"
                            v-model="form.password"
                          />
                        </div>
                        <div class="col-2">
                          <i
                            class="bi customIcon bi-eye-slash-fill"
                            @click="togglePasswordVisibility"
                            v-if="!showPassword"
                          ></i>
                          <i
                            class="bi customIcon bi-eye-fill"
                            @click="togglePasswordVisibility"
                            v-if="showPassword"
                          ></i>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-checkbox small">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customCheck"
                          v-model="cheked"
                        />
                        <label class="custom-control-label" for="customCheck"
                          >Ingat Saya</label
                        >
                      </div>
                    </div>

                    <div class="confirmHuman" v-if="captchaValidate === false">
                      <img
                        width="48"
                        height="48"
                        src="https://img.icons8.com/fluency/48/checked.png"
                        alt="checked"
                      />
                      You are human
                    </div>

                    <Captcha
                      @emitCaptcha="captchaCode"
                      v-if="captchaValidate === true"
                    />
                    <button
                      type="submit"
                      class="btn btn-primary btn-user btn-block mt-3"
                      :disabled="captchaValidate"
                    >
                      Masuk
                    </button>
                  </form>
                  <hr />
                  <div class="text-center">
                    <router-link class="small" to="/register"
                      >Buat Akun!</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";

export default {
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      uniqueValue: "",
      cheked: false,
      captchaValidate: true,
      showPassword: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    captchaCode(data) {
      this.captchaValidate = data;
    },
    login() {
      const formData = new FormData();
      formData.append("email", this.form.email);
      formData.append("password", this.form.password);

      axios
        .post("http://127.0.0.1:8000/api/auth/login", formData)
        .then((response) => {
          if (this.cheked === true) {
            const login = JSON.stringify(this.form);
            localStorage.setItem("login", login);
          } else {
            const login = localStorage.getItem("login");
            if (login) {
              localStorage.removeItem("login");
            }
          }

          const token = response.data.access_token;
          localStorage.setItem("ssoAccess", token);
          sessionStorage.setItem("token", token);
          if (response.data.level == "0") {
            this.$router.push("/user-dashboard");
          } else if (response.data.level == "1") {
            this.$router.push("/wali-dashboard");
          } else if (response.data.level == "2") {
            this.$router.push("/pembimbing-dashboard");
          }else if (response.data.level == "3") {
            this.$router.push("/admin-dashboard");
          } else {
            this.$router.push("/unauthorized");
          }
        })
        .catch((error) => {
          console.error(error);
          this.captchaValidate = true;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Login gagal. Periksa kembali email dan password Anda.",
          });
        });
    },
  },
  mounted() {
    const body = document.querySelector("body");
    body.style.backgroundImage = "url(/img/bg.webp)";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundSize = "cover";
  },
  created() {
    const login = localStorage.getItem("login");
    if (login) {
      this.form = JSON.parse(login);
      this.cheked = true;
    }
  },
};
</script>

<style scoped>
/* Your styles here */
.confirmHuman {
  width: 100%;
  height: 50px;
  /* border: 2px lightgreen solid; */
  border-radius: 10px;
}

.customIcon {
  font-size: 30px;
  cursor: pointer;
}
</style>
