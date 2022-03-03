function drawWaveform() {
  spectrum = fft.getValue().map((item) => Math.abs(item)); // create Analyser
  beginShape();

  for (let i = 0; i < spectrum.length; i++) {
    let amp = map(spectrum[i], 30, 170, 200, 0);
    fill(255);
    let y = map(amp, 50, 170, height, 0);
    line(i * space_between_lines, height, i * space_between_lines, y);
    
    fill(255);

    rect(
      width / 2 + i * space_between_lines,
      y,
      space_between_lines,
      height - y
    );

    rect(
      width / 2 - i * space_between_lines,
      y,
      space_between_lines,
      height - y
    );
  }
  endShape();

}
