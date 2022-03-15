// FORCE - Melody
let prevMelodyTone;
let lfo;
let mainChords = [];
var effect1, effect2, effect3;
let picksCount = 0;

I = "D5";
II = "A5";
III = "A#5";

function initializeMelody1() {
  constructMelodyChords();

  // create effects
  //   let effect1 = new Tone.AutoFilter({
  //     frequency: 8,
  //     octaves: 0.2,
  //     Q: 2,
  //     baseFrequency: 700,
  //     wet: 0.6,
  //   }).toMaster();

  // Use a simple Synth as the instrument
  synthMelody = new Tone.Synth({
    volume: -5,
    oscillator: {
      type: "sine",
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
    // .connect(effect1)
    .toMaster();

  melodyPart = new Tone.Part(function (time, note) {
    if (note.note === "A#5") {
      if (prevMelodyTone !== note.note && prevMelodyTone !== note.note) {
        synthMelody.triggerAttackRelease(note.note, note.duration, time);
        prevMelodyTone = note.note;
      }
    } else {
      if (picksCount < 2) {
        synthMelody.triggerAttackRelease(note.note, note.duration, time);
        prevMelodyTone = note.note;
        picksCount++;
      } else {
        picksCount = picksCount < 5 && 0;
      }
    }

    // }
  }, mainChords).start(0);
}

function constructMelodyChords() {
  for (let i = 0; i < seconds.length; i++) {
    defineMelodyChords(force[i], seconds[i]);
  }
}

function defineMelodyChords(value, seconds) {
  let newVal = map(parseInt(value), 12, 40, 0, 3);

  if (newVal <= 1.7) {
    mainChords.push({
      time: seconds,
      note: I,
      duration: "4n",
    });
  } else if (newVal > 1.7 && newVal <= 2.5) {
    mainChords.push({
      time: seconds,
      note: II,
      duration: "8n",
    });
  } else if (newVal > 2.5 && newVal <= 3) {
    mainChords.push({
      time: seconds,
      note: III,
      duration: "8n",
    });
  } else {
    return;
  }
  return mainChords;
}
