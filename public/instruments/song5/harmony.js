// FORCE - Harmony
let prevHarmonyTone;
let harmonyChords = [];
let IChord, IIChord, IIIChord, IVChord, VChord;
let countHarmonyNotes = 0;
//https://holistic-songwriting.com/2016/03/13/3-types-of-melodies-you-must-know-tech/
function initializeHarmony() {
  // Define chords

  IChord = constructMajorChord(Amajor, 3, "A3");
  IIChord = constructMajorChord(Amajor, 3, "G3");
  IIIChord = constructMajorChord(Amajor, 3, "F3");
  IVChord = constructMajorChord(Amajor, 3, "A4");
  VChord = constructMajorChord(Amajor, 4, "G3");

  // Chose frequency between:
  // 396Hz, 417Hz, 444Hz, 528Hz, 639Hz, 741Hz, 852Hz.

  // Use a synth as an instrument to play chords
  synthMajor = new Tone.PolySynth(3, Tone.Synth, {
    volume: -18,
    oscillator: {
      type: "square6",
    },
  }).toMaster();

  // Progression or sequence
  constructHarmonyChords();

  //Use part to encapsulate chords into single unit
  harmonyPart = new Tone.Part(function (time, note) {
    let currentHarmonyTone = { note: note.note, duration: note.duration };
    // Prevent playing a note if it is same as previous one
    if (time > 15) {
      if (
        JSON.stringify(prevHarmonyTone) !== JSON.stringify(currentHarmonyTone)
      ) {
        synthMajor.triggerAttackRelease(note.note, note.duration, time);
        countHarmonyNotes = 0;
        if (countHarmonyNotes >= 5) {
          countHarmonyNotes = 0;
        }
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
    harmonyChords.push({
      time: timeoutHarmony,
      note: IVChord,
      duration: "4n",
    });
  } else if (value > 2.3 && value <= 2.4) {
    harmonyChords.push({
      time: timeoutHarmony,
      note: IIIChord,
      duration: "8n",
    });
  } else if (value > 2.4 && value <= 2.6) {
    harmonyChords.push({
      time: timeoutHarmony,
      note: VChord,
      duration: "8n",
    });
  } else if (value > 2.6 && value <= 3) {
    harmonyChords.push({
      time: timeoutHarmony,
      note: IVChord,
      duration: "16n",
    });
  } else if (value > 3) {
    harmonyChords.push({
      time: timeoutHarmony,
      note: VChord,
      duration: "16n",
    });
  } else {
    return;
  }

  return harmonyChords;
}
