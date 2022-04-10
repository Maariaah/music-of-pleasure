// VISUAL
// Irregularities - force
// Color - temperature
// Time - seconds
// Rotation - gyro
// Position - accel

// MUSIC
// Main Chords - force
// Main melody - temperature
// Drums - gyroscope position
// Bass - accelerator position

// https://www.devbridge.com/articles/tonejs-coding-music-production-guide/
// https://www.guitarland.com/MusicTheoryWithToneJS/PlayChords.html
//  https://www.guitarland.com/MusicTheoryWithToneJS/PlayMinorScales.html
// [1,2,3,4,5,6,7,8] - Oktave, visina tona
// ["A", "B", "C", "D", "E", "F", "G"] - Tonovi, akordi
// [FChord1, FChord2] - Triade
// synth.triggerAttackRelease('C4', '8n') - note C on the 4th octave, 8th note
//https://tone-demos.glitch.me/
//PIANO DEMO:
//https://modulovalue.com/tonejs_meets_flutterweb/#/
//https://www.guitarland.com/MusicTheoryWithToneJS/Presets-gh-pages/

let playButton;
let s = "seconds";
let temp = "temp (C)";
let fc = "force (gF)";
let mtr = "motor (%)";
let gyroX = "gyro_thx (deg/sec)";
let gyroY = "gyro_thy (deg/sec)";
let gyroZ = "gyro_thz (deg/sec)";
let accY = "accel_y (m/s^2)";
let accX = "accel_x (m/s^2)";
let accZ = "accel_z (m/s^2)";
let motor, temperature, force, seconds, gyroscopeX;
let beat;
let frequency;
let spectrum;
let scource;
let signal;
var w, h;
let space_between_lines;
let meter;
let melodyPart, melody2Part, harmonyPart, kickPart, bassPart;
let speed;
let red;
let green;
let blue;
let button;
let fft;
let fft2;
let env;
let waveform;
let synthMajor;
var beatThreshold = 0.02;
let prevMelodyTone;
let lfo;
let date = new Date();
let song5Timeout = 2000;
let fft1;
var pitchShift;
var gainNode;
var note = 0;
let audioLength = 2000;
let synthMelody;
