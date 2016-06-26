var ctx = new (window.AudioContext || window.webkitAudioContext)();

// Main oscillators — Sawtooth, Square and Triangle
// Sawtooth detuned 101% of input frequency
// Square detuned 99% of input frequency
// Triangle not detuned at all
// Individual gain nodes for each oscillator

var createSawOscillator = function (freq) {
  var osc = ctx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.value = freq * 1.008;
  osc.detune.value = 0;
  // osc.start();
  return osc;
};

var createSawGainNode = function () {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  return gainNode;
};

var createSquareOscillator = function (freq) {
  var osc = ctx.createOscillator();
  osc.type = "square";
  osc.frequency.value = freq * 0.992;
  osc.detune.value = 0;
  // osc.start();
  return osc;
};

var createSquareGainNode = function () {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  return gainNode;
};

var createTriOscillator = function (freq) {
  var osc = ctx.createOscillator();
  osc.type = "square";
  osc.frequency.value = freq * 1.0;
  osc.detune.value = 0;
  // osc.start();
  return osc;
};

var createTriGainNode = function () {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  return gainNode;
};

// Builds resonant Lowpass Filter

var createLowpassFilter = function (cutoff, Q) {
  var lowpassFilter = ctx.createBiquadFilter();
  lowpassFilter.type = 'lowpass';
  lowpassFilter.gain.value = 1;
  lowpassFilter.frequency.value = cutoff;
  lowpassFilter.Q.value = Q;
  return lowpassFilter;
};

// Builds Master Gain Node

var createMasterGainNode = function () {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 0.2;
  gainNode.connect(ctx.destination);
  return gainNode;
};

// Builds LFO and corresponding gain node

var createLFO = function () {
  var osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = 4;
  osc.start();
  return osc;
};

var createLFOGain = function () {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 1;
  return gainNode;
};

// Builds a note and a set of oscillators, filter and gain for each

var Note = function (freq, vol, cutoff, Q, filterLFOAmount) {
  this.masterGain = createMasterGainNode();
  this.masterGain.gain.value = vol;
  this.lowpassFilter = createLowpassFilter(cutoff, Q);
  this.lowpassFilter.connect(this.masterGain);

  this.lfo = createLFO();
  // this.lfoGain = createLFOGain();
  this.lfo.connect(this.lowpassFilter.detune);
  // this.lfoGain.connect(this.lowpassFilter.detune);
  // debugger;

  this.sawNode = createSawOscillator(freq);
  this.sawGain = createSawGainNode();
  this.sawGain.connect(this.lowpassFilter);
  this.sawNode.connect(this.sawGain);

  this.squareNode = createSquareOscillator(freq);
  this.squareGain = createSquareGainNode();
  this.squareGain.connect(this.lowpassFilter);
  this.squareNode.connect(this.squareGain);

  this.triNode = createTriOscillator(freq);
  this.triGain = createTriGainNode();
  this.triGain.connect(this.lowpassFilter);
  this.triNode.connect(this.triGain);

  this.sawNode.start();
  this.squareNode.start();
  this.triNode.start();
};

Note.prototype = {
  start: function (startVol, sawVol, squareVol, triVol, filterLFOAmount) {
    this.sawGain.gain.value = sawVol;
    this.squareGain.gain.value = squareVol;
    this.triGain.gain.value = triVol;
    this.masterGain.gain.value = startVol;
    // debugger;
    // this.lfoGain.gain.value = filterLFOAmount;
  },

  stop: function () {
    this.sawNode.stop();
    this.squareNode.stop();
    this.triNode.stop();
  },

  changeMasterVol: function (newVol) {
    this.masterGain.gain.value = newVol;
  },

  changeFilterFreq: function (newFreq) {
    this.lowpassFilter.frequency.value = newFreq;
  },

  changeResonance: function (newRes) {
    this.lowpassFilter.Q.value = newRes;
  },

  changeSawVol: function (newSawVol) {
    this.sawGain.gain.value = newSawVol;
  },

  changeSquareVol: function (newSquareVol) {
    this.squareGain.gain.value = newSquareVol;
  },

  changeTriVol: function (newTriVol) {
    this.triGain.gain.value = newTriVol;
  },

  changeFilterLFOAmount: function (newLFOGain) {
    // console.log(newLFOGain);
    // this.lfoGain.gain.value = newLFOGain;
    // console.log(this.lfoGain.gain.value);
    // debugger;
  }
};

module.exports = Note;
