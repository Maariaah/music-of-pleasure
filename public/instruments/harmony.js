// FORCE - Harmony
let prevHarmonyNote;
let harmonyChords = [];
let IChord, IIChord, IIIChord, IVChord, VChord, VIChord;

function initializeHarmony() {
  // Define chords
  IChord = constructMajorChord(Cmajor, 2, "B2");
  IIChord = constructMajorChord(Cmajor, 3, "E3");
  IIIChord = constructMajorChord(Cmajor, 3, "F3");
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
    volume: 2,
    oscillator: {
      type: "sine",
    }
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
      note: IChord,
      duration: "2n",
    });
  } else if (value > 25 && value <= 32.5) {
    harmonyChords.push({
      time: seconds,
      note: IIChord,
      duration: "2n",
    });
  } else if (value > 32.5 && value <= 40) {
    harmonyChords.push({
      time: seconds,
      note: IIIChord,
      duration: "2n.",
    });
  } 
  else if (value > 40) {
    mainChords.push({
      time: seconds,
      note: IV,
      duration: "2n.",
    });
  }
  else {
    harmonyChords.push({
      time: seconds,
      note: IIChord,
      duration: "2n",
    });
  }

  return harmonyChords;
}
