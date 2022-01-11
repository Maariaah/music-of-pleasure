// Reference:
// https://p5js.org/reference/#/p5.Oscillator
// https://editor.p5js.org/whaleandpetunia/sketches/OXFFR4F1e
// https://www.youtube.com/watch?v=Bk8rLzzSink&ab_channel=TheCodingTrain
// https://www.youtube.com/watch?v=wUSva_BnedA&ab_channel=TheCodingTrain

// VISUAL
// Irregularities - force
// Color - temperature
// Size -
// Time - seconds
// Rotation - gyro
// Position - accel

// MUSIC
// Chords - force
// Background tone - gyroscope position
// Background tone - accelerator position

let oscForce,
  envForce,
  oscGyro,
  envGyro,
  playing,
  freq,
  amp,
  data,
  fft,
  spectrum;
let s = "seconds";
let temp = "temp (C)";
let fc = "force (gF)";
let mtr = "motor (%)";
let gyroX = "gyro_thx (deg/sec)";
let gyroY = "gyro_thy (deg/sec)";
let gyroZ = "gyro_thz (deg/sec)";
let accelY = "accel_y (m/s^2)";
let accelX = "accel_x (m/s^2)";
let midiValue;
let freqValue;
let motor;
let temperature;
let force;
let time;
let note = 0;
let shapeNoiseDensity;
let shapePositionX;
let shapeHeight;
let r;
let g;
let b;
let colorHue;
let irregularity = 10;
let baseRadius = 300;
let noiseScale = 1;
let valueChanged;

async function preload() {
  data = await loadTable("./data/1483243201.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Force
  envForce = new p5.Env();
  oscForce = new p5.Oscillator("sine"); // 'triangle', 'sawtooth', 'square'
  // set attackTime, decayTime, sustainRatio, releaseTime
  envForce.setADSR(0.01, 0.5, 0.2, 1.2);
  envForce.setRange(5, 0);
  oscForce.start();

  // GyroscopeX
  envGyro = new p5.Env();
  oscGyro = new p5.Oscillator("triangle");
  envGyro.setADSR(0.001, 1, 1, 2);
  envGyro.setRange(5, 0);
  oscGyro.start();
  fft = new p5.FFT();
  spectrum = fft.analyze();
}

function draw() {
  motor = data.getColumn(mtr);
  temperature = data.getColumn(temp);
  force = data.getColumn(fc);
  seconds = data.getColumn(s);
  gyroscopeX = data.getColumn(gyroX);

  playForce();
  playGyro();
  drawMusic();
  defineColor();

  text(seconds[note], 10, 10 * note);

  function playForce() {
    // Everytime force value changes the tone is played
    let speed = Math.round(seconds[note] * 1000);
    if (frameCount % speed === 0 || frameCount === 1) {
      midiValue = force[note] / 1.4;
      freqValue = midiToFreq(midiValue);
      oscForce.freq(freqValue);
      envForce.play(oscForce, 0, 0.1);
      note = (note + 1) % seconds.length;
      playGyro();
    }
  }

  function playGyro() {
    midiValue = gyroscopeX[note] / 1.4;
    freqValue = midiToFreq(midiValue);
    oscGyro.freq(freqValue);
    envGyro.play(oscGyro, 0, 0.1);
  }

  function drawMusic() {
    colorHue = color(`rgb(${r}%, ${g}%,${b}%)`);
    irregularity = freqValue;

    fill(255, 255, 255, 10);
    noStroke();
    rect(0, 0, width, height);

    // shift shape to middle of canvas
    translate(width / 2, height / 2);
    //rotate(gyroscopeX[note])

    noFill();
    strokeWeight(2);
    stroke(colorHue);
    // create irregular circle
    for (let j = 0; j < 4; j++) {
      beginShape();

      for (let i = 0; i < 50; i += TWO_PI / irregularity) {
        let x = cos(i);
        let y = sin(i);
        let randomNoise = noise(
          (x + 5) * noiseScale,
          y * noiseScale,
          frameCount / (400 - freqValue) //speed
        );
        let radius = baseRadius * randomNoise;
        curveVertex(radius * x, radius * y + 10 * j);
      }
      endShape();
    }
  }

  function defineColor() {
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
      let currentDegree = parseInt(temperature[note] * 10);

      let percent = (currentDegree - tempLowest) / (tempHighest - tempLowest);
      newRange = percent * (colorHighest - colorLowest) + colorLowest;
    }

    getRange(temperature);
    convertRange();
    r = newRange * 6;
    g = 30;
    b = 30;
  }

  function setSpeed(array, callback) {
    for (var i = 0; i < array.length - 1; i++) {
      if (array[i] !== array[i + 1]) {
        callback();
      }
    }
  }
}
