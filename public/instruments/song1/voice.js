function initializeVoice() {
  let pingPongEffect = new Tone.PingPongDelay({
    delayTime: "4n",
    feedback: 0.5,
    wet: 0.5,
  });

  player = new Tone.Player({
    url: "./mp3/laugh.mp3",
    loop: true,
    fadeIn: 3,
    fadeOut: 3,
  })
    .connect(pingPongEffect)
    .toMaster();
}
