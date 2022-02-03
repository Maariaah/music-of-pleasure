//ACCELERATOR Y - Bass

let bassline = [];
let prevBassNote;

function initializeBass() {
  constructAcceleratorYChords();

  const bass = new Tone.Synth({
    volume: 7,
    oscillator: {
      type: "triangle",
    },
  })
    .connect(env)
    .toMaster();

  bassPart = new Tone.Part(function (time, note) {
    if (note.note !== prevBassNote) {
      bass.triggerAttackRelease(note.note, note.duration, time);
    }
    prevBassNote = note.note;
  }, bassline).start(0);

  function constructAcceleratorYChords() {
    for (let i = 0; i < seconds.length; i++) {
      defineAccelYChords(parseInt(acceleratorX[i] * 10), seconds[i]);
    }
  }

  function defineAccelYChords(value, seconds) {
    let A = "A0";
    let E = "E0";
    let F = "F0";
    let D = "D0";
    let duration1 = "2n";
    let duration2 = "2n.";
    let duration3 = "1:1";

    if (value <= -100) {
      bassline.push({
        time: seconds,
        note: A,
        duration: duration1,
      });
    }
    if (value > -100 && value <= 50) {
      bassline.push({
        time: seconds,
        note: A,
        duration: duration2,
      });
    }
    if (value > -50 && value <= -20) {
      bassline.push({
        time: seconds,
        note: F,
        duration: duration2,
      });
    }
    if (value > -20 && value <= -0) {
      bassline.push({
        time: seconds,
        note: F,
        duration: duration3,
      });
    }

    if (value > 0 && value <= 20) {
      bassline.push({
        time: seconds,
        note: F,
        duration: duration3,
      });
    }
    if (value > 20 && value <= 50) {
      bassline.push({
        time: seconds,
        note: D,
        duration: duration2,
      });
    }
    if (value > 50 && value <= 100) {
      bassline.push({
        time: seconds,
        note: A,
        duration: duration1,
      });
    } else {
      bassline.push({
        time: seconds,
        note: E,
        duration: duration1,
      });
    }
    return bassline;
  }
}
