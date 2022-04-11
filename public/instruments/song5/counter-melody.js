// FORCE - melody
let prevMelody2Tone;
let melody2Chords = [];

let I2 = "D3";
let II2 = "A3";
let III2 = "C4";
let IV2 = "D4";
let V2 = "A#4";
let VI2 = "G#4";

function initializeMelody2() {
  constructmelody2Chords();

  // synthMelody2 = new Tone.Synth({
  //   volume: -10,
  //   oscillator: {
  //     type: "amsine4",
  //     partials: [0.2, 1, 0, 0.5, 0.1],
  //     spread: 40,
  //     count: 3,
  //   },
  //   envelope: {
  //     attack: 0.001,
  //     decay: 1.6,
  //     sustain: 0,
  //     release: 1.6,
  //   },
  // }).toMaster();

  const synthMelody2 = new Tone.Sampler(
    {
      D3: "./samples/piano/D3.mp3",
      A3: "./samples/piano/A3.mp3",
      C4: "./samples/piano/C4.mp3",
      D4: "./samples/piano/D4.mp3",
      E4: "./samples/piano/Es4.mp3",
      G4: "./samples/piano/G4.mp3",
    },
    {
      volume: -15,
      envelope: {
        attack: 0.001,
        decay: 1.6,
        sustain: 0,
        release: 1.6,
      }
    },

  ).toMaster();

  //Use part to encapsulate chords into single unit
  melody2Part = new Tone.Part(function (time, note) {
    // Prevent playing a note if it is same as previous one
    // if (prevMelody2Tone !== note.note) {
      synthMelody2.triggerAttackRelease(note.note, note.duration, time);
      prevMelody2Tone = note.note;
    // }
  }, melody2Chords).start(0);
}

function constructmelody2Chords() {
  for (let i = 0; i < seconds.length; i++) {
    definemelody2Chords(force[i], seconds[i]);
  }
}

function definemelody2Chords(value, seconds) {
  let newVal = map(parseInt(value), 5, 40, 0, 12);

  if (newVal > 1 && newVal <= 1.5) {
    melody2Chords.push({
      time: seconds,
      note: "D3",
      duration: "2n",
    });
    } else if (newVal > 2 && newVal <= 3) {
    melody2Chords.push({
      time: seconds,
      note: "A3",
      duration: "2n",
    });
  } else if (newVal > 4 && newVal <= 5) {
    melody2Chords.push({
      time: seconds,
      note: "C4",
      duration: "2n",
    });
  } else if (newVal > 6 && newVal <= 7) {
    melody2Chords.push({
      time: seconds,
      note: "D4",
      duration: "2n",
    });
  } else if (newVal > 8 && newVal <= 9) {
    melody2Chords.push({
      time: seconds,
      note: "E4",
      duration: "2n",
    });
  } else if (newVal > 10 && newVal <= 11) {
    melody2Chords.push({
      time: seconds,
      note: "G4",
      duration: "2n",
    });
  } else {
    return;
  }

  return melody2Chords;
}
