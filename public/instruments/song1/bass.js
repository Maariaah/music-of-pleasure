//ACCELERATOR Y - Bass

let bassline = [];
let prevBassNote;
let kicks2 = [];

function initializeBass() {
  constructAcceleratorYChords();

  const kickDrum2 = new Tone.Sampler(
    {
      A3: "./mp3/kick3.mp3",
    },
    {
      volume: 1,
    }
  ).toMaster();

  const bass = new Tone.Synth({
    volume: 10,
    oscillator: {
      type: "triangle",
    },
  })
    .toMaster();

    kick2Part = new Tone.Part(function (time, note) {

        kickDrum2.triggerAttackRelease(note.note, note.duration, time);

    }, kicks2).start(0);

  bassPart = new Tone.Part(function (time, note) {
    if (note.note !== prevBassNote) {
      time < 20 && bass.triggerAttackRelease(note.note, note.duration, time);
    }
    prevBassNote = note.note;
  }, bassline).start(0);

  function constructAcceleratorYChords() {
    for (let i = 0; i < seconds.length; i++) {
      defineAccelYChords(parseInt(gyroscopeX[i]), seconds[i]);
    }
  }

  function defineAccelYChords(v, seconds) {
    let value = map(parseInt(v), 0, 20, 0, 16);

    let A = "A1";
    let E = "E1";
    let F = "F1";
    let D = "D1";
    let duration1 = "2n";
    let duration2 = "2n.";
    let duration3 = "4n";

    if (value < 0) {
      bassline.push({
        time: seconds,
        note: A,
        duration: duration1,
      });
    } else if (value > 0 && value <= 4) {
      bassline.push({
        time: seconds,
        note: E,
        duration: duration2,
      });
    } else if (value > 4 && value <= 6) {
      bassline.push({
        time: seconds,
        note: F,
        duration: duration2,
      });
      kicks2.push({ note: "A3", duration: "4n", time: seconds });

    } else if (value > 6 && value <= 9) {
      bassline.push({
        time: seconds,
        note: D,
        duration: duration3,
      });
    } else if (value > 9 && value <= 16) {
      bassline.push({
        time: seconds,
        note: F,
        duration: duration3,
      });
      kicks2.push({ note: "A3", duration: "4n", time: seconds });

    } else {
      return;
    }
    return bassline;
  }
}
