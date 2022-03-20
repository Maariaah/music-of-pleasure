// FORCE - Harmony
let prevHarmonyTone;
let harmonyChords = [];
let IChord, IIChord, IIIChord, IVChord, VChord;
let countHarmonyNotes = 0;
//https://holistic-songwriting.com/2016/03/13/3-types-of-melodies-you-must-know-tech/
function initializeHarmony() {
  // Define chords

  IChord = constructMajorChord(Amajor, 4, "C3");
  // IIChord = ["D4", "D4", "E4"];
  // IIIChord = ["E4", "E4", "E5"];
  IIChord = constructMajorChord(Amajor, 4, "G3");
  IIIChord = constructMajorChord(Amajor, 4, "A#3");
  IVChord = constructMajorChord(Amajor, 4, "F3");
  VChord = constructMajorChord(Amajor, 4, "G3");
  //VChord =["E5", "E5", "E5"];

  // Chose frequency between:
  // 396Hz, 417Hz, 444Hz, 528Hz, 639Hz, 741Hz, 852Hz.

  // Use a synth as an instrument to play chords
  synthMajor = new Tone.PolySynth(3, Tone.Synth, {
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
      duration: "4n",
    });
  } else if (value > 0 && value <= 1) {
    harmonyChords.push({
      time: timeoutHarmony,
      note: IIChord,
      duration: "4n",
    });
  } else if (value > 1 && value <= 1.5) {
    harmonyChords.push({
      time: timeoutHarmony,
      note: IChord,
      duration: "4n",
    });
  } else if (value > 1.5 && value <= 2) {
    harmonyChords.push({
      time: timeoutHarmony,
      note: IIIChord,
      duration: "4n",
    });
  } else if (value > 2.2 && value <= 2.3) {
    //IVChord.splice("E2", "G3");
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
    VChord.push("E2", "G3");
    harmonyChords.push({
      time: timeoutHarmony,
      note: VChord,
      duration: "4n",
    });
  } else if (value > 2.6 && value <= 3) {
    IVChord.push("D2", "C4");
    harmonyChords.push({
      time: timeoutHarmony,
      note: IVChord,
      duration: "4n",
    });
  } else if (value > 3) {
    VChord.push("F3", "C5");
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
