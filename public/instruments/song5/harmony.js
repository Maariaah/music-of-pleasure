// FORCE - Harmony
let prevHarmonyTone;
let harmonyChords = [];
let IChord, IIChord, IIIChord, IVChord, VChord;

function initializeHarmony() {
  // Define chords

  IChord = constructMajorChord(Dbmajor, 2, "F2");
  IIChord = constructMajorChord(Dbmajor, 3, "Ab3");
  IIIChord = constructMajorChord(Dbmajor, 3, "Bb3");
  IVChord = constructMajorChord(Dbmajor, 2, "Cb3");
  VChord = constructMajorChord(Dbmajor, 4, "Db4");

  // Chose frequency between:
  // 396Hz, 417Hz, 444Hz, 528Hz, 639Hz, 741Hz, 852Hz.

  // Use a synth as an instrument to play chords
  synthMajor = new Tone.PolySynth(3, Tone.Synth, {
    volume: 3,
    oscillator: {
      type: "sine",
    },
  }).toMaster();

  // Progression or sequence
  constructHarmonyChords();

  //Use part to encapsulate chords into single unit
  harmonyPart = new Tone.Part(function (time, note) {
    let currentHarmonyTone = { note: note.note, duration: note.duration };
    // Prevent playing a note if it is same as previous one

    if (
      JSON.stringify(prevHarmonyTone) !== JSON.stringify(currentHarmonyTone)
    ) {
      synthMajor.triggerAttackRelease(note.note, note.duration, time, 0.5);
    }
    prevHarmonyTone = currentHarmonyTone;
  }, harmonyChords).start(0);
}

function constructHarmonyChords() {
  for (let i = 0; i < seconds.length; i++) {
    // defineHarmonyChords(acceleratorZ[i], seconds[i]);
    defineHarmonyChords(force[i], seconds[i]);
  }
}

function defineHarmonyChords(v, seconds) {
  let value = map(parseInt(v), 0, 30, 0, 9);

  if (value < 0) {
    harmonyChords.push({
      time: seconds,
      note: IChord,
      duration: "1n",
    });
  } else if (value > 0 && value <= 1) {
    harmonyChords.push({
      time: seconds,
      note: IIChord,
      duration: "2n",
    });
  } else if (value > 1 && value <= 2) {
    harmonyChords.push({
      time: seconds,
      note: IChord,
      duration: "1n",
    });
  } else if (value > 2 && value <= 3) {
    harmonyChords.push({
      time: seconds,
      note: IIIChord,
      duration: "2n",
    });
  } else if (value > 3 && value <= 4) {
    harmonyChords.push({
      time: seconds,
      note: IVChord,
      duration: "2n",
    });
  } else if (value > 4 && value <= 5) {
    harmonyChords.push({
      time: seconds,
      note: IIIChord,
      duration: "4n",
    });
  } else if (value > 5 && value <= 6) {
    harmonyChords.push({
      time: seconds,
      note: VChord,
      duration: "4n",
    });
  } else if (value > 6 && value <= 7) {
    harmonyChords.push({
      time: seconds,
      note: IVChord,
      duration: "2n",
    });
  } else if (value > 7 && value <= 8) {
    harmonyChords.push({
      time: seconds,
      note: VChord,
      duration: "1n",
    });
  } else if (value > 8 && value < 9) {
    harmonyChords.push({
      time: seconds,
      note: VChord,
      duration: "2n",
    });
  } else {
    return;
  }

  return harmonyChords;
}
