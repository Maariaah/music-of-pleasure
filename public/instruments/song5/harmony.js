// FORCE - Harmony
let prevHarmonyTone;
let harmonyChords = [];
let IChord, IIChord, IIIChord, IVChord, VChord;
let countHarmonyNotes = 0;

function initializeHarmony() {
  // Define chords

  IChord = constructMajorChord(Amajor, 3, "A3");
  IIChord = constructMajorChord(Amajor, 3, "C4");
  IIIChord = constructMajorChord(Amajor, 3, "D4");
  IVChord = constructMajorChord(Amajor, 4, "E4");
  VChord = constructMajorChord(Amajor, 5, "F4");

  // Chose frequency between:
  // 396Hz, 417Hz, 444Hz, 528Hz, 639Hz, 741Hz, 852Hz.

  // Use a synth as an instrument to play chords
  synthMajor = new Tone.PolySynth(5, Tone.Synth, {
    volume: -10,
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
      synthMajor.triggerAttackRelease(note.note, note.duration, time);
      countHarmonyNotes = 0;
    } else {
      if (count < 1) {
        synthMajor.triggerAttackRelease(note.note, note.duration, time);
        countHarmonyNotes++;
      } else {
        if (countHarmonyNotes >= 5) {
          countHarmonyNotes = 0;
        }
      }
    }
    prevHarmonyTone = currentHarmonyTone;
  }, harmonyChords).start(0);
}

function constructHarmonyChords() {
  for (let i = 0; i < force.length; i++) {
    defineHarmonyChords(acceleratorY[i], seconds[i]);
  }
}

function defineHarmonyChords(v, timeoutHarmony) {
  //0 - 3.5
  let value = parseInt(v);

  if (value < 0) {
    harmonyChords.push({
      time: timeoutHarmony,
      note: IChord,
      duration: "2n",
    });
  } else if (value > 0 && value <= 1) {
    harmonyChords.push({
      time: timeoutHarmony,
      note: IIChord,
      duration: "2n",
    });
  } else if (value > 1 && value <= 1.5) {
    harmonyChords.push({
      time: timeoutHarmony,
      note: IChord,
      duration: "2n",
    });
  } else if (value > 1.5 && value <= 2) {
    harmonyChords.push({
      time: timeoutHarmony,
      note: IIIChord,
      duration: "4n",
    });
  } else if (value > 2.2 && value <= 2.3) {
    harmonyChords.push({
      time: timeoutHarmony,
      note: IVChord,
      duration: "4n",
    });
  } else if (value > 2.3 && value <= 2.4) {
    harmonyChords.push({
      time: timeoutHarmony,
      note: IIIChord,
      duration: "4n",
    });
    IIIChord.push("A2", "G4");
  } else if (value > 2.4 && value <= 2.6) {
    harmonyChords.push({
      time: timeoutHarmony,
      note: VChord,
      duration: "4n",
    });
    VChord.push("E2", "G3");
  } else if (value > 2.6 && value <= 3) {
    harmonyChords.push({
      time: timeoutHarmony,
      note: IVChord,
      duration: "4n",
    });
    IVChord.push("D2", "C4");
  } else if (value > 3) {
    harmonyChords.push({
      time: timeoutHarmony,
      note: VChord,
      duration: "4n",
    });
  } else {
    return;
  }

  return harmonyChords;
}
