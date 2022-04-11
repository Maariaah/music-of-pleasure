// FORCE - Melody
var effect1, effect2, effect3;
let previousTime = 0;
let secondsDouble = 0;
let mainChords = [];
let prevSeconds = 0;
let prevNumber;
let melodyTimeoutID;
let malodyNotesCount = 0;
let melodySpeed = 180;
let kicks = [];
let snares = [];
let = prevKick = 0;

I = "A3";
II = "A#3";
III = "C4";
IV = "D4";
V = "D#4";

function initializeMelody1() {
  // create effects
  let effect1 = new Tone.FeedbackDelay({
    delayTime: "8n",
    feedback: 0.2,
    wet: 0.5,
  }).toMaster();

  // Use a simple Synth as the instrument
  synthMelody = new Tone.Synth({
    oscillator: {
      type: "fatcustom",
      partials: [0.2, 1, 0, 0.5, 0.1],
      spread: 40,
      count: 3,
    },
    volume: -5,
    envelope: {
      attack: 0.001,
      decay: 1.6,
      sustain: 0,
      release: 1.6,
    },
  })
   .connect(effect1)
    .toMaster();

  constructMelodyChords();

  melodyPart = new Tone.Part(function (time, note) {
    // Prevent playing a note if it is same as previous one
    window.note = window.note + 1;

    if (
      (malodyNotesCount < 2 && note.number === 0) ||
      (malodyNotesCount < 3 && note.number === 1) ||
      (malodyNotesCount < 4 && note.number === 2) ||
      (malodyNotesCount < 4 && note.number === 3) ||
      (malodyNotesCount < 4 && note.number === 4) ||
      (malodyNotesCount < 4 && note.number === 5) ||
      (malodyNotesCount < 3 && note.number === 6) ||
      (malodyNotesCount < 7 && note.number === 8) ||
      (malodyNotesCount < 5 && note.number === 9)
    ) {
      synthMelody.triggerAttackRelease(note.note, note.duration, time);
      malodyNotesCount++;
    } else {
      if (
        (malodyNotesCount === 2 && note.number === 0) ||
        (malodyNotesCount === 3 && note.number === 1) ||
        (malodyNotesCount === 4 && note.number === 2) ||
        (malodyNotesCount === 4 && note.number === 3) ||
        (malodyNotesCount === 4 && note.number === 4) ||
        (malodyNotesCount === 4 && note.number === 5) ||
        (malodyNotesCount === 3 && note.number === 6) ||
        (malodyNotesCount === 7 && note.number === 8) ||
        (malodyNotesCount === 5 && note.number === 9)
      ) {
        malodyNotesCount = 0;
      }
    }
  }, mainChords).start(0);

  const kickDrum = new Tone.Sampler(
    {
      A0: "./mp3/song5/kick0.mp3",
      A1: "./mp3/song5/kick1.mp3",
    },
    {
      volume: -12,
    }
  ).toMaster();

  kickPart = new Tone.Part(function (time, note) {
    if (time > 30) {
      //  if (prevKick !== note.note) {
      kickDrum.triggerAttackRelease(note.note, note.duration, time);
      // prevKick = note.note;
      //  }
    }
  }, kicks).start(0);

  function constructMelodyChords() {
    for (let i = 0; i < force.length; i++) {
      defineMelodyChords(force[i]);
    }
  }

  const snareDrum = new Tone.Sampler(
    {
      C0: "./mp3/song5/snares.mp3",
    },
    {
      volume: -12,
    }
  ).toMaster();

  snarePart = new Tone.Part(function (time, note) {
    snareDrum.triggerAttackRelease(note.note, time);
  }, snares).start(0);

  function defineMelodyChords(value) {
    // Set the rythm
    let time = date.getSeconds();
    let melodyNewVal = map(parseInt(value), 5, 40, 0, 5);
    function mapTime(t) {
      return map(t, 24, 443, 0, melodySpeed);
    }
    //  =================== SET THE RYTHM  ========================
    // Refren je odredjen brojem nota ovde

    if (melodyNewVal <= 0) {
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: I,
        duration: "2n",
        number: 0,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: IV,
        duration: "4n",
        number: 0,
      });
    } else if (melodyNewVal > 0 && melodyNewVal <= 1) {
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: I,
        duration: "2n",
        number: 1,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      kicks.push({
        note: "A0",
        duration: "4n.",
        time: mapTime(melodyTimeoutID),
      });
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: V,
        duration: "8n",
        number: 1,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      kicks.push({
        note: "A1",
        duration: "4n.",
        time: mapTime(melodyTimeoutID),
      });
    } else if (melodyNewVal > 1 && melodyNewVal <= 2) {
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: III,
        duration: "6n",
        number: 2,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: II,
        duration: "4n",
        number: 2,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: III,
        duration: "6n",
        number: 2,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      kicks.push({
        note: "A1",
        duration: "4n.",
        time: mapTime(melodyTimeoutID),
      });
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: I,
        duration: "8n",
        number: 2,
      });
    } else if (melodyNewVal > 2 && melodyNewVal <= 2.5) {
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: III,
        duration: "6n",
        number: 3,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      kicks.push({
        note: "A0",
        duration: "4n.",
        time: mapTime(melodyTimeoutID),
      });
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: V,
        duration: "8n",
        number: 3,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: III,
        duration: "6n",
        number: 3,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: I,
        duration: "4n",
        number: 3,
      });
    } else if (melodyNewVal > 2.5 && melodyNewVal <= 3) {
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: IV,
        duration: "4n",
        number: 4,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: III,
        duration: "8n",
        number: 4,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      kicks.push({
        note: "A1",
        duration: "4n.",
        time: mapTime(melodyTimeoutID),
      });
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: V,
        duration: "6n",
        number: 4,
      });
    } else if (melodyNewVal > 3 && melodyNewVal <= 3.5) {
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: I,
        duration: "4n",
        number: 5,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: III,
        duration: "4n",
        number: 5,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: IV,
        duration: "4n",
        number: 5,
      });
    } else if (melodyNewVal > 3.5 && melodyNewVal <= 4) {
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: III,
        duration: "6n",
        number: 6,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      kicks.push({
        note: "A0",
        duration: "4n.",
        time: mapTime(melodyTimeoutID),
      });
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: II,
        duration: "8n",
        number: 6,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: III,
        duration: "6n",
        number: 6,
      });
    } else if (melodyNewVal > 4 && melodyNewVal <= 5) {
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: IV,
        duration: "4n",
        number: 6,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: V,
        duration: "8n",
        number: 8,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: III,
        duration: "4n",
        number: 8,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: II,
        duration: "4n",
        number: 8,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: IV,
        duration: "8n",
        number: 8,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      kicks.push({
        note: "A0",
        duration: "4n.",
        time: mapTime(melodyTimeoutID),
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      snares.push({
        note: "C0",
        time: mapTime(melodyTimeoutID),
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: V,
        duration: "16n",
        number: 8,
      });

      melodyTimeoutID = setTimeout(time, [song5Timeout]);

      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: IV,
        duration: "8n",
        number: 8,
      });

      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: I,
        duration: "4n",
        number: 8,
      });
    } else if (melodyNewVal > 5) {
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: III,
        duration: "4n",
        number: 9,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      kicks.push({
        note: "A0",
        duration: "4n.",
        time: mapTime(melodyTimeoutID),
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      kicks.push({
        note: "A1",
        duration: "4n.",
        time: mapTime(melodyTimeoutID),
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: IV,
        duration: "8n",
        number: 9,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      snares.push({
        note: "C0",
        time: mapTime(melodyTimeoutID),
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      kicks.push({
        note: "A1",
        duration: "4n.",
        time: mapTime(melodyTimeoutID),
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: V,
        duration: "16n",
        number: 9,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      kicks.push({
        note: "A0",
        duration: "4n.",
        time: mapTime(melodyTimeoutID),
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      kicks.push({
        note: "A1",
        duration: "4n.",
        time: mapTime(melodyTimeoutID),
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: IV,
        duration: "8n",
        number: 9,
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      snares.push({
        note: "C0",
        time: mapTime(melodyTimeoutID),
      });
      melodyTimeoutID = setTimeout(time, [song5Timeout]);
      mainChords.push({
        time: mapTime(melodyTimeoutID),
        note: III,
        duration: "4n",
        number: 9,
      });
    } else {
      return;
    }
  }
}
