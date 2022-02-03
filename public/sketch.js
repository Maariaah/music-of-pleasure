// VISUAL
// Irregularities - force
// Color - temperature
// Time - seconds
// Rotation - gyro
// Position - accel

// MUSIC
// Main Chords - force
// Main melody - temperature
// Drums - gyroscope position
// Bass - accelerator position

// https://www.devbridge.com/articles/tonejs-coding-music-production-guide/
// https://www.guitarland.com/MusicTheoryWithToneJS/PlayChords.html
//  https://www.guitarland.com/MusicTheoryWithToneJS/PlayMinorScales.html
// [1,2,3,4,5,6,7,8] - Oktave, visina tona
// ["A", "B", "C", "D", "E", "F", "G"] - Tonovi, akordi
// [FChord1, FChord2] - Triade
// synth.triggerAttackRelease('C4', '8n') - note C on the 4th octave, 8th note

let playButton;
let s = "seconds";
let temp = "temp (C)";
let fc = "force (gF)";
let mtr = "motor (%)";
let gyroX = "gyro_thx (deg/sec)";
let gyroY = "gyro_thy (deg/sec)";
let gyroZ = "gyro_thz (deg/sec)";
let accY = "accel_y (m/s^2)";
let accX = "accel_x (m/s^2)";
let motor, temperature, force, seconds, gyroscopeX;
const Cmajor = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
let majorPart, melodyPart, kickPart, bassPart;
let note = 0;
let speed;
let red;
let green;
let blue;

async function preload() {
  data = await loadTable("./data/User 05/1601942638.csv", "csv", "header");
}

//interesting samples:
// old/1560888523
// User 05/1602286534
// User 05/1601942638
// User 05/ 1601942638

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);

  // Define data
  motor = data.getColumn(mtr);
  temperature = data.getColumn(temp);
  force = data.getColumn(fc);
  seconds = data.getColumn(s);
  gyroscopeX = data.getColumn(gyroX);
  acceleratorX = data.getColumn(accX);
  acceleratorY = data.getColumn(accY);
  defineColor();
  // background(red, green, blue);

   initializeForce();
   initializeAccelerator();
  // initializeDrums();
  // initializeGyro();
  // initializeBass();

  // Set the BPM (beats per minute)
  Tone.Transport.bpm.value = 60;

  Tone.Transport.start();
}

function draw() {
  //background('red')
  // speed = Math.round(seconds[note]) * 100;

  // if (frameCount % speed === 0 || frameCount === 1) {
  //   note = (note + 1) % seconds.length;
  // }

  drawWaveform();
}
