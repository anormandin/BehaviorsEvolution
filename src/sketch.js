import Vehicle from './vehicle';

import P5 from 'p5';

const WIDTH = 1100;
const HEIGHT = 800;
const BOUNDS = 25;
const NUM_VEHICLES = 8;

export default class Sketch {
  restart() {
    this.P5instance.createVehicles();
  }

  start() {
    this.P5instance = new P5(function(sk) {
      sk.createVehicles = function() {
        sk.vehicles = [];
        for (let i = 0; i < NUM_VEHICLES; i++) {
          sk.vehicles.push(new Vehicle(sk));
        }
      };

      sk.setup = function() {
        const canvas = sk.createCanvas(WIDTH, HEIGHT);
        canvas.parent('sketch');
        this.createVehicles();
      };

      sk.draw = function() {
        sk.background('#353432');

        // Draw a boundaries
        sk.noStroke();
        sk.fill('#4E4D4A');
        sk.rect(BOUNDS, BOUNDS, WIDTH - BOUNDS * 2, HEIGHT - BOUNDS * 2);

        for (const v of sk.vehicles) {
          v.update();
          v.show();
        }
      };
    });
  }
}
