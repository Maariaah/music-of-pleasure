var beatThreshold = 0.02
var defaultBPM = 120
var startColor = 256
var fqSmoothLevel = 2

/**
 *  Re-group the array of FFT bins into an
 *  array of more meaningful values
 *  using the splitOctaves method.
 */

var source, fft;

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB)
  noFill()

  source = new p5.AudioIn();
  source.start();

  fft = new p5.FFT(0.92, 512);
  fft.setInput(source);
  //amplitude = new p5.Amplitude();
  beat = new p5.PeakDetect(2000, 20000, beatThreshold, 60/(defaultBPM/60))
}

var k = 90;
var c = startColor
var b = 0

function draw() {
  var spectrum = fft.analyze();
  var newBuffer = [];
   beat.update(fft)
  
  //if(scaledSpectrum[4] > 128) {// beat
  //if(fft.getEnergy("bass") > 160){// beat
  //if(fft.getEnergy("bass") > 120) 

  if( beat.isDetected ){
    //c += 0.125
    c = map(b++, 0,15, 0,360)
    //ellipse(width/2, height/2, 8);
    //print(fft.getEnergy("bass"))
    //print(c)
  }
  if(c>359) c=0;
  if(b>15) b=0;

  var energy = fft.getEnergy("bass","treeble");
  //if( energy > 128 ){}
  // scaledSpectrum is a new, smaller array of more meaningful values
  var scaledSpectrum = splitOctaves(spectrum, map(energy, 0,255, 6,12));
  console.log(spectrum)
  var len = scaledSpectrum.length;
  var N = len - 20;
  var volume = max(scaledSpectrum);
  //var volume = map(amplitude.getLevel(), 0,1, 0,255);
  //var volume = fft.getEnergy("bass","treble");

  translate(width/2, height/2)
  rotate(radians(c))
  translate(-width/2, -height/2)
  
  //var orbitRadius = 50
  //var ypos = 0
  //var xpos = cos(radians(c))*orbitRadius
  //var zpos = sin(radians(c))*orbitRadius
  //camera(xpos, ypos, zpos, 0, 0, 0, 0, -1, 0)
  
  // draw shape
  beginShape();

  	fill(c, volume*0.8, 255, 0.01);
  	//strokeWeight(scaledSpectrum[len/2]/16);
    stroke(c, volume, 128 - volume/2, 0.4);
    //noStroke();
  
    // one at the far corner
    curveVertex(x, y);
    

    for (var i = 0; i < N; i++) {
      var point = smoothPoint(scaledSpectrum, i, fqSmoothLevel);
      var R = point * 1.5;
      var x = width /2+R*cos(radians(i*180/N+k));
      var y = height/2+R*sin(radians(i*180/N+k));
	  if(i===0) var x1=x, y1=y;
      curveVertex(x, y);
    }
    for (var i = N; i > 0; i--) {
      point = smoothPoint(scaledSpectrum, i, fqSmoothLevel);
      R = point * 1.5;
      x = width /2+R*cos(radians(i*180/N+k+180));
      y = height/2+R*sin(radians(i*180/N+k));

      curveVertex(x, y);
    }
  
    // one last point at the end
    curveVertex(x1, y1);
    curveVertex(x, y);

  endShape();
  

  //let img = createImage(width,height)
  //img.loadPixels()
  //loadPixels()
  //img.updatePixels()
  //translate(width/2, height/2)
  //rotate(- radians(c))
  //translate(-width/2, -height/2)
  //image(img, 0, 0)
}

function mouseClicked(){
	//tap
}


/**
 *  Divides an fft array into octaves with each
 *  divided by three, or by a specified "slicesPerOctave".
 *  
 *  There are 10 octaves in the range 20 - 20,000 Hz,
 *  so this will result in 10 * slicesPerOctave + 1
 *
 *  @method splitOctaves
 *  @param {Array} spectrum Array of fft.analyze() values
 *  @param {Number} [slicesPerOctave] defaults to thirds
 *  @return {Array} scaledSpectrum array of the spectrum reorganized by division
 *                                 of octaves
 */
function splitOctaves(spectrum, slicesPerOctave) {
  var scaledSpectrum = [];
  var len = spectrum.length;

  // default to thirds
  var n = slicesPerOctave|| 3;
  var nthRootOfTwo = Math.pow(2, 1/n);

  // the last N bins get their own 
  var lowestBin = slicesPerOctave;

  var binIndex = len - 1;
  var i = binIndex;


  while (i > lowestBin) {
    var nextBinIndex = round( binIndex/nthRootOfTwo );

    if (nextBinIndex === 1) return;

    var total = 0;
    var numBins = 0;

    // add up all of the values for the frequencies
    for (i = binIndex; i > nextBinIndex; i--) {
      total += spectrum[i];
      numBins++;
    }

    // divide total sum by number of bins
    var energy = total/numBins;
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

  for (var i = indexMinusNeighbors; i < (index+neighbors) && i < len; i++) {
    // if there is a point at spectrum[i], tally it
    if (typeof(spectrum[i]) !== 'undefined') {
      val += spectrum[i];
      smoothedPoints++;
    }
  }

  val = val/smoothedPoints;

  return val;
}