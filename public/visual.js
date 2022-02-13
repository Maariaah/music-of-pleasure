// https://openprocessing.org/sketch/1311114
let angle = 2.0;
let offset = 10;
let scalar = 3.5;
let spiralSpeed = 0.01;
var c = 256;
var b = 0;

function drawWaveform() {
  colorMode(HSB);
  // background(`rgb(${red}%, ${green}%,${blue}%)`);
  frequency = synthMajor.get().oscillator.frequency;
  waveform = fft.getValue();
  envelope = synthMajor.get().envelope;
  c = map(b++, 0, 15, 0, 360);
  if (c > 359) c = 0;
  if (b > 15) b = 0;

  let r = frequency / Math.PI;
  let add = 300;
  let splitCircle = 2;
  let curveBase = (2 * Math.PI) / splitCircle;

  translate(width / 2, height / 2);
  rotate(radians(frequency));
  translate(-width / 2, -height / 2);

  // let spiralX = offset + cos(angle) * scalar;
  // let spiralY = offset + sin(angle) * scalar;
  // angle += spiralSpeed;
  // scalar += spiralSpeed;

  for (j = 0; j < splitCircle; j++) {
    beginShape();

    fill(c, frequency * 0.8, 255, 0.1);
    stroke(c, frequency, 128 - volume / 2, 0.4);

    for (i = 0; i < waveform.length; i++) {
      let x = map(i, 0, waveform.length - 1, 0, curveBase);
      let y = map(waveform[i], 0, 255, 0, add);
      let y_r = map(waveform[waveform.length - i - 1], 0, 255, 0, add);
      noFill();

      vertex(
        (y + y_r + r) * cos(x + curveBase * j) + windowWidth / 2,
        (y + y_r + r) * sin(x + curveBase * j) + windowHeight / 2
      );
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
  newRed = newRange * 8;
  green = 30;
  blue = 30;
}
