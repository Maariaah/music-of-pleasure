// VISUAL
// Irregularities - force
// Color - temperature
// Time - seconds
// Rotation - gyro
// Position - accel

// MUSIC
// Chords - force
// Main melody - temperature
// Drums - gyroscope position
// Bass - accelerator position

// https://www.devbridge.com/articles/tonejs-coding-music-production-guide/
// https://www.guitarland.com/MusicTheoryWithToneJS/PlayChords.html

// [1,2,3,4,5,6,7,8] - Oktave, visina tona
// ["A", "B", "C", "D", "E", "F", "G"] - Tonovi, akordi
// [FChord1, FChord2] - Triade
// synth.triggerAttackRelease('C4', '8n') - note C on the 4th octave, 8th note

let playButton;
let s = "seconds";
let temp = "temp (C)";
let fc = "force (gF)";
let mtr = "motor (%)";
let gyroX = "gyro_thx (deg/sec)";
let gyroY = "gyro_thy (deg/sec)";
let gyroZ = "gyro_thz (deg/sec)";
let accelY = "accel_y (m/s^2)";
let accelX = "accel_x (m/s^2)";
let motor, temperature, force, seconds, gyroscopeX;
const AMinorScale = ["A", "B", "C", "D", "E", "F", "G"];
let FChord, IChord, IIChord, IIIChord, IVChord, VChord;
let synthF, synthT, majorPart, melodyPart;
let highOctaveChords;
let mainChords = [];
let mainMelody = [];
let wave;
let prevNote;
let volume = -6;
let fft;
var resolution = 128;
var progress = 0;
let particles = [];
let lfo;
let frequency;
var beatThreshold = 0.02;
var defaultBPM = 120;
var startColor = 256;
var fqSmoothLevel = 2;
var source;

async function preload() {
  data = await loadTable("./data/1483243201.csv", "csv", "header");
}

function setup() {
  createCanvas(500, 1200);
  angleMode(DEGREES);

  // Define data
  motor = data.getColumn(mtr);
  temperature = data.getColumn(temp);
  force = data.getColumn(fc);
  seconds = data.getColumn(s);
  gyroscopeX = data.getColumn(gyroX);

  // CHORDS

  // FORCE - Main chords
  IChord = constructMajorChord(AMinorScale, 3, "A3");
  IIChord = constructMajorChord(AMinorScale, 3, "E4");
  IIIChord = constructMajorChord(AMinorScale, 4, "F3");
  IVChord = constructMajorChord(AMinorScale, 4, "D4");
  VChord = constructMajorChord(AMinorScale, 3, "G4");

  source = new p5.AudioIn();
  source.start();
  fft = new p5.FFT(0.92, 512);
  fft.setInput(source);
  let beat = new p5.PeakDetect(2000, 20000, beatThreshold, 60/(defaultBPM/60))

  // Set volume
  vol = new Tone.Volume();

  // Set Low frequency oscilator
  // lfo = new Tone.LFO("4n", 100, 4000);

  // Analyse frequency/amplitude of signal
  // fft = new Tone.FFT(resolution);

  // Get waveform data of signal
  wave = new Tone.Waveform(resolution);

   Tone.Transport.start();

  // Use a synth as an instrument to play chords
  synthMajor = new Tone.PolySynth(4, Tone.Synth, {
    volume: -10,
    oscillator: {
      type: "sawtooth",
    },
  })
    .connect(wave)
    // .connect(fft)
    .connect(vol)
    .toMaster();

  // Set the BPM (beats per minute)
  Tone.Transport.bpm.value = 0.5;

  // Progression or sequence
  constructForceChords();

  //Use part to encapsulate chords into single unit
  majorPart = new Tone.Part(function (time, note) {
    if (prevNote != note.note) {
      synthMajor.triggerAttackRelease(note.note, note.duration, time);
    }

    prevNote = note.note;
  }, mainChords).start(0);
}

var k = 90;
var c = startColor
var b = 0

function draw() {
  drawWaveform(wave, fft);
  defineColor();
}

function drawWaveform(wave, fft, w = width, h = height) {
  frequency = synthMajor.get().oscillator.frequency;
  // let buffer = fft.getValue();
  let spectrum = fft.analyze();
  beat.update(fft);
  if( beat.isDetected ){

    c = map(b++, 0,15, 0,360)

  }
  if(c>359) c=0;
  if(b>15) b=0;
  var energy = fft.getEnergy("bass","treeble")

  text("Frequency: " + frequency, 20, 20);
  text("FFT: " + JSON.stringify(fft), 20, 50);
  // text("Wave: " + wave.getValue(0), 20, 80);
  text(
    "Scale spectrum: " + splitOctaves(spectrum, map(energy, 0, 255, 6, 12)),
    20,
    100
  );
  text("Energy: " + energy, 20, 120);


  // Draw vertex
  var scaledSpectrum = splitOctaves(spectrum, map(energy, 0, 255, 6, 12));
  var len = scaledSpectrum.length;
  var N = len - 20;
  var volume = max(scaledSpectrum);

  translate(width/2, height/2)
  rotate(radians(c))
  translate(-width/2, -height/2)

  beginShape();


  fill(c, volume*0.8, 255, 0.01);
  stroke(c, volume, 128 - volume/2, 0.4);

  // one at the far corner
  curveVertex(x, y);

  for (var i = 0; i < N; i++) {
    var point = smoothPoint(scaledSpectrum, i, fqSmoothLevel);
    var R = point * 1.5;
    x = width /2+R*cos(radians(i*180/N+k+180));
    y = height/2+R*sin(radians(i*180/N+k));

    if (i === 0)
      var x1 = x,
        y1 = y;
    curveVertex(x, y);
  }

  for (var i = N; i > 0; i--) {
    point = smoothPoint(scaledSpectrum, i, fqSmoothLevel);
    R = point * 1.5;
    x = width / 2 + R * cos(radians((i * 180) / N + k + 180));
    y = height / 2 + R * sin(radians((i * 180) / N + k));

    curveVertex(x, y);
  }

  // one last point at the end
  curveVertex(x1, y1);
  curveVertex(x, y);

  endShape();
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
