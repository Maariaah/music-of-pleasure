let r;
let g;
let b;
let colorHue;
let irregularity = 10;
let baseRadius = 300;
let noiseScale = 1;
let valueChanged;
let freqValue;
let noteIndex = 0;
let midiVal, freq;

function drawMusic() {
  let irregularity = 50;
  let baseRadius = 200;
  let noiseScale = 1;
  colorHue = color(`rgb(${r}%, ${g}%,${b}%)`);
  midiVal = force[noteIndex % force.length];
  freqValue = midiToFreq(midiVal);
  noteIndex++;
  noStroke();
  rect(0, 0, width, height);

  // shift shape to middle of canvas
  translate(width / 2, height / 2);
  noFill();
  strokeWeight(2);
  stroke(colorHue);

  // create irregular circle
  for (let j = 0; j < 4; j++) {
    beginShape();
    for (let i = 0; i < 50; i += TWO_PI / irregularity) {
      let x = cos(i);
      let y = sin(i);
      let randomNoise = noise(
        (x + 5) * noiseScale,
        y * noiseScale,
        frameCount / (600 - freqValue) //speed
      );
      let radius = baseRadius * randomNoise;
      curveVertex(radius * x, radius * y + 10 * j);
    }
    endShape();
  }
}

function defineColor() {
  //Get temperature highest and lowest values
  let lowest;
  let highest;
  let colorLowest = 0;
  let colorHighest = 100;
  let newRange;

  function getRange(arr) {
    highest = arr.sort((a, b) => b - a)[0];
    lowest = arr.sort((a, b) => a - b)[0];
  }

  // https://intellipaat.com/community/33375/convert-a-number-range-to-another-range-maintaining-the-ratio

  // Resrict values within the range
  function convertRange() {
    let tempLowest = parseInt(lowest * 10);
    let tempHighest = parseInt(highest * 10);
    let currentDegree = parseInt(temperature[noteIndex] * 10);

    let percent = (currentDegree - tempLowest) / (tempHighest - tempLowest);
    newRange = percent * (colorHighest - colorLowest) + colorLowest;
  }

  getRange(temperature);
  convertRange();
  r = newRange;
  g = 50;
  b = 50;
}
