// https://openprocessing.org/sketch/615374
var fqSmoothLevel = 1;
var x;
var y;
var b = 0;
var oldFrequency;
var k = 90;
const angle = 310;
let c = 256;
let newRed;

function drawWaveform() {
  colorMode(HSB);
  noFill();
  // stroke(`rgb(${red}%, ${green}%,${blue}%)`);

  if (c > 359) {
    c = 1;
  }
  if (b > 15) {
    b = 1;
  }
  // synthMajor
  // synthMelody
  let frequency = synthMelody.get().oscillator.frequency;
  let spectrum = fft.getValue();

  if (frequency !== oldFrequency) {
    c = map(b++, 0, 15, 0, 360);
    oldFrequency = frequency;
  }

  var energy = map(frequency, 0, 100, 0, 128); // Irregularities
  // Draw vertex
  var scaledSpectrum = splitOctaves(spectrum, map(energy, 0, 255, 6, 12));
  var len = scaledSpectrum.length;
  var N = len;
  var vol = frequency * 0.02;

  // Debug
  // fill("white");
  // rect(20, 20, 360, 70);
  // fill("red");
  // text("Seconds: " + seconds.length, 50, 70);

  translate(width / 2, height / 2);
  rotate(radians(c));
  //translate(-width / 2, -height / 2);
  translate(-width / 2, -height / 2 - len / 30);

  beginShape();
  fill(c + newRed, frequency * 0.2, 255, 0.01);
  stroke(c, vol, 128 - 50, 0.2);

  //Left side
  for (var i = 0; i < N; i++) {
    // Debug
    // fill("white");
    // rect(20, 450, 400, 100);
    // fill("red");
    // text("mainMelody: " + JSON.stringify(mainMelody[i]), 50, 500);
    // text("mainChords: " + JSON.stringify(mainMelody[i]), 50, 480);

    let size = acceleratorY[i] / 2;
    var point = smoothPoint(scaledSpectrum, i, fqSmoothLevel);
    var R = point * 1.5 + size; //size
    var x = width / 2 + R * cos(radians((i * angle) / N + k));
    var y = height / 2 + R * sin(radians((i * angle) / N + k));
    if (i === 0) {
      var x1 = x,
        y1 = y;
    }
    curveVertex(x, y);
  }

  //Right side
  for (var i = N; i > 0; i--) {
    let size = acceleratorY[i] * 2;

    point = smoothPoint(scaledSpectrum, i, fqSmoothLevel);
    R = point * 1.5 - size; //size
    x = width / 2 + R * cos(radians((i * angle) / N + k + 180));
    y = height / 2 + R * sin(radians((i * angle) / N + k));
    if (i === 0) {
      var x1 = x,
        y1 = y;
    }
    curveVertex(x, y);
  }

  // one last point at the end
  curveVertex(x1, y1);
  curveVertex(x, y);

  endShape();
}

function splitOctaves(spectrum, slicesPerOctave) {
  var scaledSpectrum = [];
  var len = spectrum.length / 2;

  // default to thirds
  var n = slicesPerOctave || 3;
  var nthRootOfTwo = Math.pow(4, 1 / n);

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
  var len = spectrum.length / 2;

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
  newRed = newRange * 6;
  green = 30;
  blue = 30;
}
