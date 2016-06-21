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

var createLowpassFilter = function (cutoff) {
  var lowpassFilter = ctx.createBiquadFilter();
  lowpassFilter.type = 'lowpass';
  lowpassFilter.gain.value = 1;
  lowpassFilter.frequency.value = cutoff;
  lowpassFilter.Q.value = 0;
  return lowpassFilter;
};

var createMasterGainNode = function () {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 0.2;
  gainNode.connect(ctx.destination);
  return gainNode;
};

var Note = function (freq, vol, cutoff) {
  this.masterGain = createMasterGainNode();
  this.masterGain.gain.value = vol;
  this.lowpassFilter = createLowpassFilter(cutoff);
  this.lowpassFilter.connect(this.masterGain);

  this.sawNode = createSawOscillator(freq);
  this.sawGain = createSawGainNode();
  this.sawGain.connect(this.lowpassFilter);
  this.sawNode.connect(this.sawGain);
};

Note.prototype = {
  start: function (startVol) {
    this.sawGain.gain.value = 0.05;
    this.masterGain.gain.value = startVol;
  },

  stop: function () {
    this.sawNode.stop();
    // this.sawGain.gain.value = 0;
  },

  changeMasterVol: function (newVol) {
    this.masterGain.gain.value = newVol;
  },

  changeFilterFreq: function (newFreq) {
    this.lowpassFilter.frequency.value = newFreq;
  }
};

module.exports = Note;
