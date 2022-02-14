// https://openprocessing.org/sketch/615374
let fqSmoothLevel = 1;
let x;
let y;
let b = 0;
let oldHighPick;
const k = 86; // intersecion point
const angle = 360;
let c = 256;
let newRed;
const strokeIntensity = 0.5;
const strokeOpacity = 0.4;
const fillOpacity = 0.2;
let energy;
const size = 1;
const irregularities = 1;
const shapeIrregularities = 40;

function drawWaveform() {
  colorMode(HSB);
  noFill();

  frequency = parseInt(synthMelody.get().oscillator.frequency);

  //spectrum = waveform.getValue().map((item) => parseInt(Math.abs(item) * 100)); // create Analyser
  //spectrum = waveform.getValue().map((item) => item * 100);
  spectrum = fft.getValue(); // create Analyser
  console.log(frequency);

  // stroke(`rgb(${red}%, ${green}%,${blue}%)`);
  if (c > 359) {
    c = 1;
  }
  if (b > 15) {
    b = 1;
  }

  //if the high pick is detected
  if (frequency !== oldHighPick) {
    c = map(b++, 0, 15, 0, 360);
    oldHighPick = frequency;
  }
  console.log(frequency);
  energy = Math.floor(Math.random() * (130 - 100) + 100); // Density

  // Draw vertex
  var scaledSpectrum = splitOctaves(
    spectrum,
    map(energy, 0, 255, 6, shapeIrregularities)
  );
  var len = scaledSpectrum.length;
  var N = len - irregularities;
  var vol = frequency * strokeIntensity;

  console.log(frequency);

  translate(width / 2, height / 2);
  rotate(radians(c));
  translate(-width / 2, -height / 2);

  beginShape();
  fill(c + newRed, vol * 1.2, 255, fillOpacity);
  stroke(c, vol * 3, 128 - 50, strokeOpacity);

  //Left side
  for (var i = 0; i < N; i++) {
    var point = smoothPoint(scaledSpectrum, i, fqSmoothLevel);
    var R = point * 1.5;

    var x = width / 2 + R * cos(radians((i * angle) / N + k));
    var y = height / 2 + R * sin(radians((i * angle) / N + k));
    if (i === 0)
      var x1 = x,
        y1 = y;
    curveVertex(x, y);
  }

  //Right side
  for (var i = N; i > 0; i--) {
    point = smoothPoint(scaledSpectrum, i, fqSmoothLevel);
    R = point * 1.5;
    x = width / 2 + R * cos(radians((i * angle) / N + k + 180));
    y = height / 2 + R * sin(radians((i * angle) / N + k));
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
      total += spectrum[i] * size;
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
    scaledSpectrum.push(spectrum[j] * size);
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
    if (typeof spectrum[i] * size !== "undefined") {
      val += spectrum[i] * size;
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
