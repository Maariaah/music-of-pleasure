function initializeBass() {
  const bassline = [
    { time: 0, note: "A0", duration: "2n" },
    { time: "0:3", note: "F0", duration: "2n." },
    { time: "1:3", note: "D0", duration: "2n." },
    { time: "2:3", note: "F0", duration: "1:1" },
  ];

  const bass = new Tone.Synth({
    oscillator: {
      type: "triangle",
    },
  }).toMaster();

  const bassPart = new Tone.Part(function (time, note) {
    bass.triggerAttackRelease(note.note, note.duration, time);
  }, bassline).start(0);
}
