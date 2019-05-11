import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/main.scss';

import Vue from 'vue';
import Main from './main.vue';
import Options from './Options/Options.vue';

import Vehicle from './vehicle';
//import OptionControl from './option-control';
//import Options from './options';

import P5 from 'p5';

const WIDTH = 1200;
const HEIGHT = 800;
const BOUNDS = 25;
const NUM_VEHICLES = 50;

let vehicles = [];
let canvas;

new Vue({
  el: '#main',
  render: h => h(Main),
  mounted: startSketch
});

function startSketch() {
  const p5Instance = new P5(function(sketch) {
    sketch.setup = function() {
      const canvas = sketch.createCanvas(WIDTH, HEIGHT);
      canvas.parent('sketch');

      for (let i = 0; i < NUM_VEHICLES; i++) {
        vehicles.push(new Vehicle(sketch));
      }
    };

    sketch.draw = function() {
      //p5.canvas.parent('sketch');
      sketch.background('#353432');

      // Draw a boundaries

      sketch.noStroke();
      sketch.fill('#4E4D4A');
      sketch.rect(BOUNDS, BOUNDS, WIDTH - BOUNDS * 2, HEIGHT - BOUNDS * 2);

      for (const v of vehicles) {
        v.update();
        v.show();
      }
    };
  });
}
