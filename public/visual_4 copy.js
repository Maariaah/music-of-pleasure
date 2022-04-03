// https://openprocessing.org/sketch/615374
// https://codepen.io/noeldelgado/pen/EaNjBy
// https://gg-gina.medium.com/how-to-music-visualizer-web-audio-api-aa007f4ea525

let x;
let y;
let b = 0;
let rotateAngle = 90;
const k = -90; // intersecion point
const angle = 180;
let energy;
const size = 1;
let yoff = 0.0;
let hue = 360;
let saturation = 100;
let brightness = 100;

function drawWaveform() {
  //Tone.context.getByteFrequencyData(dataArray);
  //analyser.getByteTimeDomainData(dataArray);

  avg = getAvg([].slice.call(fft)) * gainNode.gain.value;
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

    // spectrum = fft.getValue().map(item => {
    //   return map(item, -100, 0, -1, 1);
    // }); // create Analyser
  
    // spectrum = fft.getValue();


  spectrum = fft.getValue().map((item) => {
     let i = Math.abs(Math.round(item));
    return  i;

    // if (item > 0) {
    //   return item;
    // } else {
    //   return Math.floor(Math.random() * (100 - 30) + 30);
    // }
  });

  //spectrum = dataArray
  
  console.log(spectrum)

  energy = Math.floor(Math.random() * (255 - 200) + 100); // Density
  // Draw vertex
  var scaledSpectrum = splitOctaves(spectrum, map(energy, 0, 255, 6, 12));

  var len = scaledSpectrum.length;
  var N = len - 15;

  var volume = max(scaledSpectrum);
  saturation = red;

  defineShapeAndPosition();
  defineSaturation();
  defineHue();

  function defineShapeAndPosition() {
    // define the rotation position by the highest pitch
    if (AVG_BREAK_POINT_HIT) {
      rotateAngle = map(b++, 0, 15, 0, 360);
      avg = AVG_BREAK_POINT_HIT;
    }

    if (rotateAngle > 359) rotateAngle = 0;
    // if (hue > 359) hue = 0;
    if (b > 15) b = 0;

    translate(width / 2, height / 2);
    rotate(radians(rotateAngle));
    translate(-width / 2, -height / 2);
  }

  beginShape();
  // define the shape opacity
  if (MIN_BREAK_POINT_HIT) {
    fillOpacity = 0;
    strokeOpacity = 0.01;
  } else if (AVG_BREAK_POINT_HIT) {
    fillOpacity = 0.01;
    strokeOpacity = 0.1;
  } else if (HIGH_BREAK_POINT_HIT) {
    fillOpacity = 0.02;
    strokeOpacity = 0.3;
  }

  fill(hue, saturation * 0.5, brightness, fillOpacity);
  stroke(hue, volume, 128 - volume / 2, strokeOpacity);

  curveVertex(x, y);

  //Left side
  for (var i = 0; i < N; i++) {
    var point = smoothPoint(scaledSpectrum, i, fqSmoothLevel);


    
    var R = point * size;
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

    R = point * size;
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

function defineSaturation() {
  //Get temperature highest and lowest values
  let lowest;
  let highest;
  let colorLowest = 0;
  let colorHighest = 360;
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

  red = newRange;
  green = 50;
  blue = 50;
}

function defineHue() {

  //Get temperature highest and lowest values
  let lowest;
  let highest;


  function getRange(arr) {
    highest = arr.sort((a, b) => b - a)[0];
    lowest = arr.sort((a, b) => a - b)[0];
  }

  getRange(force);
  hue = map(force, lowest, highest, 0, 360);
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
