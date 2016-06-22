var ctx = new (window.AudioContext || window.webkitAudioContext)();

var createSawOscillator = function (freq) {
  var osc = ctx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.value = freq * 1.01;
  osc.detune.value = 0;
  osc.start();
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
  osc.frequency.value = freq * 0.99;
  osc.detune.value = 0;
  osc.start();
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
  osc.start();
  return osc;
};

var createTriGainNode = function () {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  return gainNode;
};

var createLowpassFilter = function (cutoff, Q) {
  var lowpassFilter = ctx.createBiquadFilter();
  lowpassFilter.type = 'lowpass';
  lowpassFilter.gain.value = 1;
  lowpassFilter.frequency.value = cutoff;
  lowpassFilter.Q.value = Q;
  return lowpassFilter;
};

var createMasterGainNode = function () {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 0.2;
  gainNode.connect(ctx.destination);
  return gainNode;
};

var Note = function (freq, vol, cutoff, Q) {
  this.masterGain = createMasterGainNode();
  this.masterGain.gain.value = vol;
  this.lowpassFilter = createLowpassFilter(cutoff, Q);
  this.lowpassFilter.connect(this.masterGain);

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
};

Note.prototype = {
  start: function (startVol, sawVol, squareVol, triVol) {
    this.sawGain.gain.value = sawVol;
    this.squareGain.gain.value = squareVol;
    this.triGain.gain.value = triVol;
    this.masterGain.gain.value = startVol;
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
  }
};

module.exports = Note;
