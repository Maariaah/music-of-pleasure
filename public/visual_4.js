let yoff = 0.0;
let r = 100;
let add = 200;
let splitCircle = 6;
let curveBase = (2 * Math.PI) / splitCircle;
let fqSmoothLevel = 1;
let volHistory = [];
let phase = 0;
let zoff = 0;
let angle = 0;

function drawWaveform() {
  spectrum = fft.getValue().map((item) => Math.abs(item)); // create Analyser
  fill(255);
  energy = noise(500, 0) * 100;
  //srediti seckanje
  // dodati trag
  // treba da se smanjuje i povecava kao da dise
  translate(width / 2, height / 2);
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();

  let noiseMax = 2;
  let diameter =map(sin(angle), -1, 1, 0, 200);

   for (let i = 0; i < spectrum.length / 100; i++) {

    for (let a = 0; a < TWO_PI; a += radians(10)) {
      noiseMax = spectrum[i] / 50;
      let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
      let yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
       let r = map(noise(xoff, yoff, zoff), 0, 1, 100, height / 2);

      let x = r * cos(a + map(spectrum[i] / 10, 0, 180, 100, 120));
      let y = r * sin(a + map(spectrum[i] / 10, 0, 180, 100, 120));
      // var R = point * 1.5;
      // var x = width / 2 + R * cos(radians((i * angle) / N + k));
      // var y = height / 2 + R * sin(radians((i * angle) / N + k));
      curveVertex(x, y);

      angle += 0.1;

    }
   }
  endShape(CLOSE);
  phase += 0.003;
  zoff += 0.01;

}
