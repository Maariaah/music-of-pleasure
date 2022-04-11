//ACCELERATOR Y - Bass

let bassline = [];
let prevBassNote;

function initializeBass() {
  constructAcceleratorYChords();

  const feedback = new Tone.Chorus({
    frequency: "16n",
    delayTime: 15,
    type: "square",
    depth: 0.2,
    feedback: 0.3,
    spread: 80,
    wet: 0.5,
  }).toMaster();

  const bass = new Tone.MembraneSynth({
    volume: -10,
    pitchDecay: 0.15,
    octaves: 8,
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.001,
      decay: 0.5,
      sustain: 0.01,
      release: 1.4,
      attackCurve: "exponential",
    },
  })
    .connect(feedback)
    .toMaster();

  bassPart = new Tone.Part(function (time, note) {
    if (note.note !== prevBassNote) {
      time > 18 && bass.triggerAttackRelease(note.note, note.duration, time);
    }
    prevBassNote = note.note;
  }, bassline).start(0);

  function constructAcceleratorYChords() {
    for (let i = 0; i < seconds.length; i++) {
      defineAccelYChords(parseInt(gyroscopeY[i]), seconds[i]);
    }
  }

  function defineAccelYChords(v, seconds) {
    let A = "A1";
    let E = "E1";
    let F = "F1";
    let D = "D1";
    let duration1 = "2n";
    let duration2 = "2n.";
    let duration3 = "4n";

    let value = map(v, -16, 26, 0, 5);

    if (value < 0) {
        return;
    } else if (value > 0 && value <= 1) {
      bassline.push({
        time: seconds,
        note: E,
        duration: duration2,
      });
    } else if (value > 2 && value <= 3) {
      bassline.push({
        time: seconds,
        note: F,
        duration: duration2,
      });
    } else if (value > 3.5 && value <= 4) {
      bassline.push({
        time: seconds,
        note: D,
        duration: duration3,
      });
    } else if (value > 4.5 && value <= 5) {
      bassline.push({
        time: seconds,
        note: F,
        duration: duration3,
      });
    } else {
      return;
    }
    return bassline;
  }
}
