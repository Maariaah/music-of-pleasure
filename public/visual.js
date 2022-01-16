let red;
let green;
let blue;

function drawWaveform(wave, fft, tmp) {
  frequency = synthMajor.get().oscillator.frequency;
  waveform = fft.getValue();
  envelope = synthMajor.get().envelope;

  // fill("yellow");
  // text("Frequency: " + frequency, 20, 20);
  //text("Wave: " + waveform.length, 20, 40);
  // text("Envelope: " + envelope.attack, 20, 60);

  let r = 400;
  let add = 300;
  let splitCircle = 0.003;
  let curveBase = (5 * Math.PI) / splitCircle;

  for (j = 0; j < splitCircle; j++) {
    beginShape();
    for (i = 0; i < waveform.length; i++) {
      noFill();

      stroke(`rgb(${red}%, ${green}%,${blue}%)`);
      text(temperature[note], 20, 20)
      let x = map(i, 0, waveform.length - 1, 0, curveBase);
      let y = map(waveform[i], 0, 255, 0, add);
      let y_r = map(waveform[waveform.length - i - 1], 0, 255, 0, add);
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
  red = newRange * 6;
  green = 30;
  blue = 30;
}
