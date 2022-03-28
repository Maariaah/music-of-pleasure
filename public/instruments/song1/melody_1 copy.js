// FORCE - Melody
let mainChords = [];
var effect1, effect2, effect3;
let picksCount = 0;

I = "C5";
II = "B5";
III = "A5";
IV = "G5";
V = "F5";
VI = "E5";
VII = "D5";
VIII = "C4";

function initializeMelody1() {
  constructMelodyChords();

  // create effects
  let effect1 = new Tone.Vibrato({
    frequency: 2.3,
    depth: 0.4,
    type: "triangle",
    wet: 0.5,
  }).toMaster();

  let effect2 = new Tone.Freeverb({
    "roomSize": 0.95,
    "dampening": 1200,
      "wet": 0.5
  }).toMaster();


  // Use a simple Synth as the instrument
  synthMelody = new Tone.DuoSynth({
    volume: -25,
    vibratoAmount: 0.5,
    vibratoRate: 5,
    harmonicity: 1.5,
    voice0: {
      volume: -15,
      portamento: 0,
      oscillator: {
        type: "triangle5",
      },
      filterEnvelope: {
        attack: 0.01,
        decay: 0,
        sustain: 1,
        release: 3,
      },
      envelope: {
        attack: 0.01,
        decay: 0,
        sustain: 1,
        release: 3,
      },
    },
    voice1: {
      volume: -25,
      portamento: 0,
      oscillator: {
        type: "sine4",
      },
      filterEnvelope: {
        attack: 0.01,
        decay: 0,
        sustain: 1,
        release: 3,
      },
      envelope: {
        attack: 0.01,
        decay: 0,
        sustain: 1,
        release: 3,
      },
    },
  })
    .connect(effect1)
    .connect(effect2)
    .toMaster();

  melodyPart = new Tone.Part(function (time, note) {
    picksCount++;
    if(time > 20) {
      if (prevMelodyTone !== note.note) {
        synthMelody.triggerAttackRelease(note.note, note.duration, time);
        prevMelodyTone = note.note;
      } 
      // else {
      //   if (picksCount <= 1) {
      //     synthMelody.triggerAttackRelease(note.note, note.duration, time);
      //   } else {
      //     if (picksCount > 7) {
      //       picksCount = 0;
      //     }
      //   }
      // }
    }

  }, mainChords).start(0);
}

function constructMelodyChords() {
  for (let i = 0; i < seconds.length; i++) {
    defineMelodyChords(force[i], seconds[i]);
  }
}

function defineMelodyChords(value, seconds) {
  let newVal = map(parseInt(value), 30, 68, 0, 10);

  if (newVal <= 0) {
    mainChords.push({
      time: seconds,
      note: IV,
      duration: "2n",
    });
  } else if (newVal > 0 && newVal <= 0.5) {
    mainChords.push({
      time: seconds,
      note: V,
      duration: "2n",
    });
  } else if (newVal > 0.5 && newVal <= 1) {
    mainChords.push({
      time: seconds,
      note: III,
      duration: "2n",
    });
  } else if (newVal > 1 && newVal <= 2) {
    mainChords.push({
      time: seconds,
      note: I,
      duration: "1n",
    });
  } else if (newVal > 2 && newVal <= 3) {
    mainChords.push({
      time: seconds,
      note: II,
      duration: "1n",
    });
  } else if (newVal > 3 && newVal <= 4) {
    mainChords.push({
      time: seconds,
      note: III,
      duration: "1n",
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
      duration: "2n.",
    });
  } else if (newVal > 6 && newVal <= 7) {
    mainChords.push({
      time: seconds,
      note: IV,
      duration: "2n.",
    });
  } else if (newVal > 7 && newVal <= 8) {
    mainChords.push({
      time: seconds,
      note: VI,
      duration: "4n.",
    });
  } else if (newVal > 8 && newVal <= 9) {
    mainChords.push({
      time: seconds,
      note: VII,
      duration: "2n.",
    });
  } else if (newVal > 9 && newVal <= 10) {
    mainChords.push({
      time: seconds,
      note: VII,
      duration: "2n.",
    });
  } else if (newVal > 10) {
    mainChords.push({
      time: seconds,
      note: VIII,
      duration: "2n.",
    });
  } else {
    return;
  }
  return mainChords;
}
