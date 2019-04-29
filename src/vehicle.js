import p5 from 'p5/lib/p5';

import Options from './options';

//const MAX_SPEED = 5;
const MAX_FORCE = 2;

const WIDTH = 800;
const HEIGHT = 600;
const BOUNDS = 25;

export default class Vehicle {
  constructor() {
    this.max_speed = random(4, 12);
    this.pos = createVector(
      random(BOUNDS, WIDTH - BOUNDS * 2),
      random(BOUNDS, HEIGHT - BOUNDS * 2)
    );
    this.vel = createVector(
      random(2, this.max_speed),
      random(2, this.max_speed)
    );
    this.acc = createVector(0, 0);
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
    let fear = createVector();
    if (
      this.pos.x < BOUNDS ||
      this.pos.x > WIDTH - BOUNDS ||
      this.pos.y < BOUNDS ||
      this.pos.y > HEIGHT - BOUNDS
    ) {
      fear = this.seek(createVector(WIDTH / 2, HEIGHT / 2));
    }
    return fear;
  }

  seekMouse() {
    const steer = this.seek(createVector(mouseX, mouseY));
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

  show() {
    const radius = 8;
    const angle = this.vel.heading() + HALF_PI;

    // Draw the triangle
    noStroke();
    fill('#2790B0');
    push();
    translate(this.pos);
    rotate(angle);
    beginShape();
    vertex(0, -radius * 2);
    vertex(-radius, radius * 2);
    vertex(0, -radius * 0.2);
    vertex(radius, radius * 2);
    endShape(CLOSE);
    pop();
  }
}

// float theta = velocity.heading() + PI/2;
//     fill(175);
//     stroke(0);
//     pushMatrix();
//     translate(location.x,location.y);
//     rotate(theta);
//     beginShape();
//     vertex(0, -r*2);
//     vertex(-r, r*2);
//     vertex(r, r*2);
//     endShape(CLOSE);
//     popMatrix();
