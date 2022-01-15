function initializeKicks() {
  
  const kickDrum = new Tone.MembraneSynth({
    volume: 6,
  }).toMaster();
  
  const kicks = [
    { time: "0:0" },
    { time: "0:3:2" },
    { time: "1:1" },
    { time: "2:0" },
    { time: "2:1:2" },
    { time: "2:3:2" },
    { time: "3:0:2" },
    { time: "3:1:" },
    { time: "4:0" },
    { time: "4:3:2" },
    { time: "5:1" },
    { time: "6:0" },
    { time: "6:1:2" },
    { time: "6:3:2" },
    { time: "7:0:2" },
    { time: "7:1:" },
  ];
  
  const kickPart = new Tone.Part(function (time) {
    kickDrum.triggerAttackRelease("C1", "8n", time);
  }, kicks).start(0);
  
}
