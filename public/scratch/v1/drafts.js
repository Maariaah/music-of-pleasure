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
