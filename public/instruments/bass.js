//ACCELERATOR Y - Bass

let bassline = [];
let prevBassNote;

function initializeBass() {
  constructAcceleratorYChords();

  const bass = new Tone.Synth({
    volume: 5,
    oscillator: {
      type: "triangle",
    },
  })
    .toMaster();

  bassPart = new Tone.Part(function (time, note) {
    if (note.note !== prevBassNote) {
      bass.triggerAttackRelease(note.note, note.duration, time);
    }
    prevBassNote = note.note;
  }, bassline).start(0);

  function constructAcceleratorYChords() {
    for (let i = 0; i < seconds.length; i++) {
      defineAccelYChords(parseInt(gyroscopeY[i]), seconds[i]);
    }
  }

  function defineAccelYChords(value, seconds) {
    let A = "A1";
    let E = "E1";
    let F = "F1";
    let D = "D1";
    let duration1 = "2n";
    let duration2 = "2n.";
    let duration3 = "4n";

    if (value < -15) {
      bassline.push({
        time: seconds,
        note: A,
        duration: duration1,
      });
    } else if (value > -15 && value <= -13) {
      bassline.push({
        time: seconds,
        note: E,
        duration: duration2,
      });
    } else if (value > -13 && value <= -10) {
      bassline.push({
        time: seconds,
        note: F,
        duration: duration2,
      });
    } else if (value > -10 && value <= -5) {
      bassline.push({
        time: seconds,
        note: D,
        duration: duration3,
      });
    } else if (value > -5 && value <= 0) {
      bassline.push({
        time: seconds,
        note: F,
        duration: duration3,
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
