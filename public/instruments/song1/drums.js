//TEMPERATURE - Drums and snares

let prevBeat = 0;
let drums_beat = 0;
let snare = 0;
let kickTime = 0;
let snareTime = 0;
let count = 0;
let kicks = [];
let snares = [];
let = prevKick = 0;

function initializeDrums() {
  constructKicksAndSnares(gyroscopeY, seconds);

  // ================== KICK 1 ==================

  const kickDrum = new Tone.Sampler(
    {
      A0: "./mp3/kick0.mp3",
      A1: "./mp3/kick1.mp3",
      A2: "./mp3/kick2.mp3",
      A3: "./mp3/kick3.mp3",
      A4: "./mp3/kick4.mp3",
      A5: "./mp3/kick5.mp3",
    },
    {
      volume: 1,
    }
  ).toMaster();

  kickPart = new Tone.Part(function (time, note) {
    if (time > 26) {
      console.log(note)
      console.log(time);
      if (prevKick !== note.note) {
        kickDrum.triggerAttackRelease(note.note, note.duration, time);
        prevKick = note.note;
      }
    }
  }, kicks).start(0);

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
    volume: -24,
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
    if (parseInt(time) % 2 == 0) {
      snareDrum.triggerAttackRelease("4n", time);
    }
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
  
  if (newVal > 7 && newVal <= 7.5) {
    kicks.push({ note: "A1", duration: "4n.", time: t });
  } else if (newVal > 8 && newVal <= 8.2) {
    kicks.push({ note: "A2", duration: "4n.", time: t });
  } else if (newVal > 8.2 && newVal <= 8.5) {
    kicks.push({ note: "A3", duration: "4n.", time: t });
  } else if (newVal > 8.5 && newVal <= 9) {
    kicks.push({ note: "A4", duration: "4n.", time: t });
  } else if (newVal > 9) {
    kicks.push({ note: "A5", duration: "4n.", time: t });
  } else {
    return;
  }
}
