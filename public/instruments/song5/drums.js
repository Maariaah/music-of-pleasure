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
    volume: -6,
  })
    .toMaster();

  kickPart = new Tone.Part(function (time) {
    let roundTime = Math.floor(time);

    if (kickTime !== roundTime) {
      kickDrum.triggerAttackRelease("C1", "8n", time);
    }
    kickTime = roundTime;
  }, kicks).start(0);

  const lowPass = new Tone.Filter({
    frequency: 8000,
  }).toMaster();

  const snareDrum = new Tone.NoiseSynth({
    volume: -12,
    noise: {
      type: "black",
      playbackRate: 3,
    },
    envelope: {
      attack: 0.001,
      decay: 0.1,
      sustain: 0.15,
      release: 0.03,
    },
  }).connect(lowPass);

  snarePart = new Tone.Part(function (time) {
    let roundTime = Math.floor(time);

    if (snareTime !== roundTime) {
      if (count > 1) {
        snareDrum.triggerAttackRelease("2n", time);
        count = 0;
      }
      count++;
    }
    snareTime = roundTime;
  }, snares).start(0);

  function constructKicksAndSnares(force, seconds) {
    for (let i = 0; i < force.length; i++) {
      let time = Number(seconds[i]);
      let newVal = map(parseInt(force[i]), 30, 38, 0, 5);

      if (newVal > 0) {
        kicks.push(time);
        snares.push(time + 1);
      }
    }
  }
}
