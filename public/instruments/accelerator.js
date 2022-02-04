//ACCELERATOR - The main melody

let mainMelody = [];
let prevMelodyNote;

function initializeAccelerator() {
  // Uses single notes instead of chords
  constructAcceleratorXChords();

  // Use a simple Synth as the instrument
  synthMelody = new Tone.Synth({
    oscillator: {
      volume: 4,
      count: 10,
      spread: 10,
      type: "triangle",
    },
  })
    .connect(fft)
    .toMaster();

  melodyPart = new Tone.Part(function (time, note) {
    if (prevMelodyNote !== note.note  ) {
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

  if (value <= 40) {
    mainMelody.push({
      time: seconds,
      note: "G4",
      duration: "4n",
    });
  }
  if (value > 40 && value <= 50) {
    mainMelody.push({
      time: seconds,
      note: "F4",
      duration: "4n",
    });
  }
  if (value > 50 && value <= 60) {
    mainMelody.push({
      time: seconds,
      note: "D4",
      duration: "4n.",
    });
  }
  if (value > 60 && value <= 70) {
    mainMelody.push({
      time: seconds,
      note: "D4",
      duration: "4n",
    });
  }
  if (value > 70 && value <= 80) {
    mainMelody.push({
      time: seconds,
      note: "F4",
      duration: "4n.",
    });
  }
  if (value > 80 && value <= 90) {
    mainMelody.push({
      time: seconds,
      note: "A4",
      duration: "2n",
    });
  }
  if (value > 100 && value <= 110) {
    mainMelody.push({
      time: seconds,
      note: "A4",
      duration: "4n",
    });
  } else {
    mainMelody.push({
      time: seconds,
      note: "A4",
      duration: "2n",
    });
  }
  return mainMelody;
}
