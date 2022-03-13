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
//https://tone-demos.glitch.me/
//PIANO DEMO:
//https://modulovalue.com/tonejs_meets_flutterweb/#/
//https://www.guitarland.com/MusicTheoryWithToneJS/Presets-gh-pages/

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
let accZ = "accel_z (m/s^2)";
let motor, temperature, force, seconds, gyroscopeX;
let Cmajor = ["C", "D", "E", "F", "G", "A", "B", "C"];
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
var defaultBPM = 350;
let beat;
let frequency;
let spectrum;
let scource;
let signal;
var w, h;
let space_between_lines;
let player;

async function preload() {
  data = await loadTable("./data/1580252966.csv", "csv", "header");
}
//1574576287
//Force range: 9-43

//1580252966
//Force range: 9-48
//GyroX range: 30 - -20
//GyroY range: -15 - 0
//AcceleratorX range: 0 - 10

function setup() {
  createCanvas(800, 600);
  colorMode(HSB);
  w = windowWidth / 2;
  h = windowHeight / 2;
  space_between_lines = width / 2 / 64;

  // Define data
  motor = data.getColumn(mtr);
  temperature = data.getColumn(temp);
  force = data.getColumn(fc);
  seconds = data.getColumn(s);
  gyroscopeX = data.getColumn(gyroX);
  gyroscopeY = data.getColumn(gyroY);
  acceleratorX = data.getColumn(accX);
  acceleratorY = data.getColumn(accY);
  acceleratorZ = data.getColumn(accZ);
  env = new Tone.AmplitudeEnvelope();

  // Analyse frequency/amplitude of signal
  fft = new Tone.Analyser({
    size: 512,
    type: fft,
  });

  scource = new Tone.Source();
  signal = new Tone.Signal();
  waveform = new Tone.Waveform({
    size: 512,
  });

  playInstruments();

  Tone.Master.connect(waveform).connect(fft).connect(env);
  // Set the BPM (beats per minute)
  Tone.Transport.bpm.value = defaultBPM;
}

function draw() {
  // defineColor();
  drawWaveform();

  button = createButton("click me");
  button.position(0, 0);
  button.mousePressed(startSound);

  /*** Chrome autoplay on gesture bug ***/
  // https://github.com/Tonejs/Tone.js/issues/341
  document.documentElement.addEventListener("mousedown", function () {
    if (Tone.context.state !== "running") {
      Tone.context.resume();
    }
  });
}

function startSound() {
  Tone.Transport.start();
  player.start();

  getAudioContext().resume();
}
