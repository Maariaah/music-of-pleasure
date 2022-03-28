//TEMPERATURE - Drums and snares

let prevBeat = 0;
let drums_beat = 0;
let snare = 0;
let kickTime = 0;
let snareTime = 0;
let count = 0;
let kicks = [];
let kicks2 = [];
let snares = [];

function initializeDrums() {
  constructKicksAndSnares(gyroscopeY, seconds);

  let drumsEffect = new Tone.Tremolo({
    frequency: 5,
    type: "triangle",
    depth: 0.6,
    spread: 0,
    wet: 0.5,
  }).toMaster();

  // ================== KICK 1 ==================

  kickDrum = new Tone.MembraneSynth({
    volume: -18,
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
    .connect(drumsEffect)
    .toMaster();

  kickPart = new Tone.Part(function (time, note) {
    // if (note.time % 2 == 0) {
      kicks.forEach(i => {
        kickDrum.triggerAttackRelease(note.note, note.duration, i + 1);
      })
    // }
  }, kicks).start(0);

  // ================== KICK 2 ==================

  let drums2Effect = new Tone.AutoPanner({
    frequency: "8n",
    type: "square6",
    depth: 0.8,
    wet: 0.5,
  }).toMaster();

  kickDrum2 = new Tone.MembraneSynth({
    volume: -20,
    pitchDecay: 0.05,
    octaves: 10,
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.001,
      decay: 0.4,
      sustain: 0.01,
      release: 1.4,
      attackCurve: "exponential",
    },
  })
    .connect(drums2Effect)
    .toMaster();

  kickPart2 = new Tone.Part(function (time, note) {
    // if (note.time % 2 == 0) {
    kickDrum2.triggerAttackRelease(note.note, note.duration, time);
    // }
  }, kicks2).start(0);

  // ================== SNARES ==================

  const snaresEffect = new Tone.Chorus({
    frequency: 4,
    delayTime: 16,
    type: "triangle",
    depth: 1,
    feedback: 0.1,
    spread: 80,
    wet: 0.5,
  }).toMaster();

  const snareDrum = new Tone.NoiseSynth({
    volume: -30,
    noise: {
      type: "white",
      playbackRate: 0.3,
    },
    envelope: {
      attackCurve: "exponential",
      attack: 0.003,
      decay: 0.5,
      sustain: 0.2,
      release: 0.1,
    },
  }).connect(snaresEffect);

  snarePart = new Tone.Part(function (time) {
    snareDrum.triggerAttackRelease("4n", time);
  }, snares).start(0);

  function constructKicksAndSnares(value, seconds) {
    for (let i = 0; i < value.length; i++) {
      defineKicksAndSnares(value[i], seconds[i]);
    }
  }
}

function defineKicksAndSnares(value, seconds) {
  let newVal = map(value, -9, 0, 9, 0);
  let t = Number(seconds);

  if (newVal > 7 && newVal <= 8) {
    if (t >= 10) {
      kicks.push({ note: "A1", duration: "8n.", time: t });
    }
  } else if (newVal > 8 && newVal <= 9) {
    if (t >= 20) {
      kicks.push({ note: "A1", duration: "8n.", time: t });
    }
  } else if (newVal > 9) {
    if (t >= 30) {
      kicks.push({ note: "A1", duration: "8n.", time: t });
      kicks2.push({ note: "A1", duration: "4n.", time: t });
    }
  } else {
    return;
  }
}
