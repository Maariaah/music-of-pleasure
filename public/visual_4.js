// https://openprocessing.org/sketch/615374
// https://codepen.io/noeldelgado/pen/EaNjBy
// https://gg-gina.medium.com/how-to-music-visualizer-web-audio-api-aa007f4ea525

let x;
let y;
let b = 0;
let rotateAngle = 180;
const k = 90; // intersecion point
const angle = 180;
let energy;
const size = 1;
let yoff = 0.0;
let prevRotateAngle = 0;
let fqSmoothLevel = 4;
let strokeOpacity = 0.5;
let fillOpacity = 0.03;

function drawWaveform() {
  //Tone.context.getByteFrequencyData(dataArray);
  analyser.getByteFrequencyData(dataArray);
  avg = getAvg([].slice.call(dataArray)) * gainNode.gain.value;
  HIGH_BREAK_POINT_HIT = avg >= HIGH_BREAK_POINT;
  MIN_BREAK_POINT_HIT = avg < MIN_BREAK_POINT;
  AVG_BREAK_POINT_HIT = avg < AVG_BREAK_POINT;
  AVG_BREAK_POINT_HIT2 = avg > AVG_BREAK_POINT && avg < HIGH_BREAK_POINT;

  function getAvg(values) {
    var value = 0;
    values.forEach(function (v) {
      value += v;
    });

    return value / values.length;
  }

  spectrum = dataArray.map((item) => {
    if (item > 0) {
      return item;
    } else if(item > 70 && item < 90) {
      return Math.floor(Math.random() * (200 - 20) + 20);
    }
    else {
      return Math.floor(Math.random() * (120 - 60) + 60);
    }
  });

  energy = Math.floor(Math.random() * (255 - 200) + 100); // Density
  // Draw vertex
  var scaledSpectrum = splitOctaves(spectrum, map(energy, 0, 255, 6, 12));

  var len = scaledSpectrum.length;
  var N = len - 10;

  var volume = max(scaledSpectrum);
  defineShapeAndPosition();

  // define saturation by temperature value
  defineSaturation();
  defineHue();

  function defineShapeAndPosition() {
    // define the rotation position by the highest pitch
    if (avg > 19.5 && avg < 20) {
      rotateAngle = map(b++, 0, 15, 0, 360);
    }

    if (rotateAngle > 359) rotateAngle = 0;

    //  if (hue > 359) hue = 0;
    if (b > 15) b = 0;

    translate(width / 2, height / 2);
    rotate(radians(rotateAngle));
    translate(-width / 2, -height / 2);
  }

  beginShape();
  // define the shape opacity
  if (MIN_BREAK_POINT_HIT) {
    brightness = 100;
    strokeWeight(0.5)
  } else if (AVG_BREAK_POINT_HIT) {
    brightness = 80;
    strokeWeight(0.3)
  } else if (AVG_BREAK_POINT_HIT2) {
    brightness = 50;
    strokeWeight(0.8)
  } else if (HIGH_BREAK_POINT_HIT) {
    brightness = 0;
    strokeWeight(1.2)
  }

  fill(hue, saturation, 100, fillOpacity);
  stroke(hue, saturation, brightness, strokeOpacity);
  curveVertex(x, y);

  //Left side
  for (var i = 0; i < N; i++) {
    var point = smoothPoint(scaledSpectrum, i, fqSmoothLevel);

    var R = point * size + avg;
    var x = width / 2 + R * cos(radians((i * angle) / N + k));
    var y = height / 2 + R * sin(radians((i * angle) / N + - (force[note]) + k));

    if (i === 0)
      var x1 = x,
        y1 = y;

    curveVertex(x, y);
  }

  //Right side
  for (var i = N; i > 0; i--) {
    point = smoothPoint(scaledSpectrum, i, fqSmoothLevel);

    R = point * size + avg;
    x = width / 2 + R * cos(radians((i * angle) / N  + k + 180));
    y = height / 2 + R * sin(radians((i * angle) / N - (force[note]) + k));

    curveVertex(x, y);
  }

  // xoff += 0.09;
  // yoff += 0.01;

  // one last point at the end
  curveVertex(x1, y1);
  curveVertex(x, y);

  endShape();
}

function defineSaturation() {
  //Get temperature highest and lowest values

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
