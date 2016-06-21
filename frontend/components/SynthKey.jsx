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
    this.note = new Note(this.makeNewFreq(), this.props.masterVolume, 2000);
    KeyStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function (newProps) {
    var newVol = newProps.masterVolume;
    var newCutoff = newProps.filterCutoff;
    this.note.changeMasterVol(newVol);
    this.note.changeFilterFreq(newCutoff);
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
      console.log("PRESSED")
      this.note = new Note(this.makeNewFreq(),
        this.props.masterVolume,
        this.props.filterCutoff,
        this.props.Q
      );
      this.note.start(this.props.masterVolume);
    } else if (this.note) {
      console.log("stopping");
      this.note.stop();

    }
    this.setState({ pressed: pressed });
  }
});

module.exports = SynthKey;
