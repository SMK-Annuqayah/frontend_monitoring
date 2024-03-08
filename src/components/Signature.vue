<template>
  <div id="app">
    <div class="row mt-4">
      <div class="col-sm-1"></div>
      <div class="col-sm-10">
        <vueSignature
          ref="signature"
          :sigOption="option"
          :h="'400px'"
          :disabled="disabled"
          :defaultUrl="dataUrl"
        ></vueSignature>
      </div>
      <div class="col-sm-1"></div>
    </div>
    <div class="row mt-2">
      <div class="col-sm-1"></div>
      <div class="col-sm-2">
        <button class="btn btn-primary w-100" type="button" @click="save">Save</button>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-danger w-100" type="button" @click="clear">Clear</button>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-warning w-100" type="button" @click="undo">Undo</button>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-success w-100" type="button" @click="addWatermark">Watermark</button>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-secondary w-100" type="button" @click="toggleDisabled">Disabled</button>
      </div>
      <div class="col-sm-1"></div>
    </div>
  </div>
</template>

<script>
import vueSignature from 'vue-signature';

export default {
  name: 'App',
  components: {
    vueSignature,
  },
  data() {
    return {
      option: {
        penColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(255,255,255)',
      },
      disabled: false,
    };
  },
  methods: {
    save() {
      const png = this.$refs.signature.save();
      const jpeg = this.$refs.signature.save('image/jpeg');
      const svg = this.$refs.signature.save('image/svg+xml');
      console.log(png);
      console.log(jpeg);
      console.log(svg);
    },
    clear() {
      this.$refs.signature.clear();
    },
    undo() {
      this.$refs.signature.undo();
    },
    addWatermark() {
      this.$refs.signature.addWaterMark({
        text: 'PT. Garam(Persero)',
        font: '20px Arial',
        style: 'all',
        fillStyle: 'red',
        strokeStyle: 'blue',
        x: 100,
        y: 200,
        sx: 100,
        sy: 200,
      });
    },
    toggleDisabled() {
      this.disabled = !this.disabled;
    },
  },
};
</script>

<style scoped>
</style>
