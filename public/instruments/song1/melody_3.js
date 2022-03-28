// FORCE - melody

let prevMelody3Tone;
let melody3Chords = [];

let I3 = "A2";
let II3 = "B2";
let III3 = "C3";
let IV3 = "D3";
let V3 = "E3";
let VI3 = "F3";
let VII3 = "G3";
let VIII3 = "A3";

function initializeMelody3() {
  synthMajor = new Tone.Synth({
    volume: 1,
    oscillator: {
      type: "fmsine4",
    },
  }).toMaster();

  // Progression or sequence
  constructmelody3Chords();

  //Use part to encapsulate chords into single unit
  melody2Part = new Tone.Part(function (time, note) {
    // Prevent playing a note if it is same as previous one
    if (prevMelody3Tone !== note.note) {
      synthMajor.triggerAttackRelease(note.note, note.duration, time);
      prevMelody3Tone = note.note;
    }
  }, melody3Chords).start(0);
}

function constructmelody3Chords() {
  for (let i = 0; i < seconds.length; i++) {
    definemelody3Chords(gyroscopeZ[i], seconds[i]);
  }
}

function definemelody3Chords(value, seconds) {
  let newVal = map(parseInt(value), 0, -25, 0, 16);

  if (newVal <= 0) {
    melody3Chords.push({
      time: seconds,
      note: I3,
      duration: "1n",
    });
  } else if (newVal > 0 && newVal <= 1) {
    melody3Chords.push({
      time: seconds,
      note: II3,
      duration: "1n",
    });
  } else if (newVal > 1 && newVal <= 2) {
    melody3Chords.push({
      time: seconds,
      note: III3,
      duration: "1n",
    });
  } else if (newVal > 2 && newVal <= 3) {
    melody3Chords.push({
      time: seconds,
      note: II3,
      duration: "2n",
    });
  } else if (newVal > 3 && newVal <= 4) {
    melody3Chords.push({
      time: seconds,
      note: III3,
      duration: "2n",
    });
  } else if (newVal > 4 && newVal <= 6) {
    melody3Chords.push({
      time: seconds,
      note: IV3,
      duration: "2n",
    });
  } else if (newVal > 6 && newVal <= 8) {
    melody3Chords.push({
      time: seconds,
      note: V3,
      duration: "2n",
    });
  } else if (newVal > 8 && newVal <= 9) {
    melody3Chords.push({
      time: seconds,
      note: VI3,
      duration: "4n",
    });
  } else if (newVal > 9 && newVal <= 10) {
    melody3Chords.push({
      time: seconds,
      note: V3,
      duration: "8n",
    });
  } else if (newVal > 10 && newVal <= 11) {
    melody3Chords.push({
      time: seconds,
      note: VI3,
      duration: "8n",
    });
  } else if (newVal > 11 && newVal <= 12) {
    melody3Chords.push({
      time: seconds,
      note: VII3,
      duration: "8n",
    });
  } else if (newVal > 12 && newVal <= 13) {
    melody3Chords.push({
      time: seconds,
      note: VI3,
      duration: "8n",
    });
  } else if (newVal > 13 && newVal <= 14) {
    melody3Chords.push({
      time: seconds,
      note: VIII3,
      duration: "16n",
    });
  } else if (newVal > 14 && newVal <= 16) {
    melody3Chords.push({
      time: seconds,
      note: VII3,
      duration: "16n",
    });
  } else if (newVal > 16) {
    melody3Chords.push({
      time: seconds,
      note: VIII3,
      duration: "16n",
    });
  } else {
    return;
  }

  return melody3Chords;
}
