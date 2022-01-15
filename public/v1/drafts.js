  // for (let i = 0; i < 360; i++) {
  //   // let x1 = map(i - 1, start, end, 0, w);
  //   // let y1 = map(buffer[i - 1], 0, 1, 10, 100);
  //   // let x2 = map(i, start, end, 0, w);
  //   // let y2 = map(buffer[i], -1, 1, 0, h);

  //   let r = map(buffer[start] / i, buffer[end], 1, 100, 300);
  //   let x = r * cos(i);
  //   let y = r * sin(i);
  //   vertex(x, y);

  //   if (buffer > 360) {
  //     buffer.splice(0, 1);
  //   }
  // }


  // for (let i = 1; i < buffer.length; i++) {
  //   if (buffer[i - 1] < 0 && buffer[i] >= 0) {
  //     start = i;
  //     break; // interrupts a for loop
  //   }
  // }

  // let end = start + buffer.length / 2;




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
// }

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