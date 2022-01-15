let r;
let g;
let b;
let valueChanged;
let freqValue;
let noteIndex = 0;
let midiVal, freq;
var sizeInc;
var sizeDec;
var colorSlider;
var colorHue;
var speedInput;
var speed = "200";
var isAnimated;
var irregularitySlider;
var irregularity = 10;
var baseRadius = 300;
var noiseScale = 1;
let volhistory = [];

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
