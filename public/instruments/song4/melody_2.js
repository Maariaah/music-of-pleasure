// FORCE - melody
let prevMelody2Tone;
let melody2Chords = [];
let I2 = "D4";
let II2 = "F4";
let III2 = "A4";
let IV2 = "B4";
let V2 = "C5";
let VI2 = "D5";

function initializeMelody2() {
  constructmelody2Chords();

  synthMelody2 = new Tone.Synth({
    volume: -2,
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
  }).toMaster();

  //Use part to encapsulate chords into single unit
  melody2Part = new Tone.Part(function (time, note) {
    // Prevent playing a note if it is same as previous one
    if (prevMelody2Tone !== note.note) {
      synthMelody2.triggerAttackRelease(note.note, note.duration, time);
      prevMelody2Tone = note.note;
    }
  }, melody2Chords).start(0);
}

function constructmelody2Chords() {
  for (let i = 0; i < seconds.length; i++) {
    definemelody2Chords(force[i], seconds[i]);
  }
}

function definemelody2Chords(value, seconds) {
  let newVal = map(parseInt(value), 6, 38, 0, 14);

  if(newVal < 11) {
    return;
  }
  else if (newVal > 11 && newVal <= 11.5) {
    mainChords.push({
      time: seconds,
      note: IV2,
      duration: "8n",
    });
  } else if (newVal > 11.5 && newVal <= 12) {
    mainChords.push({
      time: seconds,
      note: IV2,
      duration: "8n",
    });
  } else if (newVal > 12 && newVal <= 13) {
    mainChords.push({
      time: seconds,
      note: V2,
      duration: "8n",
    });
  } else if (newVal > 13 && newVal <= 13.5) {
    mainChords.push({
      time: seconds,
      note: V2,
      duration: "8n",
    });
  } else if (newVal > 13.5 && newVal <= 14) {
    mainChords.push({
      time: seconds,
      note: VI2,
      duration: "8n",
    });
  } else if (newVal > 14) {
    mainChords.push({
      time: seconds,
      note: VI2,
      duration: "8n",
    });
  } else {
    return;
  }

  return melody2Chords;
}
