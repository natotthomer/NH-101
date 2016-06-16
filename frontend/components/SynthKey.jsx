var React = require('react'),
    KeyStore = require('../stores/key_store'),
    Note = require('../util/note'),
    TONES = require('../constants/tones');

var SynthKey = React.createClass({
  componentDidMount: function () {
    this.note = new Note(TONES[this.props.noteName]);
    KeyStore.addListener(this._onChange);
  },

  getInitialState: function () {
    return { pressed: this.thisKeyPressed() };
  },

  render: function () {
    var className = this.props.noteName.length === 2 ? "synth-key" : "synth-key-black";

    if(this.state.pressed){
      className += " pressed";
    }
    return <div className={className}/>;
  },

  thisKeyPressed: function () {
    var keys = KeyStore.all();
    return keys.indexOf(this.props.noteName) !== -1;
  },

  _onChange: function () {
    var pressed = this.thisKeyPressed();
    if (pressed) {
      this.note.start();
    } else {
      this.note.stop();
    }
    this.setState({ pressed: pressed });
  }
});

module.exports = SynthKey;
