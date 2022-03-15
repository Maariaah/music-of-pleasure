// FORCE - Melody
let prevMelodyTone;
let lfo;
let mainChords = [];
var effect1, effect2, effect3;
let picksCount = 0;
I = "B2";
II = "D3";
III = "E3";
IV = "F4";
V = "G4";
VI = "A4";
VII = "B5";
VIII = "C5";

function initializeMelody1() {
  constructMelodyChords();

  // create effects
  let effect1 = new Tone.AutoFilter({
    frequency: 852,
    octaves: 0.2,
    Q: 2,
    baseFrequency: 396,
    wet: 0.6,
  }).toMaster();

  // Use a simple Synth as the instrument
  synthMelody = new Tone.Synth({
    volume: -5,
    oscillator: {
      type: "fatcustom",
      partials: [0.2, 1, 0, 0.5, 0.1],
      spread: 40,
      count: 3,
    },
    envelope: {
      attack: 0.001,
      decay: 1.6,
      sustain: 0,
      release: 1.6,
    },
  })
    .connect(effect1)
    .toMaster();

  melodyPart = new Tone.Part(function (time, note) {
    // let currentMelodyTone = { note: note.note, duration: note.duration };
    // if (JSON.stringify(prevMelodyTone) !== JSON.stringify(currentMelodyTone)) {
    //   synthMelody.triggerAttackRelease(note.note, note.duration, time);
    // }

    let picks = ["B2", "D3", "E3", "F4", "G4", "A4", "B5", "C4"];

    if (prevMelodyTone !== note.note) {
      synthMelody.triggerAttackRelease(note.note, note.duration, time);
      prevMelodyTone = note.note;
    } else {
      for (let i = 0; i < picks.length; i++) {
        if (picks[i] === note.note) {
          if (picksCount < 2) {
            synthMelody.triggerAttackRelease(picks[i - 1], note.duration, time);
            prevMelodyTone = picks[i - 1];
            picksCount++;
          } else {
            // synthMelody.triggerAttackRelease(picks[i + 1], note.duration, time);
            // prevMelodyTone = picks[i + 1];
            picksCount = picksCount < 5 && 0;
          }
        }
      }
    }

    // prevMelodyTone = currentMelodyTone;
  }, mainChords).start(0);
}

function constructMelodyChords() {
  for (let i = 0; i < seconds.length; i++) {
    defineMelodyChords(force[i], seconds[i]);

    let value = Number(seconds[i]);
  }
}

function defineMelodyChords(value, seconds) {
  let newVal = map(parseInt(value), 9, 48, 0, 10);
  // 12-40
  if (newVal < 0) {
    mainChords.push({
      time: seconds,
      note: I,
      duration: "1n.",
    });
  } else if (newVal > 0 && newVal <= 1) {
    mainChords.push({
      time: seconds,
      note: II,
      duration: "1n.",
    });
  } else if (newVal > 1 && newVal <= 2) {
    mainChords.push({
      time: seconds,
      note: II,
      duration: "2n.",
    });
  } else if (newVal > 2 && newVal <= 3) {
    mainChords.push({
      time: seconds,
      note: III,
      duration: "2n.",
    });
  } else if (newVal > 3 && newVal <= 4) {
    mainChords.push({
      time: seconds,
      note: III,
      duration: "2n.",
    });
  } else if (newVal > 4 && newVal <= 5) {
    mainChords.push({
      time: seconds,
      note: IV,
      duration: "2n.",
    });
  } else if (newVal > 5 && newVal <= 6) {
    mainChords.push({
      time: seconds,
      note: V,
      duration: "2n",
    });
  } else if (newVal > 6 && newVal <= 7) {
    mainChords.push({
      time: seconds,
      note: VI,
      duration: "4n",
    });
  } else if (newVal > 7 && newVal <= 8) {
    mainChords.push({
      time: seconds,
      note: IV,
      duration: "16n",
    });
  } else if (newVal > 8 && newVal <= 9) {
    mainChords.push({
      time: seconds,
      note: V,
      duration: "16n",
    });
  } else if (newVal > 9 && newVal <= 10) {
    mainChords.push({
      time: seconds,
      note: VI,
      duration: "32n",
    });
  } else if (newVal > 10) {
    mainChords.push({
      time: seconds,
      note: VIII,
      duration: "32n",
    });
  } else {
    mainChords.push({
      time: seconds,
      note: V,
      duration: "1n + 4n",
    });
  }
  return mainChords;
}
