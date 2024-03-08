<template>
  <div class="px-8">
    <p>{{ error }}</p>
    <p>contoh: {{ decodeString }}</p>
    <qrcode-stream @error="onError" @decode="decode"></qrcode-stream>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";

export default {
  data() {
    return {
      error: "",
      decodeString: "",
    };
  },
  components: {
    QrcodeStream,
  },
  methods: {
    onError(error) {
      if (error.name === "NotAllowedError") {
        this.error = "User denied camera access permission";
      } else if (error.name === "NotFoundError") {
        this.error = "No suitable camera device installed";
      } else if (error.name === "NotSupportedError") {
        this.error = "Page is not served over HTTPS (or localhost)";
      } else if (error.name === "NotReadableError") {
        this.error = "Maybe camera is already in use";
      } else if (error.name === "OverconstrainedError") {
        this.error = "Did you request the front camera although there is none?";
      } else if (error.name === "StreamApiNotSupportedError") {
        this.error = "Browser seems to be lacking features";
      }
    },
    decode(decodeString) {
      this.decodeString = decodeString;
    },
  },
};
</script>
