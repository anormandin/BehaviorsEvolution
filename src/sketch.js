import Vehicle from './vehicle';

import P5 from 'p5';

const WIDTH = 1100;
const HEIGHT = 800;
const BOUNDS = 25;
const NUM_VEHICLES = 25;

export default class Sketch {
  restart() {
    this.P5instance.createVehicles();
  }

  toggleFps(show) {
    this.P5instance.showFps = show || !this.P5instance.showFps;
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
        sk.lastTime = sk.millis();
        sk.fpsAvg = 0;
        sk.frameRate(60);
        sk.showFps = false;
      };

      sk.draw = function() {
        const time = sk.millis();
        const deltaTime = time - sk.lastTime;
        sk.lastTime = time;
        const alpha = 0.9;

        sk.fpsAvg = Math.round(alpha * sk.fpsAvg + 100 / deltaTime);

        sk.background('#353432');

        // Draw playfield
        sk.noStroke();
        sk.fill('#4E4D4A');
        sk.rect(BOUNDS, BOUNDS, WIDTH - BOUNDS * 2, HEIGHT - BOUNDS * 2);

        for (const v of sk.vehicles) {
          v.update();
          v.show();
        }

        if (sk.showFps) {
          sk.footerText(`fps: ${sk.fpsAvg}`, WIDTH / 2, HEIGHT - 12);
        }
      };

      sk.footerText = function(text, x, y) {
        sk.fill(200);
        sk.textSize(12);
        sk.textAlign(sk.CENTER);
        sk.text(text, x, y);
      };
    });
  }
}
