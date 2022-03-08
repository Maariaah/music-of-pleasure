// FORCE - Melody

let envelope;
let wave;
let prevNote;
let lfo;
let mainChords = [];
I = "F3";
II = "B3";
III = "E4";
IV = "F4";
V = "G4";
VI = "C5";

function initializeMelody1() {
  constructMelodyChords();

  // Use a simple Synth as the instrument
  synthMelody = new Tone.PolySynth({
    oscillator: {
      volume: 1,
      type: "sine",
    },
  }).toMaster();

  melodyPart = new Tone.Part(function (time, note) {
    if (prevNote !== note.note) {
      synthMelody.triggerAttackRelease(note.note, note.duration, time);
    }
    prevNote = note.note;
  }, mainChords).start(0);
}

function constructMelodyChords() {
  for (let i = 0; i < seconds.length; i++) {
    defineMelodyChords(force[i], seconds[i]);
  }
}

function defineMelodyChords(value, seconds) {
  // ['F3', 'A3', 'E4', 'C5', 'A5'];

  let newVal = parseInt(value);

  if (newVal > 13 && newVal <= 16) {
    mainChords.push({
      time: seconds,
      note: I,
      duration: "2n",
    });
  }
  if (newVal > 16 && newVal <= 19) {
    mainChords.push({
      time: seconds,
      note: I,
      duration: "4n",
    });
  } else if (newVal > 19 && newVal <= 21) {
    mainChords.push({
      time: seconds,
      note: II,
      duration: "4n",
    });
  } else if (newVal > 21 && newVal <= 21.5) {
    mainChords.push({
      time: seconds,
      note: II,
      duration: "6n",
    });
  } else if (newVal > 21.5 && newVal <= 25) {
    mainChords.push({
      time: seconds,
      note: III,
      duration: "6n",
    });
  } else if (newVal > 25 && newVal <= 26) {
    mainChords.push({
      time: seconds,
      note: III,
      duration: "8n",
    });
  } else if (newVal > 27 && newVal <= 29) {
    mainChords.push({
      time: seconds,
      note: IV,
      duration: "8n",
    });
  } else if (newVal > 29 && newVal <= 30) {
    mainChords.push({
      time: seconds,
      note: V,
      duration: "8n",
    });
  } else if (newVal > 30 && newVal <= 32.5) {
    mainChords.push({
      time: seconds,
      note: V,
      duration: "8n",
    });
  } else if (newVal > 32.5 && newVal <= 35) {
    mainChords.push({
      time: seconds,
      note: VI,
      duration: "8n",
    });
  } else if (newVal > 35 && newVal <= 38) {
    mainChords.push({
      time: seconds,
      note: V,
      duration: "8n",
    });
  } else if (newVal > 38 && newVal <= 40) {
    mainChords.push({
      time: seconds,
      note: VI,
      duration: "8n",
    });
  } else if (newVal > 40) {
    mainChords.push({
      time: seconds,
      note: V,
      duration: "8n",
    });
  } else {
    mainChords.push({
      time: seconds,
      note: I,
      duration: "2n",
    });
  }
  return mainChords;
}
