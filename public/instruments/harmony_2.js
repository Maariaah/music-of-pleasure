// FORCE - Harmony
let prevHarmony2Tone;
let harmony2Chords = [];
let IChord, IIChord, IIIChord, IVChord, VChord;

function initializeHarmony2() {
  // Define chords
  IChord = constructMajorChord(Cmajor, 2, "C2");
  IIChord = constructMajorChord(Cmajor, 3, "C3");
  IIIChord = constructMajorChord(Cmajor, 3, "G3");
  IVChord = constructMajorChord(Cmajor, 4, "B3");
  VChord = constructMajorChord(Cmajor, 4, "C4");

  // Set Low frequency oscilator
  // lfo = new Tone.LFO("4n", 100, 1000);

  // Chose frequency between:
  // 396Hz, 417Hz, 444Hz, 528Hz, 639Hz, 741Hz, 852Hz.

  // var effect1 = new Tone.FeedbackDelay({
  //   delayTime: "16n",
  //   feedback: 0.1,
  //   wet: 0.5,
  // }).toMaster();

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
  constructHarmony2Chords();

  //Use part to encapsulate chords into single unit
  majorPart = new Tone.Part(function (time, note) {
    let currentHarmony2Tone = { note: note.note, duration: note.duration };
    // Prevent playing a note if it is same as previous one
    if (
      JSON.stringify(prevHarmony2Tone) !== JSON.stringify(currentHarmony2Tone)
    ) {
      synthMajor.triggerAttackRelease(note.note, note.duration, time, 0.5);
    }
    prevHarmony2Tone = currentHarmony2Tone;
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
      note: IChord,
      duration: "8n",
    });
  } else if (value > 1.2 && value <= 2.5) {
    harmony2Chords.push({
      time: seconds,
      note: IIChord,
      duration: "8n",
    });
  } else if (value > 2.5 && value <= 3.45) {
    harmony2Chords.push({
      time: seconds,
      note: IChord,
      duration: "1n",
    });
  } else if (value > 3.55 && value <= 4.5) {
    harmony2Chords.push({
      time: seconds,
      note: IIIChord,
      duration: "8n",
    });
  } else if (value > 4.5 && value <= 5.6) {
    harmony2Chords.push({
      time: seconds,
      note: IVChord,
      duration: "8n",
    });
  } else if (value > 5.6 && value <= 7.2) {
    harmony2Chords.push({
      time: seconds,
      note: IIIChord,
      duration: "1n",
    });
  } else if (value > 7.2 && value <= 8) {
    harmony2Chords.push({
      time: seconds,
      note: VChord,
      duration: "8n",
    });
  } else if (value > 8 && value <= 9) {
    harmony2Chords.push({
      time: seconds,
      note: IVChord,
      duration: "1n",
    });
  } else if (value > 9) {
    harmony2Chords.push({
      time: seconds,
      note: VChord,
      duration: "1n",
    });
  } else {
    harmony2Chords.push({
      time: seconds,
      note: IIChord,
      duration: "1n",
    });
  }

  return harmony2Chords;
}
