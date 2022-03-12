// FORCE - melody
let prevMelody2Tone;
let melody2Chords = [];
let I2 = "F3";
let II2 = "G#3";
let III2 = "B3";
let IV2 = "E4";
let V2 = "F#4";
let VI2 = "G4";
let VII2 = "B4";
let VIII2 = "C#5";

function initializeMelody2() {
  synthMajor = new Tone.Synth({
    volume: -5,
    oscillator: {
      type: "fatsawtooth",
    },
  }).toMaster();

  // Progression or sequence
  constructmelody2Chords();

  //Use part to encapsulate chords into single unit
  majorPart = new Tone.Part(function (time, note) {
    // Prevent playing a note if it is same as previous one
    if (prevMelody2Tone !== note.note) {
      synthMajor.triggerAttackRelease(note.note, note.duration, time);
      prevMelody2Tone = note.note;
    }
  }, melody2Chords).start(0);
}

function constructmelody2Chords() {
  for (let i = 0; i < seconds.length; i++) {
    definemelody2Chords(acceleratorZ[i], seconds[i]); // 4-10
  }
}

function definemelody2Chords(value, seconds) {
  let newVal = parseInt(value);

  if (newVal <= 8.5) {
    melody2Chords.push({
      time: seconds,
      note: I2,
      duration: "1n",
    });
  } else if (newVal > 8.5 && newVal <= 8.8) {
    melody2Chords.push({
      time: seconds,
      note: II2,
      duration: "1n",
    });
  } else if (newVal > 8.8 && newVal <= 9) {
    melody2Chords.push({
      time: seconds,
      note: III2,
      duration: "1n",
    });
  } else if (newVal > 9.1 && newVal <= 9.2) {
    melody2Chords.push({
      time: seconds,
      note: II2,
      duration: "2n",
    });
  } else if (newVal > 9.2 && newVal <= 9.3) {
    melody2Chords.push({
      time: seconds,
      note: III2,
      duration: "2n",
    });
  } else if (newVal > 9.3 && newVal <= 9.4) {
    melody2Chords.push({
      time: seconds,
      note: IV2,
      duration: "2n",
    });
  } else if (newVal > 9.4 && newVal <= 9.5) {
    melody2Chords.push({
      time: seconds,
      note: III2,
      duration: "2n",
    });
  } else if (newVal > 9.5 && newVal <= 9.6) {
    melody2Chords.push({
      time: seconds,
      note: V2,
      duration: "2n",
    });
  } else if (newVal > 9.7 && newVal <= 9.8) {
    melody2Chords.push({
      time: seconds,
      note: VI2,
      duration: "4n",
    });
  } else if (newVal > 9.9 && newVal <= 10) {
    melody2Chords.push({
      time: seconds,
      note: VII2,
      duration: "4n",
    });
  } else if (newVal > 10 && newVal <= 8.5) {
    melody2Chords.push({
      time: seconds,
      note: IV2,
      duration: "8n",
    });
  } else if (newVal > 9.7 && newVal <= 9.8) {
    melody2Chords.push({
      time: seconds,
      note: V2,
      duration: "16n",
    });
  } else if (newVal > 9.8 && newVal <= 10) {
    melody2Chords.push({
      time: seconds,
      note: VII2,
      duration: "16n",
    });
  } else if (newVal > 10) {
    melody2Chords.push({
      time: seconds,
      note: VIII2,
      duration: "16n",
    });
  } else {
    melody2Chords.push({
      time: seconds,
      note: II2,
      duration: "1n",
    });
  }

  return melody2Chords;
}
