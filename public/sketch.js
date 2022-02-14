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
let Cmajor = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
let majorPart, melodyPart, kickPart, bassPart;
let note = 0;
let speed;
let green;
let blue;
let button;
let fft;
let fft2;
let env;
let waveform;
let synthMajor;
let analyser;
var beatThreshold = 0.02;
var defaultBPM = 120;
let beat;
let frequency;
let spectrum;
let scource;
let signal;

async function preload() {
  data = await loadTable("./data/odabrane/1574576287.csv", "csv", "header");
}

//interesting samples:
// old/1560888523
// User 05/1602286534
// User 05/1601942638

//1574576287
//Range:9-43

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

  env = new Tone.AmplitudeEnvelope();

  // Analyse frequency/amplitude of signal
  fft = new Tone.Analyser({
    size: 512,
    type: fft,
    smoothing: 2,
  });

  scource = new Tone.Source();
  signal = new Tone.Signal();
  waveform = new Tone.Waveform();

  Tone.Master.connect(waveform).connect(fft).connect(env);

  initializeForce();
  initializeAccelerator();
  initializeBass();

  // initializeDrums();
  // initializeGyro();

  // Set the BPM (beats per minute)
  Tone.Transport.bpm.value = 300;
}

function draw() {
  drawWaveform();

  // speed = Math.round(seconds[note]) * 100;

  // if (frameCount % speed === 0 || frameCount === 1) {
  //   note = (note + 1) % seconds.length;
  // }
  button = createButton("click me");
  button.position(0, 0);
  button.mousePressed(startSound);
}

function startSound() {
  Tone.Transport.start();
  getAudioContext().resume();
}
