<template>
  <div class="sample-captcha">
    <div class="row">
      <div class="col-sm-6">
        <section class="captcha-box">
          <VueClientRecaptcha
            :value="inputValue"
            @getCode="getCaptchaCode"
            @isValid="checkValidCaptcha"
          />
        </section>
      </div>
      <div class="col-sm-6">
        <section class="data-box">
          <input
            v-model="inputValue"
            placeholder="Masukkan captcha"
            class="input"
            type="text"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from "vue";
import VueClientRecaptcha from "vue-client-recaptcha";

export default {
  components: {
    VueClientRecaptcha,
  },
  setup() {
    /* pass value to captcha  */
    const inputValue = ref("");

    const instance = getCurrentInstance();

    const getCaptchaCode = (value) => {
      /* you can access captcha code */
      data.captchaCode = value;
    };

    const checkValidCaptcha = (value) => {
      /* expected return boolean if your value and captcha code are same return True otherwise return False */
      data.isValid = value;
      if (value) {
        captchaM();
        // alert("Your Captcha is valid now you can submit");
      }
    };

    const captchaM = () => {
      instance.emit("emitCaptcha", false);
    };

    const data = ref({
      captchaCode: null,
      isValid: false,
    });

    return {
      inputValue,
      data,
      getCaptchaCode,
      checkValidCaptcha,
      captchaM,
    };
  },
};
</script>

<style>
@import url("/node_modules/vue-client-recaptcha/dist/style.css");
.sample-captcha {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.sample-captcha .data-box .input {
  padding: 10px;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  width: 100%;
}
.sample-captcha .data-box .input:focus {
  background: #f0f0f00d;
  outline: none;
  box-shadow: inset 0 -2px 0 #0077ff;
}
.sample-captcha .data-box .data {
  width: 100%;
  margin-top: 10px;
  padding: 20px 0 20px 20px;
  background-color: #ebebeb;
  border-radius: 4px;
}
.sample-captcha .captcha-box {
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 2px black solid; */
  background-color: #eeeeee;
}
</style>
