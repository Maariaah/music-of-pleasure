// FORCE - Harmony
let prevHarmonyNote;
let harmonyChords = [];
let IChord, IIChord, IIIChord, IVChord, VChord, VIChord;

function initializeHarmony() {
  // Define chords
  IChord = constructMajorChord(Cmajor, 2, "B2");
  IIChord = constructMajorChord(Cmajor, 3, "F3");
  IIIChord = constructMajorChord(Cmajor, 4, "B3");
  IVChord = constructMajorChord(Cmajor, 4, "C4");

  // Set Low frequency oscilator
  // lfo = new Tone.LFO("4n", 100, 1000);

  // Chose frequency between:
  // 396Hz, 417Hz, 444Hz, 528Hz, 639Hz, 741Hz, 852Hz.

  //Tempo
  //Volume
  //Scale

  // Use a synth as an instrument to play chords
  synthMajor = new Tone.PolySynth(3, Tone.Synth, {
    volume: 1,
    oscillator: {
      type: "triangle",
    },
    envelope: {
      // attack: 1,
      // decay: 1,
      // sustain: 0.2,
      release: 2
    },
  }).toMaster();

  // Progression or sequence
  constructHarmonyChords();

  //Use part to encapsulate chords into single unit
  majorPart = new Tone.Part(function (time, note) {
    // Prevent playing a note if it is same as previous one
    if (prevHarmonyNote !== note.note) {
      synthMajor.triggerAttackRelease(note.note, note.duration, time);
    }
    prevHarmonyNote = note.note;
  }, harmonyChords).start(0);
}

function constructHarmonyChords() {
  for (let i = 0; i < seconds.length; i++) {
    defineHarmonyChords(gyroscopeX[i], seconds[i]);
  }
}

function defineHarmonyChords(value, seconds) {
  if (value > -22 && value <= -14) {
    harmonyChords.push({
      time: seconds,
      note: IChord,
      duration: "1n",
    });
  } else if (value > -14 && value <= -6) {
    harmonyChords.push({
      time: seconds,
      note: IIChord,
      duration: "2n",
    });
  } else if (value > -6 && value <= 1) {
    harmonyChords.push({
      time: seconds,
      note: IIIChord,
      duration: "2n",
    });
  } else if (value > 1 && value <= 9) {
    mainChords.push({
      time: seconds,
      note: IV,
      duration: "2n",
    });
  } else if (value > 9 && value <= 19.5) {
    mainChords.push({
      time: seconds,
      note: III,
      duration: "1n",
    });
  } else {
    harmonyChords.push({
      time: seconds,
      note: IVChord,
      duration: "2n",
    });
  }

  return harmonyChords;
}
