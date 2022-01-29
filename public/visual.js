// https://openprocessing.org/sketch/1311114

let red;
let green;
let blue;

function drawWaveform() {
  frequency = synthMajor.get().oscillator.frequency;
  waveform = fft.getValue();
  envelope = synthMajor.get().envelope;
  background(blue, green, red, 10);

  let r = (frequency / Math.PI) * 2;
  let add = 160;
  let splitCircle = 10;
  let curveBase = (5 * Math.PI) / splitCircle;

  translate(width / 2, height / 2);
  rotate(radians(frequency));
  translate(-width / 2, -height / 2);

  for (j = 0; j < splitCircle; j++) {
    beginShape();
    for (i = 0; i < waveform.length; i++) {
      noFill();
      let x = map(i, 0, waveform.length - 1, 0, curveBase);
      let y = map(waveform[i], 0, 255, 0, add);
      let y_r = map(waveform[waveform.length - i - 1], 0, 255, 0, add);
      stroke(`rgb(${red}%, ${green}%,${blue}%)`);

      vertex(
        (y + y_r) * cos(x + curveBase * j) + windowWidth / 2,
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
  red = newRange * 6;
  green = 30;
  blue = 30;
}
