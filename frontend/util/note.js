var ctx = new (window.AudioContext || window.webkitAudioContext)();

var createSawOscillator = function (freq) {
  var osc = ctx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start();
  return osc;
};

var createSquareOscillator = function (freq) {
  var osc = ctx.createOscillator();
  osc.type = "square";
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start();
  return osc;
};

var createTriangleOscillator = function (freq) {
  var osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start();
  return osc;
};

var createSawGainNode = function () {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  return gainNode;
};

var createSquareGainNode = function () {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  return gainNode;
};

var createTriangleGainNode = function () {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  return gainNode;
};

var createMasterGainNode = function () {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  gainNode.connect(ctx.destination);
  return gainNode;
};

// var createLowpassFilter = function () {
//   var lowpassFilter = ctx.createBiquadFilter();
//   console.log(lowpassFilter);
//   lowpassFilter.type = 'lowpass';
//   // lowpassFilter.frequency.value = 4000;
// };

var Note = function (freq) {
  this.masterGain = createMasterGainNode();
  // this.lowpassFilter = createLowpassFilter();

  this.sawNode = createSawOscillator(freq);
  this.sawGain = createSawGainNode();
  // this.sawGain.connect(this.lowpassFilter);
  this.sawGain.connect(this.masterGain);
  this.sawNode.connect(this.sawGain);

  this.squareNode = createSquareOscillator(freq);
  this.squareGain = createSquareGainNode();
  // this.squareGain.connect(this.lowpassFilter);
  this.squareGain.connect(this.masterGain);
  this.squareNode.connect(this.squareGain);

  this.triangleNode = createTriangleOscillator(freq);
  this.triangleGain = createTriangleGainNode();
  // this.triangleGain.connect(this.lowpassFilter);
  this.triangleGain.connect(this.masterGain);
  this.triangleNode.connect(this.triangleGain);

  // this.lowpassFilter.connect(this.masterGain);
};

Note.prototype = {
  start: function () {
    this.sawGain.gain.value = 0.05;
    this.squareGain.gain.value = 0.05;
    this.triangleGain.gain.value = 0.2;
    this.masterGain.gain.value = 0.2;
  },

  stop: function () {
    this.sawNode.stop()
    this.triangleNode.stop()
    this.squareNode.stop()

    this.masterGain.gain.value = 0;
    this.squareGain.gain.value = 0;
    this.triangleGain.gain.value = 0;
  },

  freq: function (newFreq) {
    this.sawNode.frequency.value = newFreq;
    this.triangleNode.frequency.value = newFreq;
    this.squareNode.frequency.value = newFreq;
  },
};

module.exports = Note;
