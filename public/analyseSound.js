// Song 2
// let forcePitch = 53;
// let HIGH_BREAK_POINT = 15;
// let MIN_BREAK_POINT = 3;
// let AVG_BREAK_POINT = 9;

// Song 3
let forcePitch = 40;
let HIGH_BREAK_POINT = 15;
let MIN_BREAK_POINT = 3;
let AVG_BREAK_POINT = 9;

// Song 4
// let forcePitch = 70;
// let HIGH_BREAK_POINT = 15;
// let MIN_BREAK_POINT = 2;
// let AVG_BREAK_POINT = 9;

let HIGH_BREAK_POINT_HIT;
let AVG_BREAK_POINT_HIT;
let AVG_BREAK_POINT_HIT2;
let MIN_BREAK_POINT_HIT;
let brightness = 50;

var player = document.getElementById("player");
 var context = new AudioContext();
var source = context.createMediaElementSource(player);
var analyser = context.createAnalyser();
var gainNode = context.createGain();
gainNode.gain.value = 1;
gainNode.connect(analyser);
source.connect(analyser);
analyser.connect(context.destination);
analyser.fftSize = 1024;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);


// analyser.fftSize = 32;
// analyser.fftSize = 64;
// analyser.fftSize = 128;
// analyser.fftSize = 256;
// analyser.fftSize = 512;
// analyser.fftSize = 1024;
// analyser.fftSize = 2048;
// analyser.fftSize = 4096;
// analyser.fftSize = 8192;
// analyser.fftSize = 16384;
// analyser.fftSize = 32768;