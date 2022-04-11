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

function initializeDrums() {
  constructKicksAndSnares(force, seconds);

  kickDrum = new Tone.MembraneSynth({
    volume: -1,
  }).toMaster();

  kickPart = new Tone.Part(function (time, note) {
    kickDrum.triggerAttackRelease(note.note, note.duration, time);
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

  snarePart = new Tone.Part(function (time, note) {

    //snareDrum.triggerAttackRelease("4n", time);
   
  }, snares).start(0);

  function constructKicksAndSnares(force) {
    for (let i = 0; i < force.length; i++) {
      defineKicksAndSnares(force[i]);
    }
  }

  function defineKicksAndSnares(value) {
    let drumsNewVal = map(parseInt(value), 5, 40, 0, 5);

    function mapDrumTime(t) {
      return map(t, 24, 443, 0, drumsSpeed);
    }
    drumsTimeoutID = setTimeout(time, [song5Timeout]);

    if (drumsNewVal > 0 && drumsNewVal < 3) {
      drumsTimeoutID = setTimeout(time, [song5Timeout]);
      kicks.push({
        time: mapDrumTime(drumsTimeoutID),
        note: "C1",
        duration: "4n",
      });
    }
    else if (drumsNewVal > 3) {
      drumsTimeoutID = setTimeout(time, [song5Timeout]);
      kicks.push({
        time: mapDrumTime(drumsTimeoutID),
        note: "C1",
        duration: "4n",
      });
      drumsTimeoutID = setTimeout(time, [song5Timeout]);
      kicks.push({
        time: mapDrumTime(drumsTimeoutID),
        note: "C1",
        duration: "4n",
      });
      drumsTimeoutID = setTimeout(time, [song5Timeout]);
      kicks.push({
        time: mapDrumTime(drumsTimeoutID),
        note: "C1",
        duration: "4n",
      });
    } else {
      return;
    }
  }
}
