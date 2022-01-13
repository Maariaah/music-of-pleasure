function constructForceChords() {
  for (let i = 0; i < seconds.length; i++) {
    defineForceChords(force[i], seconds[i]);
  }
}

function defineForceChords(value, seconds) {
  // ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4'];
  // console.log(value)

  if (value <= 20) {
    mainChords.push({
      time: seconds,
      note: IChord,
      duration: "4n",
    });
  }
  if (value > 20 && value <= 30) {
    mainChords.push({
      time: seconds,
      note: IChord,
      duration: "2n",
    });
  }
  if (value > 30 && value <= 40) {
    mainChords.push({
      time: seconds,
      note: IIChord,
      duration: "4n",
    });
  }
  if (value > 40 && value <= 50) {
    mainChords.push({
      time: seconds,
      note: IIChord,
      duration: "2n",
    });
  }
  if (value > 50 && value <= 60) {
    mainChords.push({
      time: seconds,
      note: IIIChord,
      duration: "4n",
    });
  }
  if (value > 60 && value <= 70) {
    mainChords.push({
      time: seconds,
      note: IIIChord,
      duration: "2n",
    });
  }
  if (value > 70 && value <= 80) {
    mainChords.push({
      time: seconds,
      note: IVChord,
      duration: "4n",
    });
  }
  if (value > 80 && value <= 90) {
    mainChords.push({
      time: seconds,
      note: IVChord,
      duration: "2n",
    });
  }
  if (value > 90 && value <= 95) {
    mainChords.push({
      time: seconds,
      note: VChord,
      duration: "4n",
    });
  }
  if (value > 95 && value <= 100) {
    mainChords.push({
      time: seconds,
      note: VChord,
      duration: "2n",
    });
  } else {
    mainChords.push({
      time: seconds,
      note: IVChord,
      duration: "4n",
    });
  }

  return mainChords;
}

function constructTemperatureChords() {
  for (let i = 0; i < seconds.length; i++) {
    defineTempChords(temperature[i] * 10), seconds[i];
  }
}

function defineTempChords(value, seconds) {
  // ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4'];

  if (value <= 40) {
    mainMelody.push({
      time: seconds,
      note: "G4",
      duration: "4n",
    });
  }
  if (value > 40 && value <= 50) {
    mainMelody.push({
      time: seconds,
      note: "F4",
      duration: "4n",
    });
  }
  if (value > 50 && value <= 60) {
    mainMelody.push({
      time: seconds,
      note: "D4",
      duration: "4n.",
    });
  }
  if (value > 60 && value <= 70) {
    mainMelody.push({
      time: seconds,
      note: "D4",
      duration: "4n",
    });
  }
  if (value > 70 && value <= 80) {
    mainMelody.push({
      time: seconds,
      note: "F4",
      duration: "4n.",
    });
  }
  if (value > 80 && value <= 90) {
    mainMelody.push({
      time: seconds,
      note: "A4",
      duration: "2n",
    });
  }
  if (value > 100 && value <= 110) {
    mainMelody.push({
      time: seconds,
      note: "A4",
      duration: "4n",
    });
  } else {
    mainMelody.push({
      time: seconds,
      note: "A4",
      duration: "2n",
    });
  }
  return tChordsObject;
}
