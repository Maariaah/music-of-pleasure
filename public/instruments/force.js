// FORCE - The major

let frequency;
let envelope;
let wave;
let prevNote;
let volume = -6;
let lfo;
let mainChords = [];
let IChord, IIChord, IIIChord, IVChord, VChord;

function initializeForce() {
  // Define chords
  IChord = constructMajorChord(Cmajor, 3, "A1");
  IIChord = constructMajorChord(Cmajor, 3, "E4");
  IIIChord = constructMajorChord(Cmajor, 4, "F3");
  IVChord = constructMajorChord(Cmajor, 4, "D1");
  VChord = constructMajorChord(Cmajor, 3, "G4");

  // Set Low frequency oscilator
  lfo = new Tone.LFO("4n", 100, 1000);

  // Chose frequency between:
  // 396Hz, 417Hz, 444Hz, 528Hz, 639Hz, 741Hz, 852Hz.

  //Tempo
  //Volume
  //Scale

  // Use a synth as an instrument to play chords
  synthMajor = new Tone.PolySynth(7, Tone.Synth, {
    volume: -15,
    oscillator: {
      frequency: 100,
      count: 20,
      spread: 10,
      type: "sine",
    },
    // envelope: {
    //   attack: 0.01,
    //   decay: 0.1,
    //   sustain: 0.05,
    //   release: 0.5,
    // },
  })
    .connect(fft)
    .connect(waveform)
    .connect(env)
    .toMaster();

  // Progression or sequence
  constructForceChords();

  //Use part to encapsulate chords into single unit
  majorPart = new Tone.Part(function (time, note) {
    // Prevent playing a note if it is same as previous one
    if (prevNote !== note.note) {
      synthMajor.triggerAttackRelease(note.note, note.duration, time);
    }
    prevNote = note.note;
  }, mainChords).start(0);
}

function constructForceChords() {
  for (let i = 0; i < seconds.length; i++) {
    // defineForceChords(force[i], seconds[i]);
    console.log(defineForceChords(force[i], seconds[i]));
  }
}

function defineForceChords(value, seconds) {
  // ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4'];

  if (value <= 20 && value > 10) {
    mainChords.push({
      time: seconds,
      note: IIChord,
      duration: "4n",
    });
  }
  else if (value > 20 && value <= 30) {
    mainChords.push({
      time: seconds,
      note: IChord,
      duration: "2n",
    });
  }
  else if (value > 30 && value <= 40) {
    mainChords.push({
      time: seconds,
      note: IChord,
      duration: "4n",
    });
  }
  else if (value > 40 && value <= 50) {
    mainChords.push({
      time: seconds,
      note: IIChord,
      duration: "2n",
    });
  }
  else if (value > 50 && value <= 60) {
    mainChords.push({
      time: seconds,
      note: IVChord,
      duration: "4n",
    });
  }
  else if (value > 60 && value <= 70) {
    mainChords.push({
      time: seconds,
      note: IIIChord,
      duration: "2n",
    });
  }
  else if (value > 70 && value <= 80) {
    mainChords.push({
      time: seconds,
      note: IIIChord,
      duration: "4n",
    });
  }
  else if (value > 80 && value <= 90) {
    mainChords.push({
      time: seconds,
      note: IVChord,
      duration: "2n",
    });
  }
  else if (value > 90 && value <= 95) {
    mainChords.push({
      time: seconds,
      note: VChord,
      duration: "4n",
    });
  }
  else if (value > 95 && value <= 100) {
    mainChords.push({
      time: seconds,
      note: VChord,
      duration: "2n",
    });
  }
  else if (value > 100 && value <= 120) {
    mainChords.push({
      time: seconds,
      note: IVChord,
      duration: "4n",
    });
  } else {
    mainChords.push({
      time: seconds,
      note: IVChord,
      duration: "4n",
    });
  }

  return mainChords;
}
