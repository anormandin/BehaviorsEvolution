import * as p5 from 'p5/lib/p5';

import Options from './options';

//const MAX_SPEED = 5;
const MAX_FORCE = 2;

const WIDTH = 800;
const HEIGHT = 600;
const BOUNDS = 25;

export default class Vehicle {
  constructor(sketch) {
    this.sketch = sketch;
    this.pos = this.sketch.createVector(
      this.sketch.random(BOUNDS, WIDTH - BOUNDS * 2),
      this.sketch.random(BOUNDS, HEIGHT - BOUNDS * 2)
    );
    this.vel = this.sketch.createVector(
      this.sketch.random(2, this.max_speed),
      this.sketch.random(2, this.max_speed)
    );
    this.acc = this.sketch.createVector(0, 0);
    this.max_speed = this.sketch.random(4, 12);
  }

  update() {
    this.behaviors();

    this.vel.add(this.acc);
    this.vel.limit(this.max_speed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  seek(target) {
    let desired = p5.Vector.sub(this.pos, target);
    desired.normalize();
    desired.mult(this.max_speed);
    let steer = p5.Vector.sub(this.vel, desired);
    steer.limit(MAX_FORCE);
    return steer;
  }

  fleeBounds() {
    let fear = this.sketch.createVector();
    if (
      this.pos.x < BOUNDS ||
      this.pos.x > WIDTH - BOUNDS ||
      this.pos.y < BOUNDS ||
      this.pos.y > HEIGHT - BOUNDS
    ) {
      fear = this.seek(this.sketch.createVector(WIDTH / 2, HEIGHT / 2));
    }
    return fear;
  }

  seekMouse() {
    const steer = this.seek(
      this.sketch.createVector(this.sketch.mouseX, this.sketch.mouseY)
    );
    return steer;
  }

  behaviors() {
    let desireSteer = this.seekMouse();

    let fearSteer = this.fleeBounds();
    fearSteer.setMag(this.max_speed * 2);

    this.applyForce(desireSteer);
    this.applyForce(fearSteer);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show(sketch) {
    const radius = 8;
    const angle = this.vel.heading() + this.sketch.HALF_PI;

    // Draw the triangle
    this.sketch.noStroke();
    this.sketch.fill('#2790B0');
    this.sketch.push();
    this.sketch.translate(this.pos);
    this.sketch.rotate(angle);
    this.sketch.beginShape();
    this.sketch.vertex(0, -radius * 2);
    this.sketch.vertex(-radius, radius * 2);
    this.sketch.vertex(0, -radius * 0.2);
    this.sketch.vertex(radius, radius * 2);
    this.sketch.endShape(p5.CLOSE);
    this.sketch.pop();
  }
}
