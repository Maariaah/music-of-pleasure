// FORCE - Harmony
let prevHarmonyTone;
let harmonyChords = [];
let IChord, IIChord, IIIChord, IVChord, VChord;

function initializeHarmony() {
  // Define chords
  IChord = constructMajorChord(Cmajor, 5, "E4");
  IIChord = constructMajorChord(Cmajor, 5, "D4");
  IIIChord = constructMajorChord(Cmajor, 5, "C4");
  IVChord = constructMajorChord(Cmajor, 4, "B3");
  VChord = constructMajorChord(Cmajor, 4, "A3");

  // Chose frequency between:
  // 396Hz, 417Hz, 444Hz, 528Hz, 639Hz, 741Hz, 852Hz.

  let harmonyEffect = new Tone.Vibrato({
    frequency: 10,
    depth: 3,
    type: "sine",
    wet: 0.2,
  }).toMaster();

  let harmonyEffect2 = new Tone.JCReverb({
    roomSize: 0.3,
    wet: 0.5,
  }).toMaster();

  let harmonyEffect3 = new Tone.Freeverb({
    "roomSize": 0.95,
    "dampening": 1200,
      "wet": 0.5
  }).toMaster();

  // Use a synth as an instrument to play chords
  synthMajor = new Tone.PolySynth(5, Tone.AMSynth, {
    harmonicity: 2,
    volume: -15,
    oscillator: {
      type: "amsine1",
      modulationType: "sine",
      harmonicity: 1.01,
    },
    envelope: {
      attack: 0.006,
      decay: 4,
      sustain: 0.04,
      release: 2,
    },
    modulation: {
      volume: 13,
      type: "amsine1",
      modulationType: "sine",
      harmonicity: 12,
    },
    modulationEnvelope: {
      attack: 0.006,
      decay: 0.2,
      sustain: 0.2,
      release: 1,
    },
  })
    .connect(harmonyEffect)
    .connect(harmonyEffect2)
    .connect(harmonyEffect3)
    .toMaster();

  // Progression or sequence
  constructHarmonyChords();

  //Use part to encapsulate chords into single unit
  harmonyPart = new Tone.Part(function (time, note) {
    // if (time > 20) {
      let currentHarmonyTone = { note: note.note, duration: note.duration };
      // Prevent playing a note if it is same as previous one

      if (
        JSON.stringify(prevHarmonyTone) !== JSON.stringify(currentHarmonyTone)
      ) {
        synthMajor.triggerAttackRelease(note.note, note.duration, time);
        prevHarmonyTone = currentHarmonyTone;
      }
    // }
  }, harmonyChords).start(0);
}

function constructHarmonyChords() {
  for (let i = 0; i < seconds.length; i++) {
    defineHarmonyChords(acceleratorZ[i], seconds[i]);
  }
}

function defineHarmonyChords(value, seconds) {
  let newVal = map(parseInt(value), -4.25, -9.8, 4.25, 9.8);
  //6 - 7.7

  if (newVal <= 4.24) {
    harmonyChords.push({
      time: seconds,
      note: IChord,
      duration: "2n",
    });
  } else if (newVal > 4.25 && newVal <= 4.5) {
    harmonyChords.push({
      time: seconds,
      note: IIChord,
      duration: "2n",
    });
  } else if (newVal > 4.5 && newVal <= 5) {
    harmonyChords.push({
      time: seconds,
      note: IIChord,
      duration: "4n",
    });
  } else if (newVal > 5 && newVal <= 5.5) {
    harmonyChords.push({
      time: seconds,
      note: IIIChord,
      duration: "2n",
    });
  } else if (newVal > 5.5 && newVal <= 6) {
    harmonyChords.push({
      time: seconds,
      note: IVChord,
      duration: "2n",
    });
  } else if (newVal > 6 && newVal <= 7.7) {
    harmonyChords.push({
      time: seconds,
      note: IIIChord,
      duration: "4n",
    });
  } else if (newVal > 7.7 && newVal <= 8) {
    harmonyChords.push({
      time: seconds,
      note: IVChord,
      duration: "4n",
    });
  } else if (newVal > 8 && newVal <= 8.5) {
    harmonyChords.push({
      time: seconds,
      note: VChord,
      duration: "4n",
    });
  } else if (newVal > 8.5 && newVal <= 9) {
    harmonyChords.push({
      time: seconds,
      note: VChord,
      duration: "8n",
    });
  } else if (newVal > 9 && newVal <= 9.8) {
    harmonyChords.push({
      time: seconds,
      note: VIChord,
      duration: "4n",
    });
  } else if (newVal > 9.8) {
    harmonyChords.push({
      time: seconds,
      note: VIChord,
      duration: "8n",
    });
  } else {
    return;
  }

  return harmonyChords;
}
