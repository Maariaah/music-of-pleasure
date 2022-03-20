// FORCE - Harmony
let prevHarmonyTone;
let harmonyChords = [];
let IChord, IIChord, IIIChord, IVChord, VChord;
let countHarmonyNotes = 0;
let harmonyTimeoutID;
let harmonySpeed = 190;

//https://holistic-songwriting.com/2016/03/13/3-types-of-melodies-you-must-know-tech/
function initializeHarmony() {
  // Define chords

  IChord = constructMajorChord(Amajor, 3, "C3");
  // IIChord = ["D4", "D4", "E4"];
  // IIIChord = ["E4", "E4", "E5"];
  IIChord = constructMajorChord(Amajor, 3, "G3");
  IIIChord = constructMajorChord(Amajor, 3, "Ab3");
  IVChord = constructMajorChord(Amajor, 3, "F3");
  VChord = constructMajorChord(Amajor, 4, "G3");
  //VChord =["E5", "E5", "E5"];

  // Chose frequency between:
  // 396Hz, 417Hz, 444Hz, 528Hz, 639Hz, 741Hz, 852Hz.

  // Use a synth as an instrument to play chords
  synthHarmony = new Tone.PolySynth(3, Tone.Synth, {
    volume: -5,
    oscillator: {
      type: "triangle",
    },
  }).toMaster();

  // Progression or sequence
  constructHarmonyChords();

  //Use part to encapsulate chords into single unit
  harmonyPart = new Tone.Part(function (time, note) {
    // Prevent playing a note if it is same as previous one

    if (
      (countHarmonyNotes < 2 && note.number === 0) ||
      (countHarmonyNotes < 3 && note.number === 1) ||
      (countHarmonyNotes < 4 && note.number === 2) ||
      (countHarmonyNotes < 4 && note.number === 3) ||
      (countHarmonyNotes < 4 && note.number === 4) ||
      (countHarmonyNotes < 4 && note.number === 5) ||
      (countHarmonyNotes < 3 && note.number === 6) ||
      (countHarmonyNotes < 7 && note.number === 8) ||
      (countHarmonyNotes < 5 && note.number === 9)
    ) {
      synthHarmony.triggerAttackRelease(note.note, note.duration, time);
      countHarmonyNotes++;
    } else {
      if (
        (countHarmonyNotes === 2 && note.number === 0) ||
        (countHarmonyNotes === 3 && note.number === 1) ||
        (countHarmonyNotes === 4 && note.number === 2) ||
        (countHarmonyNotes === 4 && note.number === 3) ||
        (countHarmonyNotes === 4 && note.number === 4) ||
        (countHarmonyNotes === 4 && note.number === 5) ||
        (countHarmonyNotes === 3 && note.number === 6) ||
        (countHarmonyNotes === 7 && note.number === 8) ||
        (countHarmonyNotes === 5 && note.number === 9)
      ) {
        countHarmonyNotes = 0;
      }
    }
  }, harmonyChords).start(0);
}

function constructHarmonyChords() {
  for (let i = 0; i < force.length; i++) {
    defineHarmonyChords(acceleratorY[i]);
  }
}

function defineHarmonyChords(value) {
  // Set the rythm

  let newVal = map(parseInt(value), 0, 3.5, 0, 5);
  function mapHarmonyTime(t) {
    return map(t, 24, 443, 0, harmonySpeed);
  }

  //  =================== SET THE RYTHM  ========================
  // Refren je odredjen brojem nota ovde

  if (newVal <= 0) {
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IChord,
      duration: "1n",
      number: 0,
    });
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IIChord,
      duration: "1n",
      number: 0,
    });
  } else if (newVal > 0 && newVal <= 1) {
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IChord,
      duration: "1n",
      number: 1,
    });
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IIIChord,
      duration: "1n",
      number: 1,
    });
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IIIChord,
      duration: "2n",
      number: 1,
    });
  } else if (newVal > 1 && newVal <= 2) {
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IIIChord,
      duration: "4n",
      number: 2,
    });
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IIChord,
      duration: "1n",
      number: 2,
    });
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IIIChord,
      duration: "4n",
      number: 2,
    });
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IChord,
      duration: "4n",
      number: 2,
    });
  } else if (newVal > 2 && newVal <= 2.5) {
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IIChord,
      duration: "2n",
      number: 3,
    });
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);

    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IIIChord,
      duration: "2n",
      number: 3,
    });
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);

    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IChord,
      duration: "1n",
      number: 3,
    });
  } else if (newVal > 2 && newVal <= 3) {
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IVChord,
      duration: "2n",
      number: 4,
    });
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IIIChord,
      duration: "4n",
      number: 4,
    });
  } else if (newVal > 3 && newVal <= 4) {
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IVChord,
      duration: "2n",
      number: 6,
    });
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
  } else if (newVal > 4 && newVal <= 5) {
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IIIChord,
      duration: "2n",
      number: 8,
    });
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IVChord,
      duration: "4n",
      number: 8,
    });
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: VChord,
      duration: "8n",
      number: 8,
    });
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IChord,
      duration: "4n",
      number: 8,
    });

    harmonyTimeoutID = setTimeout(time, [song5Timeout]);
    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IVChord,
      duration: "4n",
      number: 9,
    });
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);

    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: VChord,
      duration: "8n",
      number: 9,
    });
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);

    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IVChord,
      duration: "8n",
      number: 9,
    });
    harmonyTimeoutID = setTimeout(time, [song5Timeout]);

    harmonyChords.push({
      time: mapHarmonyTime(harmonyTimeoutID),
      note: IIIChord,
      duration: "4n",
      number: 9,
    });
  } else {
    return;
  }

  return harmonyChords;
}
