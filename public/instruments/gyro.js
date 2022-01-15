let highOctaveChords;

function initializeGyro() {
  const highSynth = new Tone.PolySynth(5, Tone.Synth, {
    volume: -16,
    count: 6,
    spread: 80,
    oscillator: {
      type: "fatsawtooth",
    },
  }).toMaster();

  highOctaveChords = [
    { time: 0, note: FChord1, duration: "2n." },
    { time: "0:3", note: VChord1, duration: "4n" },
    { time: "1:0", note: VFChord1, duration: "2n." },
    { time: "1:3", note: VChord1, duration: "4n" },
    { time: "2:0", note: IVChord1, duration: "2n." },
    { time: "2:3", note: VChord1, duration: "4n" },
    { time: "3:0", note: VFChord1, duration: "2n" },
    { time: "3:2", note: VChord1, duration: "4n" },
    { time: "3:3", note: IVChord1, duration: "4n" },
    { time: "4:0", note: FChord1, duration: "2n." },
    { time: "4:3", note: VChord1, duration: "4n" },
    { time: "5:0", note: VFChord1, duration: "2n." },
    { time: "5:3", note: VChord1, duration: "4n" },
    { time: "6:0", note: IVChord1, duration: "2n." },
    { time: "6:3", note: VChord1, duration: "4n" },
    { time: "7:0", note: VFChord1, duration: "2n" },
    { time: "7:2", note: VChord1, duration: "4n" },
    { time: "7:3", note: IVChord1, duration: "4n" },
  ];

  const highOctaveChordPart = new Tone.Part(function (time, note) {
    highSynth.triggerAttackRelease(note.note, note.duration, time, 0.5);
  }, highOctaveChords).start(0);
}
