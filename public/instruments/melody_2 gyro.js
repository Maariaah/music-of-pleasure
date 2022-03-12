// // FORCE - melody
// let prevMelody2Tone;
// let melody2Chords = [];
// let I2 = "B3";
// let II2 = "A4";
// let III2 = "Eb3";
// let IV2 = "Eb4";
// let V2 = "Bb4";
// let VI2 = "G4";
// let VII2 = "C5";

// function initializeMelody2() {
//   synthMajor = new Tone.Synth({
//     volume: 5,
//   }).toMaster();

//   // Progression or sequence
//   constructmelody2Chords();

//   //Use part to encapsulate chords into single unit
//   majorPart = new Tone.Part(function (time, note) {
//     let currentMelody2Tone = { note: note.note, duration: note.duration };
//     // Prevent playing a note if it is same as previous one
//     if (
//       JSON.stringify(prevMelody2Tone) !== JSON.stringify(currentMelody2Tone)
//     ) {
//       synthMajor.triggerAttackRelease(note.note, note.duration, time);
//     }
//     prevMelody2Tone = currentMelody2Tone;
//   }, melody2Chords).start(0);
// }

// function constructmelody2Chords() {
//   for (let i = 0; i < seconds.length; i++) {
//     definemelody2Chords(gyroscopeX[i], seconds[i]);
//   }
// }

// function definemelody2Chords(value, seconds) {
//   if (value < 1) {
//     melody2Chords.push({
//       time: seconds,
//       note: I2,
//       duration: "1n",
//     });
//   } else if (value > 1 && value <= 2) {
//     mainChords.push({
//       time: seconds,
//       note: II2,
//       duration: "4n",
//     });
//   } else if (value > 2 && value <= 3.5) {
//     mainChords.push({
//       time: seconds,
//       note: III2,
//       duration: "1n",
//     });
//   } else if (value > 3.5 && value <= 5.2) {
//     mainChords.push({
//       time: seconds,
//       note: II2,
//       duration: "4n",
//     });
//   } else if (value > 5.2 && value <= 7) {
//     mainChords.push({
//       time: seconds,
//       note: III2,
//       duration: "4n",
//     });
//   } else if (value > 7 && value <= 9) {
//     mainChords.push({
//       time: seconds,
//       note: IV2,
//       duration: "4n",
//     });
//   } else if (value > 9 && value <= 11) {
//     mainChords.push({
//       time: seconds,
//       note: V2,
//       duration: "8n",
//     });
//   } else if (value > 11 && value <= 13.5) {
//     mainChords.push({
//       time: seconds,
//       note: VI2,
//       duration: "8n",
//     });
//   } else if (value >  13.5 && value <= 15) {
//     mainChords.push({
//       time: seconds,
//       note: VII2,
//       duration: "8n",
//     });
//   } else if (value > 15 && value <= 19) {
//     mainChords.push({
//       time: seconds,
//       note: V2,
//       duration: "16n",
//     });
//   } else if (value > 19) {
//     mainChords.push({
//       time: seconds,
//       note: VI2,
//       duration: "16n",
//     });
//   } else {
//     melody2Chords.push({
//       time: seconds,
//       note: VII2,
//       duration: "16n",
//     });
//   }

//   return melody2Chords;
// }
