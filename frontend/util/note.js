var ctx = new (window.AudioContext || window.webkitAudioContext)();

var createSawOscillator = function (freq) {
  var osc = ctx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start(ctx.currentTime);
  return osc;
};

var createSquareOscillator = function (freq) {
  var osc = ctx.createOscillator();
  osc.type = "square";
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start(ctx.currentTime);
  return osc;
};

var createTriangleOscillator = function (freq) {
  var osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start(ctx.currentTime);
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

var Note = function (freq) {
  this.masterGain = createMasterGainNode();

  this.sawNode = createSawOscillator(freq);
  this.sawGain = createSawGainNode();
  this.sawGain.connect(this.masterGain);
  this.sawNode.connect(this.sawGain);

  this.squareNode = createSquareOscillator(freq);
  this.squareGain = createSquareGainNode();
  this.squareGain.connect(this.masterGain);
  this.squareNode.connect(this.squareGain);

  this.triangleNode = createTriangleOscillator(freq);
  this.triangleGain = createTriangleGainNode();
  this.triangleGain.connect(this.masterGain);
  this.triangleNode.connect(this.triangleGain);
};

Note.prototype = {
  start: function () {
    this.sawGain.gain.value = 0.05;
    this.squareGain.gain.value = 0.05;
    this.triangleGain.gain.value = 0.2;
  },

  stop: function () {
    this.sawGain.gain.value = 0;
    this.squareGain.gain.value = 0;
    this.triangleGain.gain.value = 0;
  },

  masterVol: function (newVol) {
    console.log(newVol);
    this.masterGain.gain.value = newVol;
  },

  freq: function (newFreq) {
    this.sawNode.frequency.value = newFreq;
    this.triangleNode.frequency.value = newFreq;
    this.squareNode.frequency.value = newFreq;
  },
};

module.exports = Note;
