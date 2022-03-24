// https://openprocessing.org/sketch/615374
// https://codepen.io/noeldelgado/pen/EaNjBy
// https://gg-gina.medium.com/how-to-music-visualizer-web-audio-api-aa007f4ea525

let fqSmoothLevel = 10;
let x;
let y;
let b = 0;
const k = 90; // intersecion point
const angle = 180;
let c = 256;
let red;
let strokeOpacity = 0.4;
let fillOpacity = 0.01;
let energy;
const size = 1;
const shapeIrregularities = 1;
let yoff = 0.0;
let newAvg = 10;
let firstBeatDetected = false;
let lastAveragePoint = 0;

function drawWaveform() {
  analyser.getByteFrequencyData(dataArray);
  avg = getAvg([].slice.call(dataArray)) * gainNode.gain.value;
  HIGH_BREAK_POINT_HIT = avg > HIGH_BREAK_POINT;
  MIN_BREAK_POINT_HIT = avg < MIN_BREAK_POINT;
  AVG_BREAK_POINT_HIT = avg < AVG_BREAK_POINT;

  function getAvg(values) {
    var value = 0;
    values.forEach(function (v) {
      value += v;
    });

    return value / values.length;
  }

  //spectrum = fft.getValue().map((item) => Math.abs(item)); // create Analyser
  spectrum = dataArray.map((item) => {
    if (item > 0) {
      return item;
    } 
    else {
      return Math.floor(Math.random() * (100 - 60) + 60);
    }
  });

  energy = Math.floor(Math.random() * (255 - 200) + 100); // Density

  // Draw vertex
  var scaledSpectrum = splitOctaves(spectrum, map(energy, 0, 255, 6, 12));
  var len = scaledSpectrum.length;
  var N = len - 20;
  var volume = max(scaledSpectrum);

  translate(width / 2, height / 2);
  rotate(radians(c * 10));
  translate(-width / 2, -height / 2);

  defineColor();

  function defineColor() {
    if (HIGH_BREAK_POINT_HIT) {
      c = map(b++, 0, 15, 0, 360);
      newAvg = avg;
    }

    if (c > 359) c = 0;
    if (b > 15) b = 0;
  }

  beginShape();
  if (MIN_BREAK_POINT_HIT) {
    fillOpacity = 0;
    strokeOpacity = 0.01;
  } else if (AVG_BREAK_POINT_HIT) {
    fillOpacity = 0.01;
    strokeOpacity = 0.2;
  } else {
    fillOpacity = 0.02;
    strokeOpacity = 0.6;
  }

  fill(c, volume * 0.8, 255, fillOpacity);
  stroke(c, volume, 128 - volume / 2, strokeOpacity);

  curveVertex(x, y);

  //Left side
  for (var i = 0; i < N; i++) {
    var point = smoothPoint(scaledSpectrum, i, fqSmoothLevel);

    var R = point;
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

    R = point;
    x = width / 2 + R * cos(radians((i * angle + 20) / N + k + 180));
    y = height / 2 + R * sin(radians((i * angle + 20) / N + k));

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
  red = newRange * 6;
  green = 30;
  blue = 30;
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
