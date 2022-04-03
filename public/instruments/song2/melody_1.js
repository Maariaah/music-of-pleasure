// FORCE - Melody
let mainChords = [];
var effect1, effect2, effect3;

let I = "Eb4";
let II = "F4";
let III = "G4";
let IV = "Ab4";
let V = "Bb4";
let VI = "C5";
let VII = "D5";
let VIII = "Eb5";

// let I = "Cb4";
// let II = "D4";
// let III = "E4";
// let IV = "Fb4";
// let V = "Gb4";
// let VI = "A5";
// let VII = "B5";
// let VIII = "Cb5";

function initializeMelody1() {
  constructMelodyChords();

  // create effects

  // Use a simple Synth as the instrument
  synthMelody = new Tone.Synth({
    volume: 1,
    oscillator: {
      type: "square6",
      // type: "amsawtooth5", 
      // type: "fmsawtooth5",
      // type: "square6",
    },
  }).toMaster();

  melodyPart = new Tone.Part(function (time, note) {
    window.note = window.note + 1;

    if (prevMelodyTone !== note.note) {
      // synthMelody.triggerAttackRelease(note.note, note.duration, time);
      prevMelodyTone = note.note;
    }
  }, mainChords).start(0);
}

function constructMelodyChords() {
  for (let i = 0; i < seconds.length; i++) {
    defineMelodyChords(force[i], seconds[i]);
  }
}

function defineMelodyChords(value, seconds) {
  let newVal = parseInt(value);

  // 7.5 - 53.5

  if (newVal < 7.5) {
    mainChords.push({
      time: seconds,
      note: I,
      duration: "1n",
    });
  }
  else if (newVal > 7.5 && newVal <= 10) {
    mainChords.push({
      time: seconds,
      note: II,
      duration: "1n",
    });
  } else if (newVal > 10 && newVal <= 15) {
    mainChords.push({
      time: seconds,
      note: III,
      duration: "1n",
    });
  } else if (newVal > 20 && newVal <= 25) {
    mainChords.push({
      time: seconds,
      note: II,
      duration: "2n",
    });
  } else if (newVal > 27.5 && newVal <= 30) {
    mainChords.push({
      time: seconds,
      note: III,
      duration: "2n",
    });
  } else if (newVal > 30 && newVal <= 32.5) {
    mainChords.push({
      time: seconds,
      note: IV,
      duration: "2n",
    });
  } else if (newVal > 32.5 && newVal <= 35) {
    mainChords.push({
      time: seconds,
      note: V,
      duration: "2n",
    });
  } else if (newVal > 35 && newVal <= 37) {
    mainChords.push({
      time: seconds,
      note: IV,
      duration: "8n",
    });
  } else if (newVal > 37 && newVal <= 40) {
    mainChords.push({
      time: seconds,
      note: V,
      duration: "16n",
    });
  } else if (newVal > 40 && newVal <= 42.5) {
    mainChords.push({
      time: seconds,
      note: VI,
      duration: "8n",
    });
  } else if (newVal > 42.5 && newVal <= 45) {
    mainChords.push({
      time: seconds,
      note: VII,
      duration: "16n",
    });
  } else if (newVal > 45 && newVal <= 47.5) {
    mainChords.push({
      time: seconds,
      note: VI,
      duration: "16n",
    });
  } else if (newVal > 47.5 && newVal <= 50) {
    mainChords.push({
      time: seconds,
      note: VIII,
      duration: "16n",
    });
  } else if (newVal > 50 && newVal <= 52.5) {
    mainChords.push({
      time: seconds,
      note: VII,
      duration: "32n",
    });
  } else if (newVal > 52.5) {
    mainChords.push({
      time: seconds,
      note: VIII,
      duration: "32n",
    });
  } else {
    mainChords.push({
      time: seconds,
      note: IV,
      duration: "4n",
    });
  }
  return mainChords;
}
