// FORCE - Harmony
let prevHarmonyTone;
let harmonyChords = [];
let IChord, IIChord, IIIChord, IVChord, VChord, VIChord;

function initializeHarmony() {
  // Define chords

  IChord = constructMajorChord(Dmajor, 3, "D3");
  IIChord = constructMajorChord(Dmajor, 3, "E3");
  IIIChord = constructMajorChord(Dmajor, 3, "F#3");
  IVChord = constructMajorChord(Dmajor, 3, "G3");
  VChord = constructMajorChord(Dmajor, 4, "C#4");
  VIChord = constructMajorChord(Dmajor, 4, "D4");

  // Chose frequency between:
  // 396Hz, 417Hz, 444Hz, 528Hz, 639Hz, 741Hz, 852Hz.

  // Use a synth as an instrument to play chords
  synthMajor = new Tone.PolySynth(3, Tone.Synth, {
    volume: -3,
    oscillator: {
      type: "triangle7"
    }
    // envelope: {
    //   decay: 1.5,
    //   sustain: 0.6,
    //   release: 2,
    // },
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
    defineHarmonyChords(acceleratorX[i], seconds[i]);
  }
}

// -2.5 - 2

function defineHarmonyChords(v, seconds) {

  let value = map(v, -2.5, 2, 0, 9)

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
      duration: "8n",
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
      duration: "8n",
    });
  } else if (value > 3 && value <= 4) {
    harmonyChords.push({
      time: seconds,
      note: IVChord,
      duration: "8n",
    });
  } else if (value > 4 && value <= 5) {
    harmonyChords.push({
      time: seconds,
      note: IIIChord,
      duration: "1n",
    });
  } else if (value > 5 && value <= 6) {
    harmonyChords.push({
      time: seconds,
      note: VChord,
      duration: "8n",
    });
  } else if (value > 6 && value <= 7) {
    harmonyChords.push({
      time: seconds,
      note: IVChord,
      duration: "1n",
    });
  } else if (value > 7 && value <= 8) {
    harmonyChords.push({
      time: seconds,
      note: VChord,
      duration: "1n",
    });
  } else if (value > 8 && value <= 9) {
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
