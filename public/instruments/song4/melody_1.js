// FORCE - Melody
let mainChords = [];
var effect1, effect2, effect3;

// ["Db", "Eb", "F", "Gb", "Ab", "Bb", "Cb", "Db"];

let I = "Db4";
let II = "Eb4";
let III = "F4";
let IV = "Gb4";
let V = "Ab4";
let VI = "Bb4";
let VII = "Cb5";
let VIII = "Db5";

function initializeMelody1() {
  constructMelodyChords();

  // Use a simple Synth as the instrument
  synthMelody = new Tone.Synth({
    volume: 1,
    oscillator: {
      type: "triangle3",
    },
  }).toMaster();

  melodyPart = new Tone.Part(function (time, note) {
    if (prevMelodyTone !== note.note) {
      synthMelody.triggerAttackRelease(note.note, note.duration, time);
      prevMelodyTone = note.note;
    }
  }, mainChords).start(0);
}

function constructMelodyChords() {
  for (let i = 0; i < force.length; i++) {
    defineMelodyChords(force[i], seconds[i]);
  }
}

function defineMelodyChords(value, seconds) {
   let newVal = map(parseInt(value), 6, 38, 0, 14);
  //  let newVal = map(parseInt(value), 5, 32, 0, 14);

  // 5 - 74

  if (newVal < 1) {
    mainChords.push({
      time: seconds,
      note: I,
      duration: "2n",
    });
  } else if (newVal > 1 && newVal <= 2) {
    mainChords.push({
      time: seconds,
      note: II,
      duration: "2n",
    });
  } else if (newVal > 2 && newVal <= 3) {
    mainChords.push({
      time: seconds,
      note: III,
      duration: "4n",
    });
  } else if (newVal > 3 && newVal <= 3.5) {
    mainChords.push({
      time: seconds,
      note: II,
      duration: "2n",
    });
  } else if (newVal > 3.5 && newVal <= 4) {
    mainChords.push({
      time: seconds,
      note: III,
      duration: "4n",
    });
  } else if (newVal > 4 && newVal <= 5) {
    mainChords.push({
      time: seconds,
      note: IV,
      duration: "4n",
    });
  } else if (newVal > 5 && newVal <= 5.5) {
    mainChords.push({
      time: seconds,
      note: V,
      duration: "8n",
    });
  } else if (newVal > 5.5 && newVal <= 6) {
    mainChords.push({
      time: seconds,
      note: IV,
      duration: "4n",
    });
  } else if (newVal > 6 && newVal <= 7.5) {
    mainChords.push({
      time: seconds,
      note: VI,
      duration: "8n",
    });
  } else if (newVal > 7.5 && newVal <= 8) {
    mainChords.push({
      time: seconds,
      note: V,
      duration: "8n",
    });
  } else if (newVal > 8 && newVal <= 8.5) {
    mainChords.push({
      time: seconds,
      note: VI,
      duration: "8n",
    });
  } else if (newVal > 8.5 && newVal <= 9) {
    mainChords.push({
      time: seconds,
      note: IV,
      duration: "8n",
    });
  } else if (newVal > 9 && newVal <= 10.5) {
    mainChords.push({
      time: seconds,
      note: V,
      duration: "8n",
    });
  } else if (newVal > 10.5 && newVal <= 11) {
    mainChords.push({
      time: seconds,
      note: VI,
      duration: "8n",
    });
  } else if (newVal > 11 && newVal <= 11.5) {
    mainChords.push({
      time: seconds,
      note: VII,
      duration: "8n",
    });
  } else if (newVal > 11.5 && newVal <= 12) {
    mainChords.push({
      time: seconds,
      note: VI,
      duration: "8n",
    });
  } else if (newVal > 12 && newVal <= 13) {
    mainChords.push({
      time: seconds,
      note: VII,
      duration: "8n",
    });
  } else if (newVal > 13 && newVal <= 13.5) {
    mainChords.push({
      time: seconds,
      note: VIII,
      duration: "8n",
    });
  } else if (newVal > 13.5 && newVal <= 14) {
    mainChords.push({
      time: seconds,
      note: VII,
      duration: "8n",
    });
  } else if (newVal > 14) {
    mainChords.push({
      time: seconds,
      note: VIII,
      duration: "8n",
    });
  } else {
    return;
  }
  return mainChords;
}
