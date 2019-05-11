import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/main.scss';

import Vue from 'vue';
import Main from './main.vue';

new Vue({
  el: '#main',
  render: h => h(Main)
});
