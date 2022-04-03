let hue = 360;
let saturation = 0;
let brightness = 100;
let prevForceValue = 0;
let prevTempValue = 0;

async function preload() {
  // ======== SONG 1 ========
  data = await loadTable(
    "./data/1637109005 Only session with 2 orgasms.csv",
    "csv",
    "header"
  ); // Standalone
  // 1624909543;
}
var Cmajor = ["C", "D", "E", "F", "G", "A", "B", "C"];
let defaultBPM = 330;

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

  // env = new Tone.AmplitudeEnvelope();
  // pitchShift = new Tone.PitchShift();
  // gainNode = Tone.context.createGain();

  // Analyse frequency/amplitude of signal
  fft = new Tone.FFT({
    size: 128,
    //smoothing: 5,
    // normalRange: true
  });
  meter = new Tone.Meter();
  //let pos = 0.5 - this.meter.getValue(0); // -> -0.5 ~ 0.5

  signal = new Tone.Signal();

  waveform = new Tone.Waveform({
    size: 128,
    normalValue: true,
  });

  playInstruments();
  startSound()
  // Tone.Master.connect(waveform).connect(fft).connect(env)

  // Set the BPM (beats per minute)
  Tone.Transport.bpm.value = defaultBPM;
  // .connect(gainNode).connect(pitchShift);
}

function draw() {

  //Draw a shape
  drawWaveform();

  // button = createButton("click me");
  // button.position(0, 0);
  // button.mousePressed(startSound);

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
