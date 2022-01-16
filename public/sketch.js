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
const AMinorScale = ["A", "B", "C", "D", "E", "F", "G"];
let synthF, synthT, majorPart, melodyPart;
let note = 0;
let speed;

async function preload() {
  data = await loadTable("./data/1483243201.csv", "csv", "header");
}

function setup() {
  createCanvas(500, 600);
  angleMode(DEGREES);

  // Define data
  motor = data.getColumn(mtr);
  temperature = data.getColumn(temp);
  force = data.getColumn(fc);
  seconds = data.getColumn(s);
  gyroscopeX = data.getColumn(gyroX);
  acceleratorX = data.getColumn(accX);
  acceleratorY = data.getColumn(accY);

  // Set the BPM (beats per minute)
  Tone.Transport.bpm.value = 150;

  // initializeForce();
  // initializeAccelerator();
  //initializeDrums();
  //initializeGyro();
  initializeBass();

  Tone.Transport.start();
}

function draw() {
  speed = Math.round(seconds[note] * 1000);

  if (frameCount % speed === 0 || frameCount === 1) {
    note = (note + 1) % seconds.length;
  }

  defineColor();
  drawWaveform(wave, fft, temperature);
}
