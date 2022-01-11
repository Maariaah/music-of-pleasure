function defineForceChords(value) {
  // ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4'];
  if (value <= 10) {
    return FChord;
  }
  if (value > 10 && value <= 20) {
    return FChord1;
  }
  if (value > 20 && value <= 30) {
    return FChord2;
  }
  if (value > 30 && value <= 40) {
    return FChord3;
  }
  if (value > 40 && value <= 50) {
    return FChord4;
  }
  if (value > 50 && value <= 60) {
    return FChord5;
  }
  if (value > 60 && value <= 70) {
    return FChord6;
  }
  if (value > 70 && value <= 80) {
    return FChord7;
  }
  if (value > 80 && value <= 90) {
    return FChord8;
  }
  if (value > 90 && value <= 100) {
    return FChord9;
  } else {
    return FChord9;
  }
}

function defineTempChords(value) {
  // ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4'];
  // ["2, "8n", "8n."]

  if (value <= 40) {
    return GChord;
  }
  if (value > 40 && value <= 50) {
    return "A4";
  }
  if (value > 50 && value <= 60) {
    return "F4";
  }
  if (value > 60 && value <= 70) {
    return "G4";
  }
  if (value > 70 && value <= 80) {
    return "E4";
  }
  if (value > 80 && value <= 90) {
    return "G4";
  }
  if (value > 100 && value <= 110) {
    return "F4";
  } else {
    return "A4";
  }
}
