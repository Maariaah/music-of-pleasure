// FORCE - Melody
let prevMelodyTone;
let lfo;
let mainChords = [];
var effect1, effect2, effect3;

// D E F# G A B C# (D)
let I = "D4";
let II = "E4";
let III = "F#4";
let IV = "G4";
let V = "A4";
let VI = "B4";
let VII = "C#5";
let VIII = "D5";

function initializeMelody1() {
  constructMelodyChords();

  // Use a simple Synth as the instrument
  synthMelody = new Tone.Synth({
    volume: 6,
    oscillator: {
      type: "triangle7",
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
  for (let i = 0; i < seconds.length; i++) {
    defineMelodyChords(force[i], seconds[i]);
  }
}

function defineMelodyChords(value, seconds) {
  let newVal = map(parseInt(value), 0, 63.5, 0, 14);

  // 0 - 63.5

  if (newVal < 1) {
    mainChords.push({
      time: seconds,
      note: I,
      duration: "1n",
    });
  }
   else if (newVal > 1 && newVal <= 2) {
    mainChords.push({
      time: seconds,
      note: II,
      duration: "1n",
    });
  } else if (newVal > 2 && newVal <= 3) {
    mainChords.push({
      time: seconds,
      note: III,
      duration: "1n",
    });
  } else if (newVal > 3 && newVal <= 5) {
    mainChords.push({
      time: seconds,
      note: II,
      duration: "2n",
    });
  } else if (newVal > 5 && newVal <= 6) {
    mainChords.push({
      time: seconds,
      note: III,
      duration: "2n",
    });
  } else if (newVal > 6 && newVal <= 8) {
    mainChords.push({
      time: seconds,
      note: IV,
      duration: "2n",
    });
  } else if (newVal > 8 && newVal <= 8.5 ) {
    mainChords.push({
      time: seconds,
      note: V,
      duration: "2n",
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
      duration: "16n",
    });
  } else if (newVal > 10.5 && newVal <= 11) {
    mainChords.push({
      time: seconds,
      note: VI,
      duration: "8n",
    });
  } else if (newVal > 11 && newVal <= 12) {
    mainChords.push({
      time: seconds,
      note: VII,
      duration: "16n",
    });
  } else if (newVal > 12.5 && newVal <= 13) {
    mainChords.push({
      time: seconds,
      note: VI,
      duration: "16n",
    });
  } else if (newVal > 13 && newVal <= 13.5) {
    mainChords.push({
      time: seconds,
      note: VIII,
      duration: "16n",
    });
  } else if (newVal > 13.5 && newVal <= 14) {
    mainChords.push({
      time: seconds,
      note: VII,
      duration: "32n",
    });
  } else if (newVal > 14) {
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
