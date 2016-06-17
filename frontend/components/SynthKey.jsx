var React = require('react'),
    KeyStore = require('../stores/key_store'),
    Note = require('../util/note'),
    MORETONES = require('../constants/more_tones');

var SynthKey = React.createClass({
  componentDidMount: function () {
    this.makeFullNoteName();
    KeyStore.addListener(this._onChange);
    this.note = new Note(this.makeNewFreq());
    console.log(this.props.masterVolume);
    this.note.masterVol(0.2);
  },

  makeFullNoteName: function () {
    if ([75, 79, 76, 80, 186, 222].includes(this.props.keyCode) ) {
      this.fullNoteName = this.props.noteName + (this.props.currentOctave + 1);
    } else {
      this.fullNoteName = this.props.noteName + this.props.currentOctave;
    }
  },

  getInitialState: function () {
    return { pressed: this.thisKeyPressed() };
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

    if (pressed) {
      var newNote = new Note(this.makeNewFreq());
      // var newFreq = MORETONES[this.props.noteName] * Math.pow(2, this.props.currentOctave);

      // this.note.freq(newFreq);
      this.note = newNote;
      this.note.start();
    } else {
      this.note.stop();
    }
    this.setState({ pressed: pressed });
  }
});

module.exports = SynthKey;
