let t = 0;
let t1 = 0;
let sel1 = 0,
  sel2 = 0;
function drawWaveform() {
  spectrum = fft.getValue().map((item) => Math.abs(item)); // create Analyser
  let t2 = frameCount * 2;

  //   for (var i = 0; i < spectrum.length; i++) {
  //     t2 = i;
  //     rotate(t2 / 100);

  //     stroke(
  //         lerpColor(
  //           color(46, 255, 241, 20),
  //           color(250, 110, 22, 20),
  //           frameCount / 520
  //         )
  //       );

  //     //First anchor points
  //     let x1 = 85;
  //     let y1 = 20;
  //     let z1 = 10;

  //     //First control points
  //     let x2 = atan(t2 / 60) * 100;
  //     let y2 = cos(t2 / 60) * 100;
  //     let z2 = t2 / 60;
  //     //Second control points

  //     let x3 = atan(t2 / 60) * 100;
  //     let y3 = cos(t2 / 60) * 100;
  //     let z3 = 0;

  //     //Second anchor points
  //     let x4 = 15;
  //     let y4 = 80;
  //     let z4 = 0;

  //     bezier(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4);
  //   }

  //     for (let i = 1; i < 10; i++) {
  //       strokeWeight(noise(t));
  //     //   rotate(t2 / 100);

  //       bezier(
  //         0,
  //         [h / 2, i * 8, 0, random(8)][sel1 % 4],
  //         noise(t) * w,
  //         noise(t * 2) * h,
  //         noise(t * 3) * w,
  //         noise(t + i * 8) * h,
  //         w,
  //         [h / 2, i * 8, h, random(8)][sel2 % 4]
  //       );
  //     }

  t += 0.02;
  t1 += 0.08;

  if (frameCount % 200 == 0) sel1++;
  if (frameCount % 300 == 0) sel2++;

  translate(width / 2, height / 2);
  rotate(t2 / 100);

  //   rect(t2 / 140, t2 / 60, atan(t2 / 60) * 200, cos(t2 / 60) * 200);
  beginShape();
  stroke(
    lerpColor(
      color(46, 255, 241, 20),
      color(250, 110, 22, 20),
      frameCount / 520
    )
  );
  //  atan(t2 / 60) * 200, cos(t2 / 60) * 200
  var x =
    width * cos(radians(((t2 / 60) * 2000) * spectrum.length - 180));
  var y =
    height * atan(radians(((t2 / 60) * 2000) * spectrum.length - 180));

    var x1 = x / 5;
    var y1 = y / 5;

  curveVertex(x1, y1);
  curveVertex(x1, y1);
  curveVertex(x1, y1);
  curveVertex(x1, y1);

  endShape();

  frameRate(900);
  if (frameCount >= 990) {
    noLoop();
  }
}
