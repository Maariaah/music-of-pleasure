// FORCE - Harmony
let prevHarmonyTone;
let harmonyChords = [];
let IChord, IIChord, IIIChord, IVChord, VChord;

function initializeHarmony() {
  // Define chords
  IChord = constructMajorChord(Cmajor, 2, "C2");
  IIChord = constructMajorChord(Cmajor, 3, "C3");
  IIIChord = constructMajorChord(Cmajor, 3, "G3");
  IVChord = constructMajorChord(Cmajor, 4, "B3");
  VChord = constructMajorChord(Cmajor, 4, "C4");

  // Chose frequency between:
  // 396Hz, 417Hz, 444Hz, 528Hz, 639Hz, 741Hz, 852Hz.

  // Use a synth as an instrument to play chords
  synthMajor = new Tone.PolySynth(3, Tone.Synth, {
    volume: -4,
    envelope: {
      decay: 1,
      sustain: 0.4,
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
    defineHarmonyChords(acceleratorX[i], seconds[i]);
  }
}

function defineHarmonyChords(value, seconds) {
  if (value > 0 && value <= 1.2) {
    harmonyChords.push({
      time: seconds,
      note: IChord,
      duration: "8n",
    });
  } else if (value > 1.2 && value <= 2.5) {
    harmonyChords.push({
      time: seconds,
      note: IIChord,
      duration: "8n",
    });
  } else if (value > 2.5 && value <= 3.45) {
    harmonyChords.push({
      time: seconds,
      note: IChord,
      duration: "1n",
    });
  } else if (value > 3.55 && value <= 4.5) {
    harmonyChords.push({
      time: seconds,
      note: IIIChord,
      duration: "8n",
    });
  } else if (value > 4.5 && value <= 5.6) {
    harmonyChords.push({
      time: seconds,
      note: IVChord,
      duration: "8n",
    });
  } else if (value > 5.6 && value <= 7.2) {
    harmonyChords.push({
      time: seconds,
      note: IIIChord,
      duration: "1n",
    });
  } else if (value > 7.2 && value <= 8) {
    harmonyChords.push({
      time: seconds,
      note: VChord,
      duration: "8n",
    });
  } else if (value > 8 && value <= 9) {
    harmonyChords.push({
      time: seconds,
      note: IVChord,
      duration: "1n",
    });
  } else if (value > 9) {
    harmonyChords.push({
      time: seconds,
      note: VChord,
      duration: "1n",
    });
  } else {
    harmonyChords.push({
      time: seconds,
      note: IIIChord,
      duration: "1n",
    });
  }

  return harmonyChords;
}
