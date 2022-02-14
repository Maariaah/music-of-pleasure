//ACCELERATOR - The main melody

let mainMelody = [];
let prevMelodyNote;

function initializeAccelerator() {
  // Uses single notes instead of chords
  constructAcceleratorXChords();

  // Use a simple Synth as the instrument
  synthMelody = new Tone.PolySynth({
    oscillator: {
      frequency: 444,
      volume: 1,
      count: 10,
     spread: 30,
      type: "triangle",
    },
  })
    .connect(fft)
    .connect(env)
    .connect(waveform)
    .toMaster();

  melodyPart = new Tone.Part(function (time, note) {
    if (prevMelodyNote !== note.note) {
      synthMelody.triggerAttackRelease(note.note, note.duration, time);
    }
    prevMelodyNote = note.note;
  }, mainMelody).start(0);
}

function constructAcceleratorXChords() {
  for (let i = 0; i < seconds.length; i++) {
    defineAccXChords(acceleratorX[i] * 10, seconds[i]);
  }
}

function defineAccXChords(value, seconds) {
  // ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4'];

  let newVal = parseInt(value);

  if (newVal <= 60 && newVal > 50) {
    mainMelody.push({
      time: seconds,
      note: "D4",
      duration: "4n.",
    });
  } else if (newVal > 65 && newVal <= 70) {
    mainMelody.push({
      time: seconds,
      note: "D4",
      duration: "4n",
    });
  } else if (newVal > 70 && newVal <= 75) {
    mainMelody.push({
      time: seconds,
      note: "F4",
      duration: "4n.",
    });
  } else if (newVal > 75 && newVal <= 80) {
    mainMelody.push({
      time: seconds,
      note: "A4",
      duration: "2n",
    });
  } else if (newVal > 85 && newVal <= 90) {
    mainMelody.push({
      time: seconds,
      note: "A4",
      duration: "4n",
    });
  } else {
    mainMelody.push({
      time: seconds,
      note: "A1",
      duration: "2n",
    });
  }

  return mainMelody;
}
