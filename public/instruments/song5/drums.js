//TEMPERATURE - Drums and snares

let prevBeat = 0;
let drums_beat = 0;
let snare = 0;
let kickTime = 0;
let snareTime = 0;
// let count = 0;
let drumsTimeoutID;
let drumsNotesCount = 0;
let drumsSpeed = 180;
let kicks = [];
let snares = [];
let prevSnare;
let prevKick;
let count = 0;
let count2 = 0;

function initializeDrums() {
  constructKicksAndSnares(force, seconds);

  const kickDrum = new Tone.Sampler(
    {
      A0: "./mp3/song5/kick0.mp3",
    },
    {
      volume: -12,
    }
  ).toMaster();

  kickPart = new Tone.Part(function (time, note) {
    if (time > 21) {
      // if (prevKick !== note.note) {
        if (count2 < 2) {
          kickDrum.triggerAttackRelease(note.note, note.duration, time);
          count2 ++;
         } else {
          count2 = count2 >= 3 && 0;
         }

      // }
    }
  }, kicks).start(0);

  const snareDrum = new Tone.Sampler(
    {
      A1: "./mp3/song5/kick1.mp3",
    },
    {
      volume: -12,
    }
  ).toMaster();

  snarePart = new Tone.Part(function (time, note) {
     if (count < 1) {
      snareDrum.triggerAttackRelease(note.note, time);
      prevSnare = note.note;
      count ++;
     } else {
      count = count >= 3 && 0;
     }
  }, snares).start(0);

  function constructKicksAndSnares(force) {
    for (let i = 0; i < force.length; i++) {
      defineKicksAndSnares(force[i], seconds[i]);
    }
  }

  function defineKicksAndSnares(value, seconds) {
    let drumsNewVal = map(parseInt(value), 5, 40, 0, 5);

    if (drumsNewVal > 2 && drumsNewVal < 3) {
      kicks.push({
        note: "A0",
        duration: "4n",
        time: seconds,
      });
    }
    if (drumsNewVal > 3 && drumsNewVal < 4) {
      snares.push({
        note: "A1",
        duration: "4n",
        time: seconds,
      });
    } else {
      return;
    }
  }
}
