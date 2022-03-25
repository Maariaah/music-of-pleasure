// FORCE - melody
let prevMelody3Tone;
let melody3Chords = [];
let I3 = "Bb3";
let II3 = "C4";
let III3 = "D4";
let IV3 = "Eb4";
let V3 = "F3";
let VI3 = "G3";
let VII3 = "Ab4";
let VIII3 = "Bb5";

function initializeMelody3() {
  constructmelody3Chords();

  let melody3Efect = new Tone.PingPongDelay({
    delayTime: "8t",
    feedback: 0.5,
    wet: 0.5,
  }).toMaster();

  synthMelody3 = new Tone.Synth({
    oscillator: {
      type: "fatsawtooth7",
    },
    volume: -8,
    envelope: {
      attack: 0.2,
      decay: 1,
      sustain: 0,
      release: 1.8,
    },
  })
    .connect(melody3Efect)
    .toMaster();

  //Use part to encapsulate chords into single unit
  melody2Part = new Tone.Part(function (time, note) {
    // Prevent playing a note if it is same as previous one
    if (prevMelody3Tone !== note.note) {
      synthMelody3.triggerAttackRelease(note.note, note.duration, time);
      prevMelody3Tone = note.note;
    }
  }, melody3Chords).start(0);
}

function constructmelody3Chords() {
  for (let i = 0; i < seconds.length; i++) {
    definemelody3Chords(gyroscopeX[i], seconds[i]);
  }
}
//GyroZ range: -30 - 30
function definemelody3Chords(value, seconds) {
  let newVal = parseInt(value);

  if (newVal <= -30) {
    melody3Chords.push({
      time: seconds,
      note: I3,
      duration: "1n",
    });
  } else if (newVal > -24.8 && newVal <= -22) {
    melody3Chords.push({
      time: seconds,
      note: II3,
      duration: "1n",
    });
  } else if (newVal > -22 && newVal <= -17.2) {
    melody3Chords.push({
      time: seconds,
      note: III3,
      duration: "1n",
    });
  } else if (newVal > -17.2 && newVal <= -11.2) {
    melody3Chords.push({
      time: seconds,
      note: IV3,
      duration: "1n",
    });
  } else if (newVal > -11.2 && newVal <= -3.5) {
    melody3Chords.push({
      time: seconds,
      note: III3,
      duration: "4n",
    });
  } else if (newVal > -3.5 && newVal <= 0) {
    melody3Chords.push({
      time: seconds,
      note: V3,
      duration: "2n",
    });
  } else if (newVal > 0 && newVal <= 5) {
    melody3Chords.push({
      time: seconds,
      note: VI3,
      duration: "8n",
    });
  } else if (newVal > 5 && newVal <= 11) {
    melody3Chords.push({
      time: seconds,
      note: VII3,
      duration: "8n",
    });
  } else if (newVal > 21.5 && newVal <= 30) {
    melody3Chords.push({
      time: seconds,
      note: VIII3,
      duration: "8n",
    });
  } else {
    melody3Chords.push({
      time: seconds,
      note: V3,
      duration: "4n",
    });
  }

  return melody3Chords;
}
