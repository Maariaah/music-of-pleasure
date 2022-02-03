//TEMPERATURE - Drums and snares

let prevBeat = 0;
let beat = 0;
let snare = 0;

function initializeDrums() {
  let kicks = [];
  let snares = [];

  constructKicksAndSnares();

  kickDrum = new Tone.MembraneSynth({
    volume: -10,
  }).toMaster();

  kickPart = new Tone.Part(function (time) {
    kickDrum.triggerAttackRelease("C2", "8n.", time);
  }, kicks).start(0);

  const lowPass = new Tone.Filter({
    frequency: 8000,
  }).toMaster();

  const snareDrum = new Tone.NoiseSynth({
    volume: -35,
    noise: {
      type: "white",
      playbackRate: 3,
    },
    envelope: {
      attack: 0.001,
      decay: 0.2,
      sustain: 0.005,
      release: 0.03,
    },
  }).connect(lowPass)


  snarePart = new Tone.Part(function (time) {
    snareDrum.triggerAttackRelease("4n", time);
  }, snares).start(0);

  function constructKicksAndSnares() {
    for (let i = 0; i < seconds.length; i++) {
      beat = parseFloat(temperature[i]).toFixed(2);

      if (prevBeat !== beat) {
        kicks.push(seconds[i]);
        snares.push(Number(seconds[i]) + 0.6);
      }
      prevBeat = beat;
    }
  }
}
