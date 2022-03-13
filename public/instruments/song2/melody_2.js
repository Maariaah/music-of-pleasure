// FORCE - melody
let prevMelody2Tone;
let melody2Chords = [];
let I2 = "Bb4";
let II2 = "C5";
let III2 = "D5";
let IV2 = "Eb5";
let V2 = "F4";
let VI2 = "G4";
let VII2 = "Ab4";
let VIII2 = "Bb5";

function initializeMelody2() {
  constructmelody2Chords();

  let melody2Efect = new Tone.PingPongDelay({
    delayTime: "8t",
    feedback: 0.5,
    wet: 0.5,
  }).toMaster();

  synthMelody2 = new Tone.Synth({
    oscillator: {
      type: "fatsawtooth7",
    },
    volume: -10,
    envelope: {
      attack: 0.2,
      decay: 1,
      sustain: 0,
      release: 1.6,
    },
  })
    .connect(melody2Efect)
    .toMaster();

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
    definemelody2Chords(gyroscopeZ[i], seconds[i]);
  }
}
//GyroZ range: -30 - 30
function definemelody2Chords(value, seconds) {
  let newVal = parseInt(value);

  if (newVal <= -30) {
    melody2Chords.push({
      time: seconds,
      note: I2,
      duration: "1n",
    });
  } else if (newVal > -24.8 && newVal <= -22) {
    melody2Chords.push({
      time: seconds,
      note: II2,
      duration: "1n",
    });
  } else if (newVal > -22 && newVal <= -17.2) {
    melody2Chords.push({
      time: seconds,
      note: III2,
      duration: "1n",
    });
  } else if (newVal > -17.2 && newVal <= -11.2) {
    melody2Chords.push({
      time: seconds,
      note: IV2,
      duration: "1n",
    });
  } else if (newVal > -11.2 && newVal <= -3.5) {
    melody2Chords.push({
      time: seconds,
      note: III2,
      duration: "4n",
    });
  } else if (newVal > -3.5 && newVal <= 0) {
    melody2Chords.push({
      time: seconds,
      note: V2,
      duration: "2n",
    });
  } else if (newVal > 0 && newVal <= 5) {
    melody2Chords.push({
      time: seconds,
      note: VI2,
      duration: "8n",
    });
  } else if (newVal > 5 && newVal <= 11) {
    melody2Chords.push({
      time: seconds,
      note: VII2,
      duration: "8n",
    });
  } else if (newVal > 21.5 && newVal <= 30) {
    melody2Chords.push({
      time: seconds,
      note: VIII2,
      duration: "8n",
    });
  } else {
    melody2Chords.push({
      time: seconds,
      note: V2,
      duration: "4n",
    });
  }

  return melody2Chords;
}
