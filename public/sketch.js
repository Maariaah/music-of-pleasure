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

async function preload() {
  data = await loadTable("./data/1483243201.csv", "csv", "header");
}

function setup() {
  createCanvas(400, 400);

  // Define data
  motor = data.getColumn(mtr);
  temperature = data.getColumn(temp);
  force = data.getColumn(fc);
  seconds = data.getColumn(s);
  gyroscopeX = data.getColumn(gyroX);

  // CHORDS

  // TEMPERATURE
  IChord = constructMajorChord(AMinorScale, 3, "A3");
  IIChord = constructMajorChord(AMinorScale, 3, "E4");
  IIIChord = constructMajorChord(AMinorScale, 4, "F3");
  IVChord = constructMajorChord(AMinorScale, 4, "D4");
  VChord = constructMajorChord(AMinorScale, 3, "G4");

  // Set the BPM (beats per minute)
  Tone.Transport.bpm.value = 1;
  Tone.Transport.start();

  // FORCE - The main chords
  // Use a synth as an instrument to play chords
  synthMajor = new Tone.PolySynth(4, Tone.Synth, {
    volume: -6,
    oscillator: {
      type: "sawtooth",
    },
  }).toMaster();

  // Progression or sequence
  constructForceChords();

  //Use part to encapsulate chords into single unit
  majorPart = new Tone.Part(function (time, note) {
    synthMajor.triggerAttackRelease(note.note, note.duration, time);
  }, mainChords).start(0);

  //TEMPERATURE - The main melody

  // Uses single notes instead of chords
  // constructTemperatureChords(mainMelody);

  // Use a simple Synth as the instrument
  // const synthT = new Tone.Synth({
  //   oscillator: {
  //     volume: 5,
  //     count: 3,
  //     spread: 40,
  //     type: "sine",
  //   },
  // }).toMaster();

  // melodyPart = new Tone.Part(function (time, note) {
  //   synthT.triggerAttackRelease(note.note, note.duration, time);
  // }, mainMelody).start(0);
}

// const mainChordPart = new Tone.PolySynth(5, Tone.Synth, {
//   oscillator: {
//     count: 6,
//     spread: 80,
//     type: "fatsawtooth",
//   },
// }).toMaster();

// const highSynth = new Tone.PolySynth(5, Tone.Synth, {
//   volume: -16,
//   count: 6,
//   spread: 80,
//   oscillator: {
//     type: "fatsawtooth",
//   },
// }).toMaster();

// highOctaveChords = [
//   { time: 0, note: FChord1, duration: "2n." },
//   { time: "0:3", note: VChord1, duration: "4n" },
//   { time: "1:0", note: VFChord1, duration: "2n." },
//   { time: "1:3", note: VChord1, duration: "4n" },
//   { time: "2:0", note: IVChord1, duration: "2n." },
//   { time: "2:3", note: VChord1, duration: "4n" },
//   { time: "3:0", note: VFChord1, duration: "2n" },
//   { time: "3:2", note: VChord1, duration: "4n" },
//   { time: "3:3", note: IVChord1, duration: "4n" },
//   { time: "4:0", note: FChord1, duration: "2n." },
//   { time: "4:3", note: VChord1, duration: "4n" },
//   { time: "5:0", note: VFChord1, duration: "2n." },
//   { time: "5:3", note: VChord1, duration: "4n" },
//   { time: "6:0", note: IVChord1, duration: "2n." },
//   { time: "6:3", note: VChord1, duration: "4n" },
//   { time: "7:0", note: VFChord1, duration: "2n" },
//   { time: "7:2", note: VChord1, duration: "4n" },
//   { time: "7:3", note: IVChord1, duration: "4n" },
// ];

// const highOctaveChordPart = new Tone.Part(function (time, note) {
//   highSynth.triggerAttackRelease(note.note, note.duration, time, 0.5);
// }, highOctaveChords).start(0);

// const lowPass = new Tone.Filter({
//   frequency: 8000,
// }).toMaster();

// const snareDrum = new Tone.NoiseSynth({
//   noise: {
//     type: "white",
//     playbackRate: 3,
//   },
//   envelope: {
//     attack: 0.001,
//     decay: 0.2,
//     sustain: 0.15,
//     release: 0.03,
//   },
// }).connect(lowPass);

// const snares = [
//   { time: "0:2" },
//   { time: "1:2" },
//   { time: "2:2" },
//   { time: "3:2" },
//   { time: "4:2" },
//   { time: "5:2" },
//   { time: "6:2" },
//   { time: "7:2" },
// ];

// const snarePart = new Tone.Part(function (time) {
//   snareDrum.triggerAttackRelease("4n", time);
// }, snares).start(0);

// const kickDrum = new Tone.MembraneSynth({
//   volume: 6,
// }).toMaster();

// const kicks = [
//   { time: "0:0" },
//   { time: "0:3:2" },
//   { time: "1:1" },
//   { time: "2:0" },
//   { time: "2:1:2" },
//   { time: "2:3:2" },
//   { time: "3:0:2" },
//   { time: "3:1:" },
//   { time: "4:0" },
//   { time: "4:3:2" },
//   { time: "5:1" },
//   { time: "6:0" },
//   { time: "6:1:2" },
//   { time: "6:3:2" },
//   { time: "7:0:2" },
//   { time: "7:1:" },
// ];

// const kickPart = new Tone.Part(function (time) {
//   kickDrum.triggerAttackRelease("C1", "8n", time);
// }, kicks).start(0);

// const bassline = [
//   { time: 0, note: "A0", duration: "2n" },
//   { time: "0:3", note: "F0", duration: "2n." },
//   { time: "1:3", note: "D0", duration: "2n." },
//   { time: "2:3", note: "F0", duration: "1:1" },
// ];

// const bass = new Tone.Synth({
//   oscillator: {
//     type: "triangle",
//   },
// }).toMaster();

// const bassPart = new Tone.Part(function (time, note) {
//   bass.triggerAttackRelease(note.note, note.duration, time);
// }, bassline).start(0);

function draw() {
  if (Tone.Transport.state === "started") {
    defineColor();
    drawMusic();
  }
}
