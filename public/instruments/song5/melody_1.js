// FORCE - Melody
var effect1, effect2, effect3;
let previousTime = 0;
let secondsDouble = 0;
let mainChords = [];
let prevSeconds = 0;
let prevNumber;
let melodyTimeoutID;
let malodyNotesCount = 0;

I = "A3";
II = "A#3";
III = "C4";
IV = "D4";
V = "D#4";
VI = "E4";
VII = "F4";
VIII = "G#4";

function initializeMelody1() {
  // create effects
  let effect1 = new Tone.FeedbackDelay({
    delayTime: "8n",
    feedback: 0.2,
    wet: 0.5,
  }).toMaster();

  // Use a simple Synth as the instrument
  synthMelody = new Tone.Synth({
    oscillator: {
      type: "fatcustom",
      partials: [0.2, 1, 0, 0.5, 0.1],
      spread: 40,
      count: 3,
    },
    volume: -5,
    // envelope: {
    //   attack: 0.001,
    //   decay: 1.6,
    //   sustain: 0,
    //   release: 1.6,
    // },
  })
    .connect(effect1)
    .toMaster();

  constructMelodyChords();

  melodyPart = new Tone.Part(function (time, note) {
    // Prevent playing a note if it is same as previous one
    if (prevMelodyTone !== note.note) {
      synthMelody.triggerAttackRelease(note.note, note.duration, time);
      prevMelodyTone = note.note;
    }

    window.note = window.note + 1;
  }, mainChords).start(0);

  function constructMelodyChords() {
    for (let i = 0; i < force.length; i++) {
      defineMelodyChords(force[i], seconds[i]);
    }
  }

  function defineMelodyChords(value, seconds) {
    let newVal = map(parseInt(value), 5, 40, 0, 12);

    if (newVal < 1) {
      mainChords.push({
        time: seconds,
        note: I,
        duration: "4n",
      });
    } else if (newVal > 1.5 && newVal <= 2) {
      mainChords.push({
        time: seconds,
        note: II,
        duration: "4n",
      });
    } else if (newVal > 3 && newVal <= 4) {
      mainChords.push({
        time: seconds,
        note: III,
        duration: "4n",
      });
    } else if (newVal > 5 && newVal <= 6) {
      mainChords.push({
        time: seconds,
        note: IV,
        duration: "2n",
      });
    } else if (newVal > 7 && newVal <= 8) {
      mainChords.push({
        time: seconds,
        note: V,
        duration: "4n",
      });
    } else if (newVal > 9 && newVal <= 10) {
      mainChords.push({
        time: seconds,
        note: VI,
        duration: "2n",
      });
    } else if (newVal > 11 && newVal <= 12) {
      mainChords.push({
        time: seconds,
        note: VII,
        duration: "4n.",
      });
    } else if (newVal > 12) {
      mainChords.push({
        time: seconds,
        note: VIII,
        duration: "4n.",
      });
    } else {
      return;
    }
  }
}
