// FORCE - Harmony
let prevHarmony2Note;
let harmony2Chords = [];
let IChord2, IIChord2, IIIChord2, IVChord2, VChord2;

function initializeHarmony2() {
  // Define chords
  IChord2 = constructMajorChord(Cmajor, 2, "F2");
  IIChord2 = constructMajorChord(Cmajor, 2, "B2");
  IIIChord2 = constructMajorChord(Cmajor, 3, "E4");
  IVChord2 = constructMajorChord(Cmajor, 3, "B4");

  // Set Low frequency oscilator
  // lfo = new Tone.LFO("4n", 100, 1000);

  // Chose frequency between:
  // 396Hz, 417Hz, 444Hz, 528Hz, 639Hz, 741Hz, 852Hz.

  //Tempo
  //Volume
  //Scale

  // Use a synth as an instrument to play chords
  synthMajor = new Tone.PolySynth(3, Tone.Synth, {
    volume: -7,
    count: 6,
    spread: 80,
    oscillator: {
      type: "fatsawtooth",
    },
    envelope: {
      release: 2,
    },
  }).toMaster();

  // Progression or sequence
  constructHarmony2Chords();

  //Use part to encapsulate chords into single unit
  majorPart = new Tone.Part(function (time, note) {
    // Prevent playing a note if it is same as previous one
    if (prevHarmony2Note !== note.note) {
      synthMajor.triggerAttackRelease(note.note, note.duration, time, 0.5);
    }
    prevHarmony2Note = note.note;
  }, harmony2Chords).start(0);
}

function constructHarmony2Chords() {
  for (let i = 0; i < seconds.length; i++) {
    defineHarmony2Chords(acceleratorX[i], seconds[i]);
  }
}

function defineHarmony2Chords(value, seconds) {
  if (value > 0 && value <= 1.2) {
    harmony2Chords.push({
      time: seconds,
      note: IChord2,
      duration: "2n",
    });
  } else if (value > 1.2 && value <= 2.5) {
    harmony2Chords.push({
      time: seconds,
      note: IIChord2,
      duration: "2n",
    });
  } else if (value > 2.5 && value <= 3.45) {
    harmony2Chords.push({
      time: seconds,
      note: IIIChord2,
      duration: "2n",
    });
  } else if (value > 3.55 && value <= 4.5) {
    harmony2Chords.push({
      time: seconds,
      note: IVChord2,
      duration: "2n",
    });
  } else if (value > 4.5 && value <= 5.6) {
    harmony2Chords.push({
      time: seconds,
      note: IIIChord2,
      duration: "2n",
    });
  } else if (value > 5.6 && value <= 7.2) {
    harmony2Chords.push({
      time: seconds,
      note: IVChord2,
      duration: "2n",
    });
  } else if (value > 7.2 && value <= 8) {
    harmony2Chords.push({
      time: seconds,
      note: IIIChord2,
      duration: "2n",
    });
  } else if (value > 8 && value <= 9) {
    harmony2Chords.push({
      time: seconds,
      note: IVChord2,
      duration: "2n",
    });
  } else if (value > 9) {
    harmony2Chords.push({
      time: seconds,
      note: IIIChord2,
      duration: "2n",
    });
  } else {
    harmony2Chords.push({
      time: seconds,
      note: IChord2,
      duration: "2n",
    });
  }

  return harmony2Chords;
}
