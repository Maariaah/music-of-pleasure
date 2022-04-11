// https://openprocessing.org/sketch/615374

let fqSmoothLevel = 2;
let x;
let y;
let b = 0;
let oldHighPick;
const k = -90; // intersecion point
const angle = -180;
let c = 256;
let newRed;
let strokeOpacity = 0.7;
let fillOpacity = 0.09;
let energy;
const size = 1;
const irregularities = 1;
let yoff = 0.0;
let rotateAngle=0;
let prevForce = 0;

function drawWaveform() {
  // fqSmoothLevel = parseInt(force[note]) / 2;
  colorMode(HSB);
  noFill();
  // beat = new p5.PeakDetect(2000, 20000, beatThreshold, 60 / (defaultBPM / 60));

  frequency = parseInt(synthMelody && synthMelody.get().oscillator.frequency);
  //spectrum = waveform.getValue().map((item) => Math.abs(item) * 100);
  spectrum = fft.getValue().map((item) => Math.abs(item)); // create Analyser

  // if the high pick is detected
  if (frequency !== oldHighPick) {
    // c = map(b++, 0, 15, 0, 360);
    oldHighPick = frequency;
    if (frequency > 300) {
      rotateAngle = map(b++, 0, 15, 0, 360);
    }
 }

 if (frequency < 100) {
   brightness = 100;
  strokeWeight(0.5)
} else if (frequency >= 100 && frequency <= 200) {
   brightness = 60;
  strokeWeight(0.3)
} else if (frequency >= 200 && frequency <= 300) {
   brightness = 40;
  strokeWeight(0.8)
} else if (frequency >= 300) {
  brightness = 10;
  strokeWeight(1)
}

    if (c > 359) c = 0;
    if (b > 15) b = 0;

    energy = Math.floor(Math.random() * (130 - 100) + 100) // Density
  //energy = noise(100, 0);

  // Draw vertex
  var scaledSpectrum = splitOctaves(spectrum, map(energy, 0, 255, 6,10));
  var len = scaledSpectrum.length;
  var N = len - 30;
  var volume = max(scaledSpectrum);

  defineSaturation();
  defineHue();
  translate(width / 2, height / 2);
  rotate(radians(rotateAngle));
  translate(-width / 2, -height / 2);

  beginShape();

  if (seconds[note] >= 122) {
    fillOpacity = 0;
    strokeOpacity=0;
  }


  fill(hue, saturation, 255, fillOpacity);
  stroke(hue, saturation, brightness, strokeOpacity);

  curveVertex(x, y);
  // fill(c + newRed, volume * 0.8, 255, fillOpacity);
  // stroke(c, volume * 3, 128 - 50, strokeOpacity);

  //Left side
  for (var i = 0; i < N; i++) {
    var point = smoothPoint(scaledSpectrum, i, fqSmoothLevel);
    var R = point * -1.5;
    var x = width / 2 + R * cos(radians((i * angle) / N + k));
    var y = height / 2 + R * sin(radians((i * angle) / N + k));

    if (i === 0)
      var x1 = x,
        y1 = y;

    curveVertex(x, y);
    //   rect(t / 140, t / 60, atan(t / 60) * 200, cos(t / 60) * 200);
  }

  //Right side
  for (var i = N; i > 0; i--) {
    point = smoothPoint(scaledSpectrum, i, fqSmoothLevel);
    R = point * -1.5;
    x = width / 2 + R * cos(radians((i * angle) / N + k + 180));
    y = height / 2 + R * sin(radians((i * angle) / N + k));

    curveVertex(x, y);
  }
  // xoff += 0.09;
  // yoff += 0.01;

  // one last point at the end
  curveVertex(x1, y1);
  curveVertex(x, y);

  endShape();
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

function defineSaturation() {
  //Get force highest and lowest values

  let tempHighest = force.sort((a, b) => b - a)[0];
  let tempLowest = force.sort((a, b) => a - b)[0];

  // Resrict values within the range
  saturation = map(force[note], tempLowest, tempHighest, 0, 100);
}

function defineHue() {
  //Get temp highest and lowest values
  let lowest;
  let highest;

  function getRange(arr) {
    highest = arr.sort((a, b) => b - a)[0];
    lowest = arr.sort((a, b) => a - b)[0];
  }

  getRange(temperature);
  hue = parseInt(map(temperature[note], lowest, highest, 0, 360));
  // brightness = parseInt(map(force[note], lowest, highest, 0, 100));
  // }
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
