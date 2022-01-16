class Particle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-1, 1.5);
  }

  // creation of a particle.
  createParticle() {
    noStroke();
    fill("white");
    circle(this.x, this.y, this.r);
  }

  // setting the particle in motion.
  moveParticle() {
    if (this.x < 0 || this.x > width) this.xSpeed *= -1;
    if (this.y < 0 || this.y > height) this.ySpeed *= -1;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
}

  // for (let i = 0; i < 360; i++) {
  //   let r = 5;
  //   let x = r * cos(i);
  //   let y = r * sin(i);
  //   particles.push(new Particle(x, y, r));
  // }

//   for (let i = 0; i < particles.length; i++) {
//     particles[i].createParticle();
//     particles[i].moveParticle();
//     particles[i].joinParticles(particles.slice(i));
//   }