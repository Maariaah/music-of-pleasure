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
      type: "sine",
      spread: 40,
      count: 3,
    },
    envelope: {
      attack: 0.001,
      decay: 1.6,
      sustain: 0,
      release: 1.6,
    },
  }).toMaster();

  constructMelodyChords();
  Tone.Transport.cancel(0);

  melodyPart = new Tone.Part(function (time, note) {
    // Prevent playing a note if it is same as previous one
    if (prevMelodyTone !== note.number) {
      synthMelody.triggerAttackRelease(note.note, note.duration, time);
      prevMelodyTone = note.number;
    } else {
      if (count < 2) {
        synthMelody.triggerAttackRelease(note.note, note.duration, time);
        count++;
      } else {
        count = count === 5 && 0;
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
    let newVal = map(parseInt(value), 4, 38, 0, 5);
    let timeout = 1000;
    let speed1 = 180;

    function mapTime(t, speed) {
      return map(t, 24, 443, 0, speed1);
    }

    //  =================== SET THE RYTHM  ========================

    if (newVal <= 0) {
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 220),
        note: I,
        duration: "1n",
        number: 0,
      });
    } else if (newVal > 0 && newVal <= 0.2) {
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 220),
        note: I,
        duration: "1n",
        number: 0,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 220),
        note: II,
        duration: "4n",
        number: 1,
      });
    } else if (newVal > 0.2 && newVal <= 0.5) {
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 215),
        note: III,
        duration: "2n",
        number: 1,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 215),
        note: II,
        duration: "4n",
        number: 1,
      });
    } else if (newVal > 0.5 && newVal <= 1) {
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 200),
        note: II,
        duration: "4n",
        number: 2,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 200),
        note: III,
        duration: "8n",
        number: 2,
      });
    } else if (newVal > 1 && newVal <= 2) {
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 200),
        note: II,
        duration: "2n",
        number: 3,
      });
    } else if (newVal > 2 && newVal <= 2.5) {
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 200),
        note: III,
        duration: "4n",
        number: 5,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 200),
        note: II,
        duration: "2n",
        number: 5,
      });
    } else if (newVal > 2.5 && newVal <= 3) {
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 200),
        note: III,
        duration: "8n",
        number: 6,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 200),
        note: IV,
        duration: "8n",
        number: 6,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 200),
        note: II,
        duration: "16n",
        number: 6,
      });
    } else if (newVal > 3 && newVal <= 4) {
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 200),
        note: V,
        duration: "16n",
        number: 7,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 200),
        note: IV,
        duration: "8n",
        number: 7,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 200),
        note: III,
        duration: "8n",
        number: 7,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 200),
        note: II,
        duration: "8n",
        number: 7,
      });
    } else if (newVal > 4 && newVal <= 5) {
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 190),
        note: V,
        duration: "8n",
        number: 8,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 190),
        note: IV,
        duration: "8n",
        number: 8,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 190),
        note: III,
        duration: "8n",
        number: 8,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 190),
        note: II,
        duration: "8n",
        number: 8,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 190),
        note: III,
        duration: "8n",
        number: 8,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 190),
        note: IV,
        duration: "8n",
        number: 8,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 190),
        note: I,
        duration: "8n",
        number: 8,
      });
    } else if (newVal > 5) {
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 190),
        note: V,
        duration: "16n",
        number: 9,
      });
      timeoutID = setTimeout(time, [timeout]);
      mainChords.push({
        time: mapTime(timeoutID, 190),
        note: IV,
        duration: "16n",
        number: 9,
      });
      mainChords.push({
        time: mapTime(timeoutID, 190),
        note: II,
        duration: "16n",
        number: 9,
      });
      mainChords.push({
        time: mapTime(timeoutID, 190),
        note: I,
        duration: "16n",
        number: 9,
      });
    } else {
      return;
    }
  }
}
