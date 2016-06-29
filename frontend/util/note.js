var ctx = new (window.AudioContext || window.webkitAudioContext)();
var WAVES = require('../constants/waves');

// Main oscillators — Sawtooth, Square and Triangle
// Sawtooth detuned 101% of input frequency
// Square detuned 99% of input frequency
// Triangle not detuned at all
// Individual gain nodes for each oscillator

var createSawOscillator = function (freq) {
  var osc = ctx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.value = freq;
  osc.frequency.detune = 8;
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
  osc.detune.value = -8;
  return osc;
};

var createSquareGainNode = function () {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  return gainNode;
};

var createTriOscillator = function (freq) {
  var osc = ctx.createOscillator();
  osc.type = "triangle";
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

var createHighpassFilter = function (cutoff) {
  var highpassFilter = ctx.createBiquadFilter();
  highpassFilter.type = 'highpass';
  highpassFilter.gain.value = 1;
  highpassFilter.Q.value = 0;
  highpassFilter.frequency.value = 10000;
  return highpassFilter;
};

// Builds Master Gain Node

var createMasterGainNode = function () {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 0.2;
  gainNode.connect(ctx.destination);
  return gainNode;
};

// Builds LFO and corresponding gain node

var createLFO = function (freq) {
  var osc = ctx.createOscillator();
  osc.frequency.value = freq;
  osc.type = 'sine';
  osc.start();
  return osc;
};

var createLFOGain = function (gain) {
  var gainNode = ctx.createGain();
  gainNode.gain.value = gain;
  return gainNode;
};

var createSubOsc = function (freq) {
  var osc = createSquareOscillator(freq / 2);
  osc.detune.value = 0;
  osc.type = "square";
  return osc;
};

var createSubGainNode = function () {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  return gainNode;
};

// Builds a note and a set of oscillators, filter and gain for each

var Note = function (freq, vol, cutoff, Q, filterLFOAmount, filterLFOSpeed, filterLFOWave, ampLFOAmount, ampLFOSpeed, ampLFOWave, hpf) {
  this.masterGain = createMasterGainNode();
  this.masterGain.gain.value = vol;
  this.lowpassFilter = createLowpassFilter(cutoff, Q);
  this.lowpassFilter.connect(this.masterGain);
  this.highpassFilter = createHighpassFilter(hpf);
  this.highpassFilter.connect(this.masterGain);

  this.lfo1 = createLFO(filterLFOSpeed, filterLFOWave);
  this.lfo1Gain = createLFOGain(filterLFOAmount);
  this.lfo1.connect(this.lfo1Gain);
  this.lfo1Gain.connect(this.lowpassFilter.detune);

  this.lfo2 = createLFO(ampLFOSpeed, ampLFOWave);
  this.lfo2Gain = createLFOGain(ampLFOAmount);
  this.lfo2.connect(this.lfo2Gain);
  this.lfo2Gain.connect(this.masterGain.gain);

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

  this.subNode = createSubOsc(freq);
  this.subGain = createSubGainNode();
  this.subGain.connect(this.lowpassFilter);
  this.subNode.connect(this.subGain);

  this.sawNode.start();
  this.squareNode.start();
  this.triNode.start();
  this.subNode.start();
};

Note.prototype = {
  start: function (
      startVol,
      sawVol,
      squareVol,
      triVol,
      filterLFOAmount,
      filterLFOSpeed,
      filterLFOWave,
      subOscVol,
      ampLFOAmount,
      ampLFOSpeed,
      ampLFOWave,
      hpf
    ) {
    this.sawGain.gain.value = sawVol;
    this.squareGain.gain.value = squareVol;
    this.triGain.gain.value = triVol;
    this.masterGain.gain.value = startVol;
    this.lfo1Gain.gain.value = filterLFOAmount;
    this.lfo1.frequency.value = filterLFOSpeed;
    this.lfo1.type = WAVES[filterLFOWave];
    this.subGain.gain.value = subOscVol;
    this.lfo2Gain.gain.value = ampLFOAmount;
    this.lfo2.frequency.value = ampLFOSpeed;
    this.lfo2.type = WAVES[ampLFOWave];
    this.highpassFilter.frequency.value = hpf;
  },

  stop: function () {
    this.sawNode.stop();
    this.squareNode.stop();
    this.triNode.stop();
    this.subNode.stop();
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

  changeFilterLFOAmount: function (newLFO1Gain) {
    this.lfo1Gain.gain.value = newLFO1Gain;
  },

  changeFilterLFOSpeed: function (newFilterLFOSpeed) {
    this.lfo1.frequency.value = newFilterLFOSpeed;
  },

  changeFilterLFOWave: function (newFilterLFOWave) {
    this.lfo1.type = WAVES[newFilterLFOWave];
  },

  changeSubOscVol: function (newSubOscVol) {
    this.subGain.gain.value = newSubOscVol;
  },

  changeAmpLFOAmount: function (newLFO2Gain) {
    this.lfo2Gain.gain.value = newLFO2Gain;
  },

  changeAmpLFOSpeed: function (newLFO2Speed) {
    this.lfo2.frequency.value = newLFO2Speed;
  },

  changeAmpLFOWave: function (newLFOWave) {
    this.lfo2.type = WAVES[newLFOWave];
  },

  changeHPF: function (newHPF) {
    this.highpassFilter.frequency.value = newHPF;
    console.log(this.highpassFilter.frequency.value);
  }
};

module.exports = Note;
