// VISUAL
// Irregularities - force
// Color - temperature
// Time - seconds
// Rotation - gyro
// Position - accel

// MUSIC
// Chords - force
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
let accelY = "accel_y (m/s^2)";
let accelX = "accel_x (m/s^2)";
let motor, temperature, force, seconds, gyroscopeX;
const AMinorScale = ["A", "B", "C", "D", "E", "F", "G"];
let FChord, IChord, IIChord, IIIChord, IVChord, VChord;
let synthF, synthT, majorPart, melodyPart;
let highOctaveChords;
let mainChords = [];
let mainMelody = [];
let wave;
let prevNote;
let volume = -6;
let fft;
var resolution = 128;
var progress = 0;
let lfo;
let frequency;
var source;
var env;
let waveform;
let envelope;

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

  // CHORDS
  // FORCE - Main chords
  IChord = constructMajorChord(AMinorScale, 3, "A3");
  IIChord = constructMajorChord(AMinorScale, 3, "E4");
  IIIChord = constructMajorChord(AMinorScale, 4, "F3");
  IVChord = constructMajorChord(AMinorScale, 4, "D4");
  VChord = constructMajorChord(AMinorScale, 3, "G4");

  // // Set volume
  // vol = new Tone.Volume();

  // Set Low frequency oscilator
  lfo = new Tone.LFO("4n", 100, 2000);

  // Analyse frequency/amplitude of signal
  fft = new Tone.FFT();

  // Get waveform data of signal
  wave = new Tone.Waveform(resolution);

  // Create Envelope for visualisation
  env = new Tone.AmplitudeEnvelope();

  Tone.Transport.start();

  // Use a synth as an instrument to play chords
  synthMajor = new Tone.PolySynth(4, Tone.Synth, {
    volume: -10,
    oscillator: {
      type: "sawtooth",
    },
  })
    .connect(wave)
    .connect(fft)
    .connect(env)
    .toMaster();

  // Set the BPM (beats per minute)
  Tone.Transport.bpm.value = 0.6;

  // Progression or sequence
  constructForceChords();

  //Use part to encapsulate chords into single unit
  majorPart = new Tone.Part(function (time, note) {
    if (prevNote != note.note) {
      synthMajor.triggerAttackRelease(note.note, note.duration, time);
    }

    prevNote = note.note;
  }, mainChords).start(0);
}

function draw() {
  background(0);
  drawWaveform(wave, fft);
}