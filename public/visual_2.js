// https://openprocessing.org/sketch/1311114

let red;
let green;
let blue;
var fqSmoothLevel = 3;
var x;
var y;
var c = 256;
var b = 0;
var oldFrequency;
var k = 90;

function drawWaveform() {
  colorMode(HSB);
  noFill();
  // stroke(`rgb(${red}%, ${green}%,${blue}%)`);

  if (c > 359) c = 0;
  if (b > 15) b = 0;

  let frequency = synthMajor.get().oscillator.frequency;
  let spectrum = fft.getValue(); 

  if (frequency !== oldFrequency) {
    oldFrequency = frequency;
    c = map(b++, 0, 15, 0, 360);
  }

  var energy = (frequency * 120 / Math.PI); // Irregularities

  // Draw vertex
  var scaledSpectrum = splitOctaves(spectrum, map(energy, 0, 255, 6, 12));
  // text(scaledSpectrum, 20, 20);

  var len = scaledSpectrum.length;
  var N = parseInt(len / Math.PI);

  translate(width / 2, height / 2);
  rotate(radians(c / Math.PI));
  translate(-width / 2, -height / 2);

  beginShape();
  fill(c, frequency * 0.2, 255, 0.01);
  stroke(c, frequency, 128 - frequency / 2, 0.4);
  strokeWeight(scaledSpectrum[len/2]/16);

  curveVertex(x, y);

  for (var i = 0; i < N; i++) {
    var point = smoothPoint(scaledSpectrum, i, fqSmoothLevel);
    var R = point * 3; // size
    x = width / 2 + R * cos(radians((i * 360) / N + k + 360));
    y = height / 2 + R * sin(radians((i * 360) / N + k));
    if (i === 0)
      var x1 = x,
        y1 = y;
    curveVertex(x, y);
  }

  for (var i = N; i > 0; i--) {
    point = smoothPoint(scaledSpectrum, i, fqSmoothLevel);
    R = point * 1.5;
    x = width / 2 + R * cos(radians((i * 360) / N + k + 180));
    y = height / 2 + R * sin(radians((i * 360) / N + k));
    curveVertex(x, y);
  }

  // one last point at the end
  curveVertex(x1, y1);
  curveVertex(x, y);

  endShape();
}

function splitOctaves(spectrum, slicesPerOctave) {
  var scaledSpectrum = [];
  var len = spectrum.length;

  // default to thirds
  var n = slicesPerOctave || 3;
  var nthRootOfTwo = Math.pow(2, 1 / n);

  // the last N bins get their own
  var lowestBin = slicesPerOctave;

  var binIndex = len - 1;
  var i = binIndex;

  while (i > lowestBin) {
    var nextBinIndex = round(binIndex / nthRootOfTwo);

    if (nextBinIndex === 1) return;

    var total = 0;
    var numBins = 0;

    // add up all of the values for the frequencies
    for (i = binIndex; i > nextBinIndex; i--) {
      total += spectrum[i];
      numBins++;
    }

    // divide total sum by number of bins
    var energy = total / numBins;
    scaledSpectrum.push(energy);

    // keep the loop going
    binIndex = nextBinIndex;
  }

  // add the lowest bins at the end
  for (var j = i; j > 0; j--) {
    scaledSpectrum.push(spectrum[j]);
  }

  // reverse so that array has same order as original array (low to high frequencies)
  scaledSpectrum.reverse();

  return scaledSpectrum;
}

// average a point in an array with its neighbors
function smoothPoint(spectrum, index, numberOfNeighbors) {
  // default to 2 neighbors on either side
  var neighbors = numberOfNeighbors || 2;
  var len = spectrum.length;

  var val = 0;

  // start below the index
  var indexMinusNeighbors = index - neighbors;
  var smoothedPoints = 0;

  for (var i = indexMinusNeighbors; i < index + neighbors && i < len; i++) {
    // if there is a point at spectrum[i], tally it
    if (typeof spectrum[i] !== "undefined") {
      val += spectrum[i];
      smoothedPoints++;
    }
  }

  val = val / smoothedPoints;

  return val;
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

  // Resrict values within the range
  function convertRange() {
    let tempLowest = parseInt(lowest * 10);
    let tempHighest = parseInt(highest * 10);
    let currentDegree = parseInt(temperature[note] * 10);

    let percent = (currentDegree - tempLowest) / (tempHighest - tempLowest);
    newRange = percent * (colorHighest - colorLowest) + colorLowest;
  }

  getRange(temperature);
  convertRange();
  red = newRange * 6;
  green = 30;
  blue = 30;
}
