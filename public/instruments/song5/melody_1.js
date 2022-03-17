// FORCE - Melody
let prevMelodyTone;
let lfo;
var effect1, effect2, effect3;
let count = 0;
let previousTime = 0;
let secondsDouble = 0;
let mainChords = [];
let prevSeconds = 0;
let date = new Date();
let time = date.getSeconds();
let prevNumber;

I = "A3";
II = "A#3";
III = "C4";
IV = "D4";
V = "D#4";

function initializeMelody1() {
  // Use a simple Synth as the instrument
  let synthMelody = new Tone.Synth({
    volume: -5,
    oscillator: {
      type: "triangle",
    },
  }).toMaster();

  constructMelodyChords();

  melodyPart = new Tone.Part(function (time, note) {
    // console.log(note.number, note);
    // Prevent playing a note if it is same as previous one

    // synthMelody.triggerAttackRelease(note.note, note.duration, time);

    if (
      (count < 2 && note.number === 0) ||
      (count < 3 && note.number === 1) ||
      (count < 4 && note.number === 2) ||
      (count < 4 && note.number === 3) ||
      (count < 4 && note.number === 4) ||
      (count < 4 && note.number === 5) ||
      (count < 3 && note.number === 6) ||
      (count < 7 && note.number === 8) ||
      (count < 5 && note.number === 9)
    ) {
      synthMelody.triggerAttackRelease(note.note, note.duration, time);
      count++;
    } else {
      if (
        (count === 2 && note.number === 0) ||
        (count === 3 && note.number === 1) ||
        (count === 4 && note.number === 2) ||
        (count === 4 && note.number === 3) ||
        (count === 4 && note.number === 4) ||
        (count === 4 && note.number === 5) ||
        (count === 3 && note.number === 6) ||
        (count === 7 && note.number === 8) ||
        (count === 5 && note.number === 9)
      ) {
        count = 0;
      }
    }
  }, mainChords).start(0);

  function constructMelodyChords() {
    for (let i = 0; i < force.length; i++) {
      defineMelodyChords(force[i]);
    }
  }

  function secondsToTime(e) {
    var h = Math.floor(e / 3600)
        .toString()
        .padStart(2, "0"),
      m = Math.floor((e % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, "0");

    return m + ":" + s;
    //return `${h}:${m}:${s}`;
  }

  // function defineNotes(note1, note2, note3, seconds) {
  //   mainChords.push(
  //     {
  //       time: parseInt(seconds),
  //       note: note1,
  //       duration: "8n",
  //     },
  //     {
  //       time: "+4:0",
  //       note: note2,
  //       duration: "8n",
  //     },
  //     {
  //       time: "+8:0",
  //       note: note3,
  //       duration: "8n",
  //     },
  //   );
  // }

  function defineMelodyChords(value) {
    // Set the rythm

    let timeoutID;
    let newVal = map(parseInt(value), 5, 40, 0, 5);
    let timeout = 2000;
    let speed1 = 180;

    function mapTime(t, speed) {
      return map(t, 24, 443, 0, speed1);
    }

    //  =================== SET THE RYTHM  ========================
    // Chorus je odredjen brojem nota

    if (newVal <= 0) {
      num = 0;

      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: I,
        duration: "2n",
        number: 0,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: IV,
        duration: "4n",
        number: 0,
      });
    } else if (newVal > 0 && newVal <= 1) {
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: I,
        duration: "2n",
        number: 1,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: IV,
        duration: "2n",
        number: 1,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: V,
        duration: "8n",
        number: 1,
      });
    } else if (newVal > 1 && newVal <= 2) {
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: III,
        duration: "6n",
        number: 2,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: II,
        duration: "4n",
        number: 2,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: III,
        duration: "6n",
        number: 2,
      });
      timeoutID = setTimeout(time, [timeout]);

      mainChords.push({
        time: mapTime(timeoutID),
        note: I,
        duration: "8n",
        number: 2,
      });
    } else if (newVal > 2 && newVal <= 2.5) {
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: III,
        duration: "6n",
        number: 3,
      });
      timeoutID = setTimeout(time, [timeout]);

      mainChords.push({
        time: mapTime(timeoutID),
        note: V,
        duration: "8n",
        number: 3,
      });
      timeoutID = setTimeout(time, [timeout]);

      mainChords.push({
        time: mapTime(timeoutID),
        note: III,
        duration: "6n",
        number: 3,
      });
      timeoutID = setTimeout(time, [timeout]);

      mainChords.push({
        time: mapTime(timeoutID),
        note: I,
        duration: "4n",
        number: 3,
      });
    } else if (newVal > 2.5 && newVal <= 3) {
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: IV,
        duration: "4n",
        number: 4,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: III,
        duration: "8n",
        number: 4,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: V,
        duration: "6n",
        number: 4,
      });
    } else if (newVal > 3 && newVal <= 3.5) {
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: I,
        duration: "4n",
        number: 5,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: III,
        duration: "4n",
        number: 5,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: IV,
        duration: "4n",
        number: 5,
      });
    } else if (newVal > 3.5 && newVal <= 4) {
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: III,
        duration: "6n",
        number: 6,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: II,
        duration: "8n",
        number: 6,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: III,
        duration: "6n",
        number: 6,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: IV,
        duration: "4n",
        number: 6,
      });
    } else if (newVal > 4 && newVal <= 5) {
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: V,
        duration: "8n",
        number: 8,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: III,
        duration: "4n",
        number: 8,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: II,
        duration: "4n",
        number: 8,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: IV,
        duration: "8n",
        number: 8,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: V,
        duration: "16n",
        number: 8,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: IV,
        duration: "8n",
        number: 8,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: I,
        duration: "4n",
        number: 8,
      });
    } else if (newVal > 5) {
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: III,
        duration: "4n",
        number: 9,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID),
        note: IV,
        duration: "8n",
        number: 9,
      });
      timeoutID = setTimeout(time, [timeout]);

      mainChords.push({
        time: mapTime(timeoutID),
        note: V,
        duration: "16n",
        number: 9,
      });
      timeoutID = setTimeout(time, [timeout]);

      mainChords.push({
        time: mapTime(timeoutID),
        note: IV,
        duration: "8n",
        number: 9,
      });
      timeoutID = setTimeout(time, [timeout]);

      mainChords.push({
        time: mapTime(timeoutID),
        note: III,
        duration: "4n",
        number: 9,
      });
    } else {
      return;
    }
  }
}
