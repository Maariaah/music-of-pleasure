// for (let i = 0; i < 360; i++) {
//   // let x1 = map(i - 1, start, end, 0, w);
//   // let y1 = map(buffer[i - 1], 0, 1, 10, 100);
//   // let x2 = map(i, start, end, 0, w);
//   // let y2 = map(buffer[i], -1, 1, 0, h);

//   let r = map(buffer[start] / i, buffer[end], 1, 100, 300);
//   let x = r * cos(i);
//   let y = r * sin(i);
//   vertex(x, y);

//   if (buffer > 360) {
//     buffer.splice(0, 1);
//   }
// }

// for (let i = 1; i < buffer.length; i++) {
//   if (buffer[i - 1] < 0 && buffer[i] >= 0) {
//     start = i;
//     break; // interrupts a for loop
//   }
// }

// let end = start + buffer.length / 2;






    // if (value <= -300) {
    //   bassline.push({
    //     time: seconds,
    //     note: A,
    //     duration: duration1,
    //   });
    // }
    // if (value > -250 && value <= 200) {
    //   bassline.push({
    //     time: seconds,
    //     note: A,
    //     duration: duration2,
    //   });
    // }
    // if (value > -200 && value <= 150) {
    //   bassline.push({
    //     time: seconds,
    //     note: A,
    //     duration: duration3,
    //   });
    // }
    // if (value > -150 && value <= 100) {
    //   bassline.push({
    //     time: seconds,
    //     note: C,
    //     duration: duration1,
    //   });
    // }
    // if (value > 100 && value <= 0) {
    //   bassline.push({
    //     time: seconds,
    //     note: C,
    //     duration: duration2,
    //   });
    // }
    // if (value > 0 && value <= 50) {
    //   bassline.push({
    //     time: seconds,
    //     note: C,
    //     duration: duration3,
    //   });
    // }
    // if (value > 50 && value <= 100) {
    //   bassline.push({
    //     time: seconds,
    //     note: E,
    //     duration: duration1,
    //   });
    // }
    // if (value > 100 && value <= 150) {
    //   bassline.push({
    //     time: seconds,
    //     note: E,
    //     duration: duration2,
    //   });
    // }
    // if (value > 150 && value <= 200) {
    //   bassline.push({
    //     time: seconds,
    //     note: E,
    //     duration: duration3,
    //   });
    // }
    // if (value > 250 && value <= 300) {
    //   bassline.push({
    //     time: seconds,
    //     note: D,
    //     duration: duration1,
    //   });
    // }
    // if (value > 350 && value <= 400) {
    //   bassline.push({
    //     time: seconds,
    //     note: D,
    //     duration: duration2,
    //   });
    // } else {
    //   bassline.push({
    //     time: seconds,
    //     note: F,
    //     duration: duration1,
    //   });
    // }