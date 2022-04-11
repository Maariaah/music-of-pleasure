// FORCE - melody
let prevMelody3Tone;
let melody3Chords = [];

function initializeMelody3() {
  constructmelody3Chords();

  let melody3Efect = new Tone.PingPongDelay({
    delayTime: "8t",
    feedback: 0.5,
    wet: 0.5,
  }).toMaster();


  const synthMelody3 = new Tone.Sampler(
    {
      F3: "./samples/piano/D3.mp3",
      G3: "./samples/piano/A3.mp3",
      C4: "./samples/piano/C4.mp3",
      D4: "./samples/piano/D4.mp3",
      E4: "./samples/piano/Es4.mp3",
      F4: "./samples/piano/F4.mp3",
    },
    {
      volume: -15,
    }
  )
    .connect(melody3Efect)
    .toMaster();

  //Use part to encapsulate chords into single unit
  melody2Part = new Tone.Part(function (time, note) {
    // Prevent playing a note if it is same as previous one
    if (prevMelody3Tone !== note.note) {
      synthMelody3.triggerAttackRelease(note.note, note.duration, time);
      prevMelody3Tone = note.note;
    }
  }, melody3Chords).start(0);
}

function constructmelody3Chords() {
  for (let i = 0; i < seconds.length; i++) {
    definemelody3Chords(gyroscopeX[i], seconds[i]);
  }
}
//GyroZ range: -30 - 30
function definemelody3Chords(value, seconds) {
  let newVal = map(parseInt(value), 5, 40, 0, 12);

  if (newVal > 1.5 && newVal <= 2) {
    melody3Chords.push({
      time: seconds,
      note: "F3",
      duration: "2n",
    });
    } else if (newVal > 3 && newVal <= 4) {
    melody3Chords.push({
      time: seconds,
      note: "G3",
      duration: "2n",
    });
  } else if (newVal > 5 && newVal <= 6) {
    melody3Chords.push({
      time: seconds,
      note: "C4",
      duration: "2n",
    });
  } else if (newVal > 9 && newVal <= 10) {
    melody3Chords.push({
      time: seconds,
      note: "C4",
      duration: "2n",
    });
  } else if (newVal > 11 && newVal <= 12) {
    melody3Chords.push({
      time: seconds,
      note: "D4",
      duration: "2n",
    });
  } else if (newVal > 12) {
    melody3Chords.push({
      time: seconds,
      note: "F4",
      duration: "2n",
    });
  } else {
    return;
  }

}
