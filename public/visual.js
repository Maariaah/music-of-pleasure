function calculateColor(current, l, h) {
  let green = 110;
  let blue = 110;

  return stroke(
    map(parseInt(current * 10), parseInt(l * 10), parseInt(h * 10), 0, 225),
    green,
    blue
  );
}

function drawWaveform(wave, fft) {
  frequency = synthMajor.get().oscillator.frequency;
  waveform = fft.getValue();
  envelope = synthMajor.get().envelope;
  let lowest = temperature.sort((a, b) => a - b)[0];
  let highest = temperature.sort((a, b) => b - a)[0];

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
      calculateColor(temperature[i], lowest, highest);

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
