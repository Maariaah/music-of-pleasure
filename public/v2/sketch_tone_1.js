// VISUAL
// Irregularities - force
// Color - temperature
// Size -
// Time - seconds
// Rotation - gyro
// Position - accel

// MUSIC
// Chords - force
// Drums - gyroscope position
// Bass - accelerator position

// https://editor.p5js.org/mrbombmusic/sketches/CITuev6b

synth = new Tone.FMSynth().toMaster();
let generateButton;
let playButton;
let selectScale;
let root = 52;
let scale = [];
let scaleNames = ["Major", "Force", "Seconds"];
let selectedScale = scale[0];
let numNotes = 5;
let melody = [];
let beat;
let n;
let note;
let noteSlider;
let noteText;
let bpmSlider;
let bpmText;
let bpm = 120;
let pt = [];
let x = 8;
let y = 192;
let s = "seconds";
let temp = "temp (C)";
let fc = "force (gF)";
let mtr = "motor (%)";
let gyroX = "gyro_thx (deg/sec)";
let gyroY = "gyro_thy (deg/sec)";
let gyroZ = "gyro_thz (deg/sec)";
let accelY = "accel_y (m/s^2)";
let accelX = "accel_x (m/s^2)";
let force = [];
let seconds = [];
let major;

async function preload() {
  data = await loadTable("./data/1483243201.csv", "csv", "header");

  selectScale = createSelect();
  selectScale.position(200, 500);
  for (let i = 0; i < scaleNames.length; i++) {
    selectScale.option(scaleNames[i]);
  }
  selectedScale = 0;
}

function setup() {
  major = [0, 2, 4, 5, 7, 9, 11, 12];

  // adjust force
  for (let i = 0; i < data.getColumn(fc).length; i++) {
    force.push(parseInt(data.getColumn(fc)[i] / 20));
  }

  // adjust seconds
  for (let i = 0; i < data.getColumn(s).length; i++) {
    seconds.push(data.getColumn(s)[i] / 10);
  }

  scale = [major, force, seconds];

  createCanvas(1000, 300);
  selectScale.changed(chooseScale);

  for (let i = 0; i < numNotes; i++) {
    pt.push(new Note(x, y));
    // x += width / numNotes;
  }

  generateMelody();
  setTimeSig(10);
  generateButton = createButton("Generate Melody");
  generateButton.position(150, height);
  generateButton.mousePressed(generateMelody);

  playButton = createButton("play");
  playButton.position(275, height);
  playButton.mousePressed(playMelody);

  bpmSlider = createSlider(60, 300, 120, 1);
  bpmSlider.position(10, height);
  Tone.Transport.bpm.value = bpm;
  bpmText = createP(" ");
  bpmText.position(20, height + 10);

  noteSlider = createSlider(3, 16, 8, 1);
  noteSlider.position(460, height);
  noteText = createP(" ");
  noteText.position(470, height + 10);
}

function draw() {
  numNotes = force.length;

  // DRAW LINES

  background(0);
  stroke("#ed70ae");
  beginShape();
  for (let i = 0; i < pt.length; i++) {
    noFill();
    vertex(pt[i].pos.x, pt[i].pos.y);
  }
  endShape();

  // DRAW DOTS

  for (let j = 0; j < pt.length; j++) {
    if (j == beat && Tone.Transport.state == "started") {
      pt[j].size = 20;
    } else {
      pt[j].size = 10;
    }

    if (numNotes < pt.length) {
      pt.splice(pt.length - 1, pt.length - numNotes);
      melody.splice(melody.length - 1, melody.length - numNotes);
      for (let k = 0; k < pt.length; k++) {
        pt[k].newMelody(k * (width / numNotes) + pt[k].size, pt[k].pos.y);
      }

      // setTimeSig(numNotes);
    } else if (numNotes > pt.length) {
      n = int(random(scale[selectedScale].length));
      note = root + scale[selectedScale][n];
      melody.push(note);
      pt.push(
        new Note(
          pt.length * (width / numNotes) + pt[j].size,
          height -
            melodyIndex(melody[pt.length]) *
              (height / scale[selectedScale].length) -
            pt[j].size
        )
      );

      for (let l = 0; l < pt.length; l++) {
        pt[l].newMelody(l * (width / numNotes) + pt[l].size, pt[l].pos.y);
      }
      setTimeSig(numNotes);
    }

    pt[j].move();
    pt[j].update();
    pt[j].display();
  }

  bpm = bpmSlider.value();
  Tone.Transport.bpm.rampTo(bpm, 0.001);
  bpmText.html("FORCE = " + pt.length);
}

function chooseScale() {
  selectedScale = scaleNames.indexOf(selectScale.value());
  generateMelody();
}

function melodyIndex(note) {
  let melIndex = note - root;
  return scale[selectedScale].indexOf(melIndex);
}

function setTimeSig(ts) {
  Tone.Transport.timeSignature = [ts, 4];
}

function playMelody() {
  if (Tone.Transport.state == "started") {
    Tone.Transport.stop();
    playButton.html("play");
  } else {
    Tone.Transport.scheduleRepeat(setMelody, "4n");
    Tone.Transport.start();
    playButton.html("stop");
  }
}

function setMelody() {
  beat = Tone.Transport.position.split(":")[1];
  //let midiNote = Tone.Frequency(melody[beat], "midi");
  synth.triggerAttackRelease("G2", "8n");
}

function generateMelody() {
  if (melody.length == numNotes) {
    melody.splice(0, melody.length);
  }

  for (let i = 0; i < numNotes; i++) {
    n = int(scale[selectedScale].length);
    note = root + scale[selectedScale][n];
    melody.push(note);
    pt[i].newMelody(
      i * (width / numNotes) + pt[i].size,
      height -
        melodyIndex(melody[i]) * (height / scale[selectedScale].length) -
        pt[i].size
    );
  }
}
