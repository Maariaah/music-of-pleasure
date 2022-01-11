// Reference:
// https://p5js.org/reference/#/p5.Oscillator
// https://editor.p5js.org/whaleandpetunia/sketches/OXFFR4F1e
// https://www.youtube.com/watch?v=Bk8rLzzSink&ab_channel=TheCodingTrain
// https://www.youtube.com/watch?v=wUSva_BnedA&ab_channel=TheCodingTrain

// Visual
// Position of particles - force
// Color - temperature
// Size -
// Time - seconds
// Rotation - gyro

// Music
// Chords - force
// Background tone - motor

let osc, env, playing, freq, amp, data, fft, spectrum;
let s = "seconds";
let temp = "temp (C)";
let fc = "force (gF)";
let mtr = "motor (%)";
let gyroX = "gyro_thx (deg/sec)";
let gyroY = "gyro_thy (deg/sec)";
let gyroZ = "gyro_thz (deg/sec)";
let accelY = "accel_y (m/s^2)";
let accelX = "accel_x (m/s^2)";
let motor;
let temperature;
let force;
let time;
let note = 0;
let speed = 50;
let shapeNoiseDensity;
let shapePositionX;
let shapeHeight;
let r;
let g;
let b;
let frame;

async function preload() {
  data = await loadTable("./data/1483243201.csv", "csv", "header");
}

function setup() {
  createCanvas(500, 500);
  env = new p5.Env();
  osc = new p5.Oscillator("sine");

  // set attackTime, decayTime, sustainRatio, releaseTime
  env.setADSR(0.001, 0.5, 0.1, 0.5);
  env.setRange(5, 0);
  osc.start();
  fft = new p5.FFT();
  spectrum = fft.analyze();

  noStroke();
}

function draw() {
  motor = data.getColumn(mtr);
  temperature = data.getColumn(temp);
  force = data.getColumn(fc);
  seconds = data.getColumn(s);
  frame = frameCount;
  //background(0);
  stroke(255);
  strokeWeight(0.7);
  noFill();

  translate(width / 2, height / 2);
  rotate(-frame * 0.001);

  playMusic();
  drawMusic();

  function playMusic() {
    // TODO - play the tone every time force value changes

    if (frameCount % speed === 0 || frameCount === 1) {
      let midiValue = force[note] / 1.4;
      let freqValue = midiToFreq(midiValue);
      osc.freq(freqValue);
      env.play(osc, 0, 0.1);
      note = (note + 1) % force.length;
      defineColor(temperature[note]);
      text(spectrum.length, 10, 10 * note);

      // for (let i = 0; i < spectrum.length; i++) {
      //   let x = map(i, 0, spectrum.length / 20, 0, width);
      //   let h = map(spectrum[i], 0, 255, 0, height / 2);
      //   shapeNoiseDensity = spectrum.length / 10;
      //   shapePositionX = x;
      //   shapeHeight = h;
      // }
    }
  }

  function drawMusic() {

    for (let rad = 0; rad < TWO_PI; rad += map(22, 0, width, 0.02, 0.1)) {
      fill(`rgb(${r}%, ${g}%,${b}%)`);
      push();
      rotate(rad);

      // Kill noise at start/end so they don't overlap.
      let weight = 20;
      if (rad < QUARTER_PI) {
        weight = map(rad, 0, QUARTER_PI, 0, 1);
      } else if (rad > TWO_PI - QUARTER_PI) {
        weight = map(rad, TWO_PI - QUARTER_PI, TWO_PI, 1, 0);
      }

      let n1 = map(noise(frame * 0.001 + rad), 0, 1, -2, 2) * weight;
      let n2 = map(noise((1000 + frame) * 0.001 + rad), 0, 1, -2, 2) * weight;

      beginShape();
      curveVertex(0, 0);
      curveVertex(sin(frame * 0.04 - 5 + n1) * 25, 100);
      curveVertex(cos(frame * 0.04 - 2.5 + n2) * 50, 200);
      curveVertex(sin(frame * 0.04 + n1) * 75, 300);
      curveVertex(0, 400);
      curveVertex(0, 500);
      endShape();
      pop();
    }
  }

  function defineColor(deg) {
    //Get temperature highest and lowest values
    let lowest;
    let highest;
    let colorLowest = 0;
    let colorHighest = 100;
    let newRange;

    function getRange(arr) {
      highest = arr.sort((a, b) => b - a)[0];
      lowest = arr.sort((a, b) => a - b)[0];
    }

    // https://intellipaat.com/community/33375/convert-a-number-range-to-another-range-maintaining-the-ratio

    // Resrict values within the range
    function convertRange() {
      let tempLowest = parseInt(lowest * 10);
      let tempHighest = parseInt(highest * 10);
      let currentDegree = parseInt(deg * 10);

      let percent = (currentDegree - tempLowest) / (tempHighest - tempLowest);
      newRange = percent * (colorHighest - colorLowest) + colorLowest;
    }

    getRange(temperature);
    convertRange();
    r = newRange * 6;
    g = 30;
    b = 30;
  }
}
