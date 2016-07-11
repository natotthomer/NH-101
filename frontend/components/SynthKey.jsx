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
      this.props.keyParams.masterVolume,
      this.props.keyParams.filterCutoff,
      this.props.keyParams.Q,
      this.props.keyParams.filterLFOAmount,
      this.props.keyParams.filterLFOSpeed,
      this.props.keyParams.filterLFOWave,
      this.props.keyParams.ampLFOAmount,
      this.props.keyParams.ampLFOSpeed,
      this.props.keyParams.ampLFOWave,
      this.props.keyParams.hpf
    );
    KeyStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function (newProps) {
    this.note.changeMasterVol(newProps.keyParams.masterVolume);
    this.note.changeFilterFreq(newProps.keyParams.filterCutoff);
    this.note.changeResonance(newProps.keyParams.Q);
    this.note.changeSawVol(newProps.keyParams.sawVol);
    this.note.changeSquareVol(newProps.keyParams.squareVol);
    this.note.changeTriVol(newProps.keyParams.triVol);
    this.note.changeFilterLFOAmount(newProps.keyParams.filterLFOAmount);
    this.note.changeFilterLFOSpeed(newProps.keyParams.filterLFOSpeed);
    this.note.changeFilterLFOWave(newProps.keyParams.filterLFOWave);
    this.note.changeSubOscVol(newProps.keyParams.subOscVol);
    this.note.changeAmpLFOAmount(newProps.keyParams.ampLFOAmount);
    this.note.changeAmpLFOSpeed(newProps.keyParams.ampLFOSpeed);
    this.note.changeAmpLFOWave(newProps.keyParams.ampLFOWave);
    this.note.changeHPF(newProps.keyParams.hpf);
  },

  makeFullNoteName: function () {
    if ([75, 79, 76, 80, 186, 222].includes(this.props.keyCode) ) {
      this.fullNoteName = this.props.noteName + (this.props.keyParams.currentOctave + 1);
    } else {
      this.fullNoteName = this.props.noteName + this.props.keyParams.currentOctave;
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
      newFreq = MORETONES[this.props.noteName] * Math.pow(2, this.props.keyParams.currentOctave + 1)
    } else {
      newFreq = MORETONES[this.props.noteName] * Math.pow(2, this.props.keyParams.currentOctave)
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
        this.props.keyParams.masterVolume,
        this.props.keyParams.filterCutoff,
        this.props.keyParams.Q,
        this.props.keyParams.filterLFOAmount,
        this.props.keyParams.filterLFOSpeed,
        this.props.keyParams.filterLFOWave,
        this.props.keyParams.ampLFOAmount,
        this.props.keyParams.ampLFOSpeed,
        this.props.keyParams.ampLFOWave,
        this.props.keyParams.hpf
      );
      this.note.start(
        this.props.keyParams.masterVolume,
        this.props.keyParams.sawVol,
        this.props.keyParams.squareVol,
        this.props.keyParams.triVol,
        this.props.keyParams.filterLFOAmount,
        this.props.keyParams.filterLFOSpeed,
        this.props.keyParams.filterLFOWave,
        this.props.keyParams.subOscVol,
        this.props.keyParams.ampLFOAmount,
        this.props.keyParams.ampLFOSpeed,
        this.props.keyParams.ampLFOWave,
        this.props.keyParams.hpf
      );
    } else if (this.note) {
      this.note.stop();
    }
    this.setState({ pressed: pressed });
  }
});

module.exports = SynthKey;
