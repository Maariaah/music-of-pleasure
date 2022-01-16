// FORCE - The major
let frequency;
let envelope;
let wave;
let prevNote;
let volume = -6;
let fft;
let lfo;
let mainChords = [];
let IChord, IIChord, IIIChord, IVChord, VChord;

function initializeForce() {
  // Define chords
  IChord = constructMajorChord(AMinorScale, 3, "A3");
  IIChord = constructMajorChord(AMinorScale, 3, "E4");
  IIIChord = constructMajorChord(AMinorScale, 4, "F3");
  IVChord = constructMajorChord(AMinorScale, 4, "D4");
  VChord = constructMajorChord(AMinorScale, 3, "G4");

  // Set Low frequency oscilator
  lfo = new Tone.LFO("4n", 100, 2000);

  // Analyse frequency/amplitude of signal
  fft = new Tone.FFT();

  // Create Envelope for visualisation
  env = new Tone.AmplitudeEnvelope();

  // Use a synth as an instrument to play chords
  synthMajor = new Tone.PolySynth(4, Tone.Synth, {
    volume: -10,
    oscillator: {
      type: "sawtooth",
    }
  })
    .connect(fft)
    .toMaster();

  // Progression or sequence
  constructForceChords();

  //Use part to encapsulate chords into single unit
  majorPart = new Tone.Part(function (time, note) {
    // Prevent playing a note if it is same as previous one
    if (prevNote !== note.note) {
       synthMajor.triggerAttackRelease(note.note, note.duration, time);
       prevNote = note.note;
    }
    
  }, mainChords).start(0);
}

function constructForceChords() {
  for (let i = 0; i < seconds.length; i++) {
    defineForceChords(force[i], seconds[i]);
  }
}

function defineForceChords(value, seconds) {
  // ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4'];

  if (value <= 20) {
    mainChords.push({
      time: seconds,
      note: IChord,
      duration: "4n",
    });
  }
  if (value > 20 && value <= 30) {
    mainChords.push({
      time: seconds,
      note: IChord,
      duration: "2n",
    });
  }
  if (value > 30 && value <= 40) {
    mainChords.push({
      time: seconds,
      note: IIChord,
      duration: "4n",
    });
  }
  if (value > 40 && value <= 50) {
    mainChords.push({
      time: seconds,
      note: IIChord,
      duration: "2n",
    });
  }
  if (value > 50 && value <= 60) {
    mainChords.push({
      time: seconds,
      note: IIIChord,
      duration: "4n",
    });
  }
  if (value > 60 && value <= 70) {
    mainChords.push({
      time: seconds,
      note: IIIChord,
      duration: "2n",
    });
  }
  if (value > 70 && value <= 80) {
    mainChords.push({
      time: seconds,
      note: IVChord,
      duration: "4n",
    });
  }
  if (value > 80 && value <= 90) {
    mainChords.push({
      time: seconds,
      note: IVChord,
      duration: "2n",
    });
  }
  if (value > 90 && value <= 95) {
    mainChords.push({
      time: seconds,
      note: VChord,
      duration: "4n",
    });
  }
  if (value > 95 && value <= 100) {
    mainChords.push({
      time: seconds,
      note: VChord,
      duration: "2n",
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
