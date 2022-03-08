//TEMPERATURE - Drums and snares

let prevBeat = 0;
let drums_beat = 0;
let snare = 0;

function initializeDrums() {
  let kicks = [];
  let snares = [];
  let forcePick1 = 32.5;
  let forcePick2 = 35;

  constructKicksAndSnares(force, seconds);

  kickDrum = new Tone.MembraneSynth({
    volume: -8,
  }).toMaster();

  kickPart = new Tone.Part(function (time) {
    kickDrum.triggerAttackRelease("C1", "4n", time);
  }, kicks).start(0);

  const lowPass = new Tone.Filter({
    frequency: 8000,
  }).toMaster();

  const snareDrum = new Tone.NoiseSynth({
    volume: -20,
    noise: {
      type: "pink",
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
    snareDrum.triggerAttackRelease("2n", time);
  }, snares).start(0);

  function constructKicksAndSnares(force, seconds) {
    for (let i = 0; i < force.length; i++) {
      drums_beat = parseFloat(force[i]).toFixed(2);

      // if (prevBeat !== drums_beat) {
      if (force[i] > forcePick1) {
        kicks.push(seconds[i]);
      }
      if (force[i] > forcePick2) {
        snares.push(Number(seconds[i]) + 1);
        kicks.push(seconds[i]);
        kicks.push(seconds[i] + 0.5);
      }
      // }
      prevBeat = drums_beat;
    }
  }
}
