// https://openprocessing.org/sketch/1311114
let angle = 2.0;
let offset = 10;
let scalar = 3.5;
let spiralSpeed = 0.01;
var c = 256;
var b = 0;
let newRed;

function drawWaveform() {
  stroke(225);

  spectrum = fft.getValue();

  let r = 100;
  let add = 200;
  let splitCircle = 6;
  let curveBase = (2 * Math.PI) / splitCircle;

  // let spiralX = offset + cos(angle) * scalar;
  // let spiralY = offset + sin(angle) * scalar;
  // angle += spiralSpeed;
  // scalar += spiralSpeed;

  for (j = 0; j < splitCircle; j++) {
    beginShape();

    for (i = 0; i < spectrum.length; i++) {

      let x = map(i, 0, spectrum.length - 1, 0, curveBase);
      let y = map(spectrum[i], 0, 255, 0, add);

      let y_r = map(spectrum[spectrum.length - i - 1], 0, 255, 0, add);
      vertex(
        (y + y_r + r) * cos(x + curveBase * j) + windowWidth / 2,
        (y + y_r + r) * sin(x + curveBase * j) + windowHeight / 2
      );
    }
    endShape();
  }

  // for (j = 0; j < splitCircle; j++) {
  //   beginShape();

  // 	for (i = 0; i < spectrum.length; i++) {
  // 		let x = map(i, 0, spectrum.length - 1, 0, curveBase);
  // 		let y = map(spectrum[i], 0, 255, 0, add);

  // 		let y_r = map(spectrum[spectrum.length-i-1], 0, 255, 0, add);
  // 		vertex((y+y_r+r) * cos(x + curveBase * j) + windowWidth /2 ,
  // 		(y+y_r+r) * sin(x + curveBase * j) + windowHeight /2);
  // 	}
  //   endShape();
  // }
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
