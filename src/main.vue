<template>
  <div>
    <navbar-component></navbar-component>
    <div class="container">
      <div class="row">
        <div id="sketch"></div>
      </div>
      <div class="row pt-2">
        <div class="form-group form-inline">
          <button class="btn btn-primary btn-large" @click="this.restart">Restart</button>
        </div>
        <div class="form-group form-inline ml-1">
          <label for="showFPS">Display FPS</label>
          <input name="showFPS" type="checkbox" @click="this.toggleFps">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from './components/Navbar/NavbarComponent.vue';
import Sketch from './sketch.js';

export default {
  name: 'app',
  components: { NavbarComponent },
  mounted() {
    this.sketch = new Sketch();
    this.sketch.start();
  },
  methods: {
    restart() {
      this.sketch.restart();
    },
    toggleFps() {
      console.log('Changed');
      this.sketch.toggleFps();
    }
  }
};
</script>

<style scoped>
</style>
