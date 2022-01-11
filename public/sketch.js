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
let FChord,
  FChord1,
  FChord2,
  FChord3,
  FChord4,
  FChord5,
  VFChord6,
  IVChord7,
  FChord8,
  VFChord9,
  GChord,
  GChord1,
  GChord2,
  GChord3,
  GChord4,
  GChord5,
  GChord6;

// I chord = A C E (minor)
// II chord is B D F (diminished)
// III chord = C E G# (augmented)
// IV chord = D F A (minor)
// V chord = E G# B (major)
// VI chord = F A C (major)
// VII chord = G# B D (diminished)

let synthF, synthT, forcePart, temperaturePart;
let highOctaveChords;
let mainChords = [];
let mainMelody = [];

async function preload() {
  data = await loadTable("./data/1483243201.csv", "csv", "header");
}

function setup() {
  createCanvas(600, 600);
  playButton = createButton("play");
  playButton.position(275, height / 2);
  playButton.mousePressed(playMelody);

  // Define data
  motor = data.getColumn(mtr);
  temperature = data.getColumn(temp);
  force = data.getColumn(fc);
  seconds = data.getColumn(s);
  gyroscopeX = data.getColumn(gyroX);

  // CHORDS
  // Force
  FChord = constructMajorChord(AMinorScale, 3, "A3");
  FChord1 = constructMajorChord(AMinorScale, 4, "A3");
  FChord2 = constructMajorChord(AMinorScale, 3, "B3");
  FChord3 = constructMajorChord(AMinorScale, 4, "B3");
  FChord4 = constructMajorChord(AMinorScale, 4, "C4");
  FChord5 = constructMajorChord(AMinorScale, 5, "C4");
  FChord6 = constructMajorChord(AMinorScale, 4, "D4");
  FChord7 = constructMajorChord(AMinorScale, 5, "D4");
  FChord8 = constructMajorChord(AMinorScale, 3, "G4");
  FChord9 = constructMajorChord(AMinorScale, 4, "G4");

  // Gyro
  // GChord = constructMajorChord(AMinorScale, 2, "A4");
  // GChord1 = constructMajorChord(AMinorScale, 3, "A4");
  // GChord2 = constructMajorChord(AMinorScale, 2, "F4");
  // GChord3 = constructMajorChord(AMinorScale, 3, "F4");
  // GChord4 = constructMajorChord(AMinorScale, 1, "G4");
  // GChord5 = constructMajorChord(AMinorScale, 2, "G4");
  // GChord6 = constructMajorChord(AMinorScale, 2, "D4");

  // Set the BPM (beats per minute)
  Tone.Transport.bpm.value = 50;

  // Create main chords and chord progressions - A minor scale

  //TEMPERATURE

  // Use a synth as an instrument to play chords
  synthF = new Tone.PolySynth(10, Tone.Synth, {
    volume: -6,
    oscillator: {
      type: "sawtooth",
    },
  }).toMaster();

  // Progression or sequence
  constructForceChords(mainChords);

  // Use part to encapsulate chords into single unit
  forcePart = new Tone.Part(function (time, note) {
    synthF.triggerAttackRelease(note.note, note.duration, time);
  }, mainChords).start(0);

  //TEMPERATURE - The main melody

  // Uses single notes instead of chords
  constructTemperatureChords(mainMelody);

  // Use a simple Synth as the instrument
  const synthT = new Tone.Synth({
    oscillator: {
      volume: 5,
      count: 3,
      spread: 40,
      type: "fatsawtooth",
    },
  }).toMaster();

  temperaturePart = new Tone.Part(function (time, note) {
    synthT.triggerAttackRelease(note.note, note.duration, time);
  }, mainMelody).start(0);
}

const addOctaveNumbers = (scale, octaveNumber) =>
  scale.map((note) => {
    const firstOctaveNoteIndex =
      scale.indexOf("C") !== -1 ? scale.indexOf("C") : scale.indexOf("C#");
    const noteOctaveNumber =
      scale.indexOf(note) < firstOctaveNoteIndex
        ? octaveNumber - 1
        : octaveNumber;
    return `${note}${noteOctaveNumber}`;
  });

const constructMajorChord = (scale, octave, rootNote) => {
  const scaleWithOctave = addOctaveNumbers(scale, octave);

  const getNexGChordNote = (note, nextNoteNumber) => {
    const nextNoteInScaleIndex =
      scaleWithOctave.indexOf(note) + nextNoteNumber - 1;
    let nextNote;
    if (typeof scaleWithOctave[nextNoteInScaleIndex] !== "undefined") {
      nextNote = scaleWithOctave[nextNoteInScaleIndex];
    } else {
      nextNote = scaleWithOctave[nextNoteInScaleIndex - 7];
      const updatedOctave = parseInt(nextNote.slice(1)) + 1;
      nextNote = `${nextNote.slice(0, 1)}${updatedOctave}`;
    }

    return nextNote;
  };

  const thirdNote = getNexGChordNote(rootNote, 3);
  const fifthNote = getNexGChordNote(rootNote, 5);
  const chord = [rootNote, thirdNote, fifthNote];

  return chord;
};

function constructForceChords(arr) {
  for (let i = 0; i < seconds.length; i++) {
    arr.push({
      time: seconds[i],
      note: defineForceChords(force[i]),
      duration: "4n",
    });
  }
}

function constructTemperatureChords(arr) {
  for (let i = 0; i < seconds.length; i++) {
    arr.push({
      time: seconds[i],
      note: defineTempChords(temperature[i] * 10),
      duration: "2n",
    });
  }
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
  background(0);
}

function playMelody() {
  if (Tone.Transport.state == "started") {
    Tone.Transport.stop();
    playButton.html("play");
  } else {
    Tone.Transport.start();
    playButton.html("stop");
  }
}
