// FORCE - The major

let envelope;
let wave;
let prevNote;
let lfo;
let mainChords = [];
let IChord, IIChord, IIIChord, IVChord, VChord, VIChord;

function initializeForce() {
  // Define chords
  IChord = constructMajorChord(Cmajor, 3, "F3");
  IIChord = constructMajorChord(Cmajor, 4, "A3");
  IIIChord = constructMajorChord(Cmajor, 4, "E4");
  IVChord = constructMajorChord(Cmajor, 4, "C5");
  VChord = constructMajorChord(Cmajor, 6, "A5");
  // VIChord = constructMajorChord(Cmajor, 5, "F#");

  // Set Low frequency oscilator
  // lfo = new Tone.LFO("4n", 100, 1000);

  // Chose frequency between:
  // 396Hz, 417Hz, 444Hz, 528Hz, 639Hz, 741Hz, 852Hz.

  //Tempo
  //Volume
  //Scale

  // Use a synth as an instrument to play chords
  synthMajor = new Tone.PolySynth(4, Tone.Synth, {
    volume: 2,
    oscillator: {
      count: 20,
      spread: 20,
      type: "sine",
    },
    // envelope: {
    //   attack: 0.01,
    //   decay: 0.1,
    //   sustain: 0.5,
    //   release: 0.05,
    // },
  }).toMaster();

  // Progression or sequence
  constructForceChords();

  //Use part to encapsulate chords into single unit
  majorPart = new Tone.Part(function (time, note) {
    // Prevent playing a note if it is same as previous one
    // if (prevNote !== note.note) {
      synthMajor.triggerAttackRelease(note.note, note.duration, time);
    // }
    prevNote = note.note;
  }, mainChords).start(0);
}

function constructForceChords() {
  for (let i = 0; i < seconds.length; i++) {
    defineForceChords(force[i], seconds[i]);
  }
}

function defineForceChords(value, seconds) {
  // ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4'];

  if (value > 13 && value <= 16) {
    mainChords.push({
      time: seconds,
      note: IIChord,
      duration: "2n",
    });
  }
  if (value > 16 && value <= 19) {
    mainChords.push({
      time: seconds,
      note: IVChord,
      duration: "2n",
    });
  } else if (value > 19 && value <= 21) {
    mainChords.push({
      time: seconds,
      note: IIIChord,
      duration: "2n",
    });
  } else if (value > 21 && value <= 21.5) {
    mainChords.push({
      time: seconds,
      note: IVChord,
      duration: "4n",
    });
  } else if (value > 21.5 && value <= 25) {
    mainChords.push({
      time: seconds,
      note: IVChord,
      duration: "4n",
    });
  } else if (value > 25 && value <= 26) {
    mainChords.push({
      time: seconds,
      note: VChord,
      duration: "8n",
    });
  } else if (value > 27 && value <= 29) {
    mainChords.push({
      time: seconds,
      note: IIIChord,
      duration: "8n",
    });
  } else if (value > 29 && value <= 30) {
    mainChords.push({
      time: seconds,
      note: IVChord,
      duration: "8n",
    });
  } else if (value > 30 && value <= 32.5) {
    mainChords.push({
      time: seconds,
      note: VChord,
      duration: "8n",
    });
  } else if (value > 32.5 && value <= 32.5) {
    mainChords.push({
      time: seconds,
      note: IIIChord,
      duration: "8n",
    });
  } else if (value > 35 && value <= 38) {
    mainChords.push({
      time: seconds,
      note: IVChord,
      duration: "8n",
    });
  } else if (value > 38 && value <= 40) {
    mainChords.push({
      time: seconds,
      note: VChord,
      duration: "8n",
    });
  } else {
    mainChords.push({
      time: seconds,
      note: IChord,
      duration: "2n",
    });
  }

  return mainChords;
}
