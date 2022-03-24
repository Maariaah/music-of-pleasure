// Song3
var Dmajor = ["D", "E", "F", "G", "A", "B", "C", "D"];
var defaultBPM = 280;

async function preload() {
  // ======== SONG 3 ========
  data = await loadTable("./data/1624909543.csv", "csv", "header");
}

function setup() {
  createCanvas(800, 600);
  colorMode(HSB);
  w = windowWidth / 2;
  h = windowHeight / 2;
  space_between_lines = width / 2 / 64;

  // Define data
  motor = data.getColumn(mtr);
  temperature = data.getColumn(temp);
  force = data.getColumn(fc);
  seconds = data.getColumn(s);
  gyroscopeX = data.getColumn(gyroX);
  gyroscopeY = data.getColumn(gyroY);
  gyroscopeZ = data.getColumn(gyroZ);
  acceleratorX = data.getColumn(accX);
  acceleratorY = data.getColumn(accY);
  acceleratorZ = data.getColumn(accZ);
  env = new Tone.AmplitudeEnvelope();

  // Analyse frequency/amplitude of signal
  fft = new Tone.Analyser({
    size: 512,
    type: fft,
  });
  meter = new Tone.Meter();
  //let pos = 0.5 - this.meter.getValue(0); // -> -0.5 ~ 0.5

  scource = new Tone.Source();
  signal = new Tone.Signal();
  waveform = new Tone.Waveform({
    size: 512,
  });

  playInstruments();

  Tone.Master.connect(waveform).connect(fft).connect(env);
  // Set the BPM (beats per minute)
  Tone.Transport.bpm.value = defaultBPM;
}

function draw() {
  // defineColor();
  //drawWaveform();

  button = createButton("click me");
  button.position(0, 0);
  button.mousePressed(startSound);

  /*** Chrome autoplay on gesture bug ***/
  // https://github.com/Tonejs/Tone.js/issues/341
  document.documentElement.addEventListener("mousedown", function () {
    if (Tone.context.state !== "running") {
      Tone.context.resume();
    }
  });
}

function startSound() {
  Tone.Transport.start();
  // player.start();
  getAudioContext().resume();
}
