// FORCE - Harmony
let prevHarmonyNote;
let harmonyChords = [];
let IChord, IIChord, IIIChord, IVChord, VChord, VIChord;

function initializeHarmony() {
  // Define chords
  IChord = constructMajorChord(Cmajor, 3, "F2");
  IIChord = constructMajorChord(Cmajor, 4, "A2");
  IIIChord = constructMajorChord(Cmajor, 4, "E3");
  IVChord = constructMajorChord(Cmajor, 4, "C4");
  VChord = constructMajorChord(Cmajor, 6, "A4");

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
      type: "triangle",
    },
    // envelope: {
    //   attack: 0.01,
    //   decay: 0.1,
    //   sustain: 0.5,
    //   release: 0.05,
    // },
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
    defineHarmonyChords(force[i], seconds[i]);
  }
}

function defineHarmonyChords(value, seconds) {
  if (value > 13 && value <= 25) {
    harmonyChords.push({
      time: seconds,
      note: IIChord,
      duration: "2n",
    });
  } else if (value > 25 && value <= 32.5) {
    harmonyChords.push({
      time: seconds,
      note: IIIChord,
      duration: "4n",
    });
  } else if (value > 32.5 && value <= 40) {
    harmonyChords.push({
      time: seconds,
      note: IVChord,
      duration: "4n",
    });
  } 
  else if (value > 40) {
    mainChords.push({
      time: seconds,
      note: V,
      duration: "8n",
    });
  }
  else {
    harmonyChords.push({
      time: seconds,
      note: IChord,
      duration: "1n",
    });
  }

  return harmonyChords;
}
