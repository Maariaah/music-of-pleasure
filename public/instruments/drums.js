//TEMPERATURE - Drums and snares

let prevBeat = 0;
let drums_beat = 0;
let snare = 0;
let kickTime = 0;
let snareTime = 0;
let count = 0;

function initializeDrums() {
  let kicks = [];
  let snares = [];

  constructKicksAndSnares(force, seconds);

  kickDrum = new Tone.MembraneSynth({
    volume: -1,
  }).toMaster();

  kickPart = new Tone.Part(function (time) {
    let roundTime = Math.floor(time);

    // if (roundTime % 2 == 0) {
    if (kickTime !== roundTime) {
      kickDrum.triggerAttackRelease("C1", "2n", time);
    }
    kickTime = roundTime;
    // }
  }, kicks).start(0);

  const lowPass = new Tone.Filter({
    frequency: 8000,
  }).toMaster();

  const snareDrum = new Tone.NoiseSynth({
    volume: -15,
    noise: {
      type: "white",
      playbackRate: 3,
    },
    envelope: {
      attack: 0.001,
      decay: 0.2,
      sustain: 0.15,
      release: 0.03,
    },
  }).connect(lowPass);

  snarePart = new Tone.Part(function (time) {
    let roundTime = Math.floor(time);

    if (snareTime !== roundTime) {
      if (count > 3) {
        snareDrum.triggerAttackRelease("4n", time);
        count = 0;
      }
      count++;
    }
    snareTime = roundTime;
  }, snares).start(0);

  function constructKicksAndSnares(force, seconds) {
    for (let i = 0; i < force.length; i++) {
      let time = Number(seconds[i]);

       if (force[i] > 27) {
        kicks.push(time);
        snares.push(time + 1);
       }
    }
  }
}
