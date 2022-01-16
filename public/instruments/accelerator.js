//ACCELERATOR - The main melody

let mainMelody = [];

function initializeAccelerator() {
  // Uses single notes instead of chords
  constructAcceleratorXChords(mainMelody);

  // Get waveform data of signal
  let wave = new Tone.Waveform();

  // Use a simple Synth as the instrument
  const synthMelody = new Tone.Synth({
    oscillator: {
      volume: 2,
      count: 3,
      spread: 40,
      type: "sine",
    },
  })
    .connect(wave)
    .toMaster();

  melodyPart = new Tone.Part(function (time, note) {
    synthMelody.triggerAttackRelease(note.note, note.duration, time);
  }, mainMelody).start(0);
}

function constructAcceleratorXChords() {
  for (let i = 0; i < seconds.length; i++) {
    defineAccXChords(accelerator[i] * 10, seconds[i]);
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
