// Reference: 
// https://p5js.org/reference/#/p5.Oscillator
// https://editor.p5js.org/whaleandpetunia/sketches/OXFFR4F1e
//https://www.youtube.com/watch?v=Bk8rLzzSink&ab_channel=TheCodingTrain
// https://www.youtube.com/watch?v=wUSva_BnedA&ab_channel=TheCodingTrain

let osc, env, playing, freq, amp, data;
let seconds = "seconds";
let temp = "temp (C)";
let force = "force (gF)";
let motor_percentage = "motor (%)";
let gyroX = "gyro_thx (deg/sec)";
let gyroY = "gyro_thy (deg/sec)";
let gyroZ = "gyro_thz (deg/sec)";
let accelY = "accel_y (m/s^2)";
let accelX = "accel_x (m/s^2)";
let headingEl;
let tempEl;
let tone_color = 300;
let tone_depth = 1200;

async function preload() {
  data = await loadTable("./data/1483243201.csv", "csv", "header");
}

async function setup() {
  createCanvas(600, 600);
  env = new p5.Env();
  osc = new p5.Oscillator("sine");
  forceEl = createSpan("");
  tempEl = createSpan("");
  secondsEl = createSpan("");

  env.setADSR(0.001, 0.5, 0.1, 0.5);
  env.setRange(1, 0);
  osc.start();

  // cycle through the table
  for (let c = 0; c < data.getRowCount(); c++) {
    // Write data
    forceEl.html(`Force: ${data.getColumn(force)[c]} </br>`);
    secondsEl.html(`Seconds: ${data.getColumn(seconds)[c]} </br>`);
    tempEl.html(`Temperature: ${data.getColumn(temp)[c]} </br>`);

    // Draw graphics

      drawSound(data.getColumn(temp)[c], data.getColumn(force)[c], c - 1);
     playSound(data.getColumn(temp)[c], data.getColumn(force)[c]);
    await sleep(250);
  }
}

function drawSound(temperature, force, time) {
  let forcePosition = (width / 1000) * force * 4;
  let timePosition = (width / 200 / 12) * time * 4;
  let x = (forcePosition + timePosition) * 1.3;
  let y = map(force / 2, 0, 100, height, 0) / 2;
  let c = color(temperature * 50, 0 ,(temperature * 50) - temperature);
  fill(c);
  ellipse(x, y, temperature * 3);
  noStroke();
}

function playSound(temperature, force) {
  // set attackTime, decayTime, sustainRatio, releaseTime
  env.setADSR(0.001, 0.5, 0.1, 0.5);
  env.setRange(1, 0);
  osc.start();

  let freq = map(1, 50, 500, 300, 1200); //Ucestalost ponavljanja, izmedju 100 i 1200
  let amp = map(force, 0, 100, 200, 1600); // Jacina oscilacije

  osc.freq(freq);
  osc.amp(amp);
}

async function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
