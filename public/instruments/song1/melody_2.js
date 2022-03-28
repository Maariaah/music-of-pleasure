// FORCE - melody

let prevMelody2Tone;
let melody2Chords = [];
let I2 = "C2";
let II2 = "B2";
let III2 = "A2";
let IV2 = "G2";
let V2 = "F2";
let VI2 = "E2";
let VII2 = "D2";
let VIII2 = "C3";

function initializeMelody2() {
  let melody2Effect = new Tone.Tremolo({
    frequency: 5,
    type: "triangle",
    depth: 0.6,
    spread: 0,
    wet: 0.5,
  }).toMaster();

  synthMajor = new Tone.Synth({
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
     .connect(melody2Effect)
    .toMaster();

  // Progression or sequence
  constructmelody2Chords();

  //Use part to encapsulate chords into single unit
  melody2Part = new Tone.Part(function (time, note) {
    console.log(note.note);
    // Prevent playing a note if it is same as previous one
    if (prevMelody2Tone !== note.note) {
      synthMajor.triggerAttackRelease(note.note, note.duration, time);
      prevMelody2Tone = note.note;
    }
  }, melody2Chords).start(0);
}

function constructmelody2Chords() {
  for (let i = 0; i < seconds.length; i++) {
    definemelody2Chords(gyroscopeX[i], seconds[i]);
  }
}

function definemelody2Chords(value, seconds) {
  let newVal = map(parseInt(value), 0, 20, 0, 16);
  if (newVal <= 0) {
    melody2Chords.push({
      time: seconds,
      note: I2,
      duration: "1n",
    });
  } else if (newVal > 0 && newVal <= 1) {
    melody2Chords.push({
      time: seconds,
      note: II2,
      duration: "1n",
    });
  } else if (newVal > 1 && newVal <= 2) {
    melody2Chords.push({
      time: seconds,
      note: III2,
      duration: "1n",
    });
  } else if (newVal > 2 && newVal <= 3) {
    melody2Chords.push({
      time: seconds,
      note: II2,
      duration: "2n",
    });
  } else if (newVal > 3 && newVal <= 4) {
    melody2Chords.push({
      time: seconds,
      note: III2,
      duration: "2n",
    });
  } else if (newVal > 4 && newVal <= 6) {
    melody2Chords.push({
      time: seconds,
      note: IV2,
      duration: "2n",
    });
  } else if (newVal > 6 && newVal <= 8) {
    melody2Chords.push({
      time: seconds,
      note: V2,
      duration: "2n",
    });
  } else if (newVal > 8 && newVal <= 9) {
    melody2Chords.push({
      time: seconds,
      note: VI2,
      duration: "4n",
    });
  } else if (newVal > 9 && newVal <= 10) {
    melody2Chords.push({
      time: seconds,
      note: V2,
      duration: "2n",
    });
  } else if (newVal > 10 && newVal <= 11) {
    melody2Chords.push({
      time: seconds,
      note: VI2,
      duration: "2n",
    });
  } else if (newVal > 11 && newVal <= 12) {
    melody2Chords.push({
      time: seconds,
      note: VII2,
      duration: "2n",
    });
  } else if (newVal > 12 && newVal <= 13) {
    melody2Chords.push({
      time: seconds,
      note: VI2,
      duration: "2n",
    });
  } else if (newVal > 13 && newVal <= 14) {
    melody2Chords.push({
      time: seconds,
      note: VIII2,
      duration: "2n",
    });
  } else if (newVal > 14 && newVal <= 16) {
    melody2Chords.push({
      time: seconds,
      note: VII2,
      duration: "4n",
    });
  } else if (newVal > 16) {
    melody2Chords.push({
      time: seconds,
      note: VIII2,
      duration: "4n",
    });
  } else {
    return;
  }

  return melody2Chords;
}
