// FORCE - Melody
let prevMelodyTone;
let lfo;
let mainChords = [];
var effect1, effect2, effect3;

I = "C3";
II = "E3";
III = "B3";
IV = "C4";
V = "G4";
VI = "B4";
VII = "C5";

function initializeMelody1() {
  constructMelodyChords();

  // create effects
  let effect1 = new Tone.AutoFilter({
    frequency: 8,
    octaves: 0.2,
    Q: 2,
    baseFrequency: 700,
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
    // envelope: {
    //   attack: 0.001,
    //   decay: 1.6,
    //   sustain: 0,
    //   release: 1.6,
    // },
  })
    .connect(effect1)
    .toMaster();

  melodyPart = new Tone.Part(function (time, note) {
    // let currentMelodyTone = { note: note.note, duration: note.duration };
    // if (JSON.stringify(prevMelodyTone) !== JSON.stringify(currentMelodyTone)) {
    //   synthMelody.triggerAttackRelease(note.note, note.duration, time);
    // }


    if (prevMelodyTone !== note.note) {
      synthMelody.triggerAttackRelease(note.note, note.duration, time);
      prevMelodyTone = note.note;
    }
  }, mainChords).start(0);
}

function constructMelodyChords() {
  for (let i = 0; i < seconds.length; i++) {
    defineMelodyChords(force[i], seconds[i]);

    let value = Number(seconds[i]);
  }
}

function defineMelodyChords(value, seconds) {
  let newVal = parseInt(value);

   if (newVal > 8 && newVal <= 10) {
    mainChords.push({
      time: seconds,
      note: I,
      duration: "2n",
    });
  } else if (newVal > 10 && newVal <= 12) {
    mainChords.push({
      time: seconds,
      note: II,
      duration: "2n",
    });
  } else if (newVal > 12 && newVal <= 22) {
    mainChords.push({
      time: seconds,
      note: III,
      duration: "2n",
    });
  } else if (newVal > 22 && newVal <= 26) {
    mainChords.push({
      time: seconds,
      note: III,
      duration: "2n",
    });
    mainChords.push({
      time: seconds,
      note: IV,
      duration: "4n",
    });
  } else if (newVal > 26 && newVal <= 29) {
    mainChords.push({
      time: seconds,
      note: IV,
      duration: "4n",
    });
    mainChords.push({
      time: seconds,
      note: V,
      duration: "8n",
    });
  } else if (newVal > 29 && newVal <= 30) {
    mainChords.push({
      time: seconds,
      note: V,
      duration: "8n",
    });
    mainChords.push({
      time: seconds,
      note: VI,
      duration: "16n",
    });
  } else if (newVal > 30 && newVal <= 32.5) {
    mainChords.push({
      time: seconds,
      note: VI,
      duration: "16n",
    });
    mainChords.push({
      time: seconds,
      note: VII,
      duration: "16n",
    });

  } else if (newVal > 32.5 && newVal <= 35) {
    mainChords.push({
      time: seconds,
      note: VI,
      duration: "8n",
    });
    mainChords.push({
      time: seconds,
      note: VII,
      duration: "16n",
    });
    mainChords.push({
      time: seconds,
      note: VII,
      duration: "16n",
    });
  } else if (newVal > 35 && newVal <= 38) {
    mainChords.push({
      time: seconds,
      note: V,
      duration: "16n",
    });
    mainChords.push({
      time: seconds,
      note: VI,
      duration: "16n",
    });
    mainChords.push({
      time: seconds,
      note: VII,
      duration: "16n",
    });
  } else if (newVal > 38 && newVal <= 40) {
    mainChords.push({
      time: seconds,
      note: VII,
      duration: "8n",
    });
  } else if (newVal > 40) {
    mainChords.push({
      time: seconds,
      note: VI,
      duration: "16n",
    });
  } else {
    mainChords.push({
      time: seconds,
      note: III,
      duration: "4n",
    });;
  }
  return mainChords;
}
