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
    volume: -8,
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
      bass.triggerAttackRelease(note.note, note.duration, time);
    }
    prevBassNote = note.note;
  }, bassline).start(0);

  function constructAcceleratorYChords() {
    for (let i = 0; i < seconds.length; i++) {
      defineAccelYChords(parseInt(force[i]), seconds[i]);
    }
  }

  function defineAccelYChords(v, seconds) {
    let newValBass = map(parseInt(v), 0, 63.5, 0, 14);

    let A = "A1";
    let E = "E1";
    let F = "F1";
    let D = "D1";
    let duration1 = "2n";
    let duration2 = "2n.";
    let duration3 = "4n";

    if (newValBass < 8) {
        return;
    } 
    else if (newValBass > 8 && newValBass <= 8.5 ) {
      bassline.push({
        time: seconds,
        note: A,
        duration: duration1,
      });
    }

    else if(newValBass > 8.5 && newValBass <= 9) {
      bassline.push({
        time: seconds,
        note: E,
        duration: duration1,
      });
    }
    else if (newValBass > 9 && newValBass <= 10.5) {
      bassline.push({
        time: seconds,
        note: E,
        duration: duration2,
      });
    }
    else if (newValBass > 11 && newValBass <= 12) {
      bassline.push({
        time: seconds,
        note: E,
        duration: duration1,
      });
    } else if (newValBass > 12.5 && newValBass <= 13.5) {
      bassline.push({
        time: seconds,
        note: A,
        duration: duration2,
      });
    } else if (newValBass > 13.5 && newValBass <= 14) {
      bassline.push({
        time: seconds,
        note: D,
        duration: duration3,
      });
    } else if (newValBass > 14) {
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
