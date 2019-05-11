<template>
  <div>
    <navbar-component></navbar-component>
    <div class="container">
      <div class="row">
        <div id="sketch"></div>
      </div>
      <div class="row pt-2">
        <button class="btn btn-primary btn-large" @click="this.restart">Restart</button>
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
    }
  }
};
</script>

<style scoped>
</style>
