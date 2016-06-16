var React = require('react'),
    SynthKey = require('./SynthKey'),
    TONES = require("../constants/tones"),
    KeyStore = require('../stores/key_store'),
    FullKeyMapping = require('../constants/full_key_mapping'),
    KeyCodes = require('../constants/key_codes');

var Synth = React.createClass({
  componentDidMount: function () {
    KeyStore.addListener(this._onChange);
    document.addEventListener("keypress", this.changeOctave)
    this.currentOctave = 4;
  },

  changeOctave: function (e) {
    console.log(e.key);
    if (e.key === "z") {
      this.setState({ currentOctave: this.state.currentOctave - 1});
    } else if (e.key === "x"){
      this.setState({ currentOctave: this.state.currentOctave + 1});
    }
    console.log(this.state.currentOctave);
  },

  getInitialState: function () {
    return { notes: KeyStore.all(), currentOctave: 4 };
  },

  render: function () {
    var noteName;
    return (
      <div className="keys group">
      {
        KeyCodes.map(function (keyCode, index) {
          noteName = FullKeyMapping[keyCode][this.state.currentOctave];
          console.log(this.state.currentOctave);
          return (<SynthKey noteName={noteName} key={index} currentOctave={this.state.currentOctave}/>);
        }.bind(this))
      }
      </div>
   );
  },

  playNote: function (noteName) {
    
  },

  _onChange: function () {
    this.setState({notes: KeyStore.all()});
  }
});

module.exports = Synth;
