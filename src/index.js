import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/main.scss';

import Vehicle from './vehicle';
import OptionControl from './option-control';
import Options from './options';

import p5 from 'p5/lib/p5';

const WIDTH = 800;
const HEIGHT = 600;
const BOUNDS = 25;

let vehicles = [];

window.setup = function() {
  let canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent('sketch');

  // new OptionControl().render('options', {
  //   id: 'test',
  //   label: 'Test',
  //   min: 2,
  //   max: 15,
  //   cur: 5
  // });

  for (let i = 0; i < 20; i++) {
    vehicles.push(new Vehicle());
  }
};

window.draw = function() {
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
