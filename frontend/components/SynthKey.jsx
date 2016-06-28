var React = require('react'),
    KeyStore = require('../stores/key_store'),
    Note = require('../util/note'),
    MORETONES = require('../constants/more_tones');

var SynthKey = React.createClass({
  getInitialState: function () {
    return { pressed: this.thisKeyPressed() };
  },

  componentDidMount: function () {
    this.makeFullNoteName();
    this.note = new Note(this.makeNewFreq(),
      this.props.masterVolume,
      this.props.filterCutoff,
      this.props.Q,
      this.props.filterLFOAmount,
      this.props.filterLFOSpeed,
      this.props.filterLFOWave,
      this.props.ampLFOAmount,
      this.props.ampLFOSpeed,
      this.props.ampLFOWave,
      this.props.hpf
    );
    KeyStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function (newProps) {
    this.note.changeMasterVol(newProps.masterVolume);
    this.note.changeFilterFreq(newProps.filterCutoff);
    this.note.changeResonance(newProps.Q);
    this.note.changeSawVol(newProps.sawVol);
    this.note.changeSquareVol(newProps.squareVol);
    this.note.changeTriVol(newProps.triVol);
    this.note.changeFilterLFOAmount(newProps.filterLFOAmount);
    this.note.changeFilterLFOSpeed(newProps.filterLFOSpeed);
    this.note.changeFilterLFOWave(newProps.filterLFOWave);
    this.note.changeSubOscVol(newProps.subOscVol);
    this.note.changeAmpLFOAmount(newProps.ampLFOAmount);
    this.note.changeAmpLFOSpeed(newProps.ampLFOSpeed);
    this.note.changeAmpLFOWave(newProps.ampLFOWave);
    this.note.changeHPF(newProps.hpf);
  },

  makeFullNoteName: function () {
    if ([75, 79, 76, 80, 186, 222].includes(this.props.keyCode) ) {
      this.fullNoteName = this.props.noteName + (this.props.currentOctave + 1);
    } else {
      this.fullNoteName = this.props.noteName + this.props.currentOctave;
    }
  },

  render: function () {
    var className = this.props.noteName.length === 1 ? "synth-key" : "synth-key-black";

    if(this.state.pressed){
      className += " pressed";
    }
    return (<div className={className}/>);
  },

  thisKeyPressed: function () {
    var keys = KeyStore.all();
    return keys.indexOf(this.fullNoteName) !== -1;
  },

  makeNewFreq: function () {
    var newFreq;
    if ([75, 79, 76, 80, 186, 222].includes(this.props.keyCode) ) {
      newFreq = MORETONES[this.props.noteName] * Math.pow(2, this.props.currentOctave + 1)
    } else {
      newFreq = MORETONES[this.props.noteName] * Math.pow(2, this.props.currentOctave)
    }

    return newFreq;
  },

  _onChange: function () {
    var pressed = this.thisKeyPressed();

    if (this.note) {

      this.note.stop();
    }
    if (pressed) {
      console.log("PRESSED");
      this.note = new Note(
        this.makeNewFreq(),
        this.props.masterVolume,
        this.props.filterCutoff,
        this.props.Q,
        this.props.filterLFOAmount,
        this.props.filterLFOSpeed,
        this.props.filterLFOWave,
        this.props.ampLFOAmount,
        this.props.ampLFOSpeed,
        this.props.ampLFOWave,
        this.props.hpf
      );
      this.note.start(
        this.props.masterVolume,
        this.props.sawVol,
        this.props.squareVol,
        this.props.triVol,
        this.props.filterLFOAmount,
        this.props.filterLFOSpeed,
        this.props.filterLFOWave,
        this.props.subOscVol,
        this.props.ampLFOAmount,
        this.props.ampLFOSpeed,
        this.props.ampLFOWave,
        this.props.hpf
      );
    } else if (this.note) {
      console.log("stopping");
      this.note.stop();
    }
    this.setState({ pressed: pressed });
  }
});

module.exports = SynthKey;
