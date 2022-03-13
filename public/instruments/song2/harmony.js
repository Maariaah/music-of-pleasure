// FORCE - Harmony
let prevHarmonyTone;
let harmonyChords = [];
let IChord, IIChord, IIIChord, IVChord, VChord, VIChord;

function initializeHarmony() {
  // Define chords

  IChord = constructMajorChord(Ebmajor, 3, "Eb3");
  IIChord = constructMajorChord(Ebmajor, 3, "F3");
  IIIChord = constructMajorChord(Ebmajor, 3, "G3");
  IVChord = constructMajorChord(Ebmajor, 3, "Bb3");
  VChord = constructMajorChord(Ebmajor, 4, "C4");
  VIChord = constructMajorChord(Cmajor, 4, "Eb4");

  // Set Low frequency oscilator

  // Chose frequency between:
  // 396Hz, 417Hz, 444Hz, 528Hz, 639Hz, 741Hz, 852Hz.

  // Use a synth as an instrument to play chords
  synthMajor = new Tone.PolySynth(3, Tone.Synth, {
    volume: -3,
    envelope: {
      decay: 1.5,
      sustain: 0.6,
      release: 2,
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
    defineHarmonyChords(acceleratorY[i], seconds[i]);
  }
}

// 3.2 - 10.2

function defineHarmonyChords(value, seconds) {
  if (value < 3.2) {
    harmonyChords.push({
      time: seconds,
      note: IChord,
      duration: "1n",
    });
  } else if (value > 3.2 && value <= 4.3) {
    harmonyChords.push({
      time: seconds,
      note: IIChord,
      duration: "8n",
    });
  } else if (value > 4.3 && value <= 4.7) {
    harmonyChords.push({
      time: seconds,
      note: IChord,
      duration: "1n",
    });
  } else if (value > 4.7 && value <= 5.2) {
    harmonyChords.push({
      time: seconds,
      note: IIIChord,
      duration: "8n",
    });
  } else if (value > 5.2 && value <= 5.9) {
    harmonyChords.push({
      time: seconds,
      note: IVChord,
      duration: "8n",
    });
  } else if (value > 5.9 && value <= 6.8) {
    harmonyChords.push({
      time: seconds,
      note: IIIChord,
      duration: "1n",
    });
  } else if (value > 7.1 && value <= 7.9) {
    harmonyChords.push({
      time: seconds,
      note: VChord,
      duration: "8n",
    });
  } else if (value > 7.9 && value <= 8.9) {
    harmonyChords.push({
      time: seconds,
      note: IVChord,
      duration: "1n",
    });
  } else if (value > 8.9 && value <= 9.4) {
    harmonyChords.push({
      time: seconds,
      note: VChord,
      duration: "1n",
    });
  } else if (value > 9.4 && value <= 10.2) {
    harmonyChords.push({
      time: seconds,
      note: VIChord,
      duration: "4n",
    });
  } else {
    harmonyChords.push({
      time: seconds,
      note: III,
      duration: "1n",
    });
  }

  return harmonyChords;
}
