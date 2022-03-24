// FORCE - Harmony
let prevHarmonyTone;
let harmonyChords = [];
let IChord, IIChord, IIIChord, IVChord, VChord;
let countHarmonyNotes = 0;

function initializeHarmony() {
  // Define chords

  IChord = constructMajorChord(Dbmajor, 3, "Db3");
  IIChord = constructMajorChord(Dbmajor, 3, "Eb3");
  IIIChord = constructMajorChord(Dbmajor, 4, "F4");
  IVChord = constructMajorChord(Dbmajor, 4, "Bb3");
  VChord = constructMajorChord(Dbmajor, 4, "Db4");

  // Chose frequency between:
  // 396Hz, 417Hz, 444Hz, 528Hz, 639Hz, 741Hz, 852Hz.

  // Use a synth as an instrument to play chords
  synthMajor = new Tone.PolySynth(2, Tone.Synth, {
    volume: -13,
    oscillator: {
      type: "sine3",
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
      synthMajor.triggerAttackRelease(note.note, note.duration, time);
      prevHarmonyTone = currentHarmonyTone;
    } else {
      if (countHarmonyNotes < 1) {
        synthMajor.triggerAttackRelease(note.note, note.duration, time);
        countHarmonyNotes++;
      } else {
        if (countHarmonyNotes >= 6) {
          countHarmonyNotes = 0;
        }
      }
    }
  }, harmonyChords).start(0);
}

function constructHarmonyChords() {
  for (let i = 0; i < seconds.length; i++) {
    defineHarmonyChords(acceleratorZ[i], seconds[i]);
  }
}

function defineHarmonyChords(v, seconds) {
  let value = map(parseInt(v), 1, 7, 0, 9);

  if (value < 0) {
    harmonyChords.push({
      time: seconds,
      note: IChord,
      duration: "2n",
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
      duration: "2n",
    });
  } else if (value > 2 && value <= 3) {
    harmonyChords.push({
      time: seconds,
      note: IIChord,
      duration: "2n",
    });
  } else if (value > 3 && value <= 4) {
    harmonyChords.push({
      time: seconds,
      note: IIIChord,
      duration: "2n",
    });
  } else if (value > 4 && value <= 5) {
    harmonyChords.push({
      time: seconds,
      note: IVChord,
      duration: "4n",
    });
  } else if (value > 5 && value <= 6) {
    harmonyChords.push({
      time: seconds,
      note: VChord,
      duration: "2n",
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
      duration: "2n",
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
