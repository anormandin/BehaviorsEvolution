import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/main.scss';

import Vue from 'vue'
import Main from './main.vue'
import Options from './Options/Options.vue'

import Vehicle from './vehicle';
//import OptionControl from './option-control';
//import Options from './options';


import p5 from 'p5/lib/p5';

const WIDTH = 800;
const HEIGHT = 600;
const BOUNDS = 25;

let vehicles = [];
let canvas;

window.setup = function() {
  canvas = createCanvas(WIDTH, HEIGHT);

  new Vue({
    el: '#main',
    render: h => h(Main)
  });
  
  for (let i = 0; i < 20; i++) {
    vehicles.push(new Vehicle());
  }
};

window.draw = function() {
  canvas.parent('sketch');
  background('#353432');

  // Draw a boundaries

  noStroke();
  fill('#4E4D4A');
  rect(BOUNDS, BOUNDS, WIDTH - BOUNDS * 2, HEIGHT - BOUNDS * 2);

  for (const v of vehicles) {
    v.update();
    v.show();
  }
};

// document.addEventListener("DOMContentLoaded", function(){
//   const canvas = document.querySelector('canvas');
//   document.querySelector('#sketch').appendChild(canvas);
// });

// new P5(function(p5) {
//   let vehicles = [];

//   setup = function() {
//     createCanvas(WIDTH, HEIGHT);
//     vehicles.push(new Vehicle(p5));
//   };

//   draw = function() {
//     background('#353432');

//     // Draw a boundaries

//     noStroke();
//     fill('#4E4D4A');
//     rect(BOUNDS, BOUNDS, WIDTH - BOUNDS * 2, HEIGHT - BOUNDS * 2);

//     for (const v of vehicles) {
//       v.update(p5);
//       v.show(p5);
//     }
//   };

//   mouseDragged = function() {
//     vehicles[0].seek(createVector(mouseX, mouseY));
//     // prevent default
//     return false;
//   };
// }, 'sketch');
