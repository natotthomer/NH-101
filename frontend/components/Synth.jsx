var React = require('react'),
    SynthKey = require('./SynthKey'),
    KeyStore = require('../stores/key_store'),
    FullKeyMapping = require('../constants/full_key_mapping'),
    KeyCodes = require('../constants/key_codes');

var Synth = React.createClass({
  componentDidMount: function () {
    KeyStore.addListener(this._onChange);
    document.addEventListener("keypress", this.changeOctave);
    this.currentOctave = 4;
    this.startingVolume = 0.2;
    this.startingCutoff = 2000;
    this.masterVolumeSlider = document.getElementById('master-volume');
    this.masterVolumeSlider.addEventListener('click', this.changeVolume);
  },

  changeOctave: function (e) {
    if (e.key === "z" && this.state.currentOctave !== 0) {
      this.setState({ currentOctave: this.state.currentOctave - 1});
    } else if (e.key === "x" && this.state.currentOctave !== 7){
      this.setState({ currentOctave: this.state.currentOctave + 1});
    }
  },

  handleMasterVolChange: function (e) {
    this.setState({ masterVolume: e.target.value });
  },

  handleFilterCutoff: function (e) {
    this.setState({ filterCutoff: e.target.value });
  },

  getInitialState: function () {
    return {
      notes: KeyStore.all(),
      currentOctave: 4,
      masterVolume: 0.2,
      filterCutoff: 2000
    };
  },

  render: function () {
    console.log(KeyStore.all());
    var noteName;
    var vol = this.state.masterVolume;
    var cutoff = this.state.filterCutoff;
    return (
      <div className="synth">
        <div className="keys group">
        {
          KeyCodes.map(function (keyCode, index) {
            noteName = FullKeyMapping[keyCode][this.state.currentOctave].slice(0, -1);
            return (
              <SynthKey
                noteName={noteName}
                key={index}
                keyCode={keyCode}
                currentOctave={this.state.currentOctave}
                masterVolume={vol}
                filterCutoff={cutoff}/>
            );
          }.bind(this))
        }
        </div><br/>
        <div className="sliders">
          <label>Master Volume:
            <input
              id='master-volume'
              type="range"
              min="0"
              max="1"
              step="0.05"
              defaultValue={this.startingVolume}
              onChange={this.handleMasterVolChange}/>
          </label><br/>
          <label>Filter Cutoff:
            <input
              id='filter-cutoff'
              type="range"
              min="0"
              max="15000"
              step="250"
              defaultValue={this.startingCutoff}
              onChange={this.handleFilterCutoff}/>
          </label>
        </div>
      </div>
   );
  },

  _onChange: function () {
    console.log(this.masterVolumeSlider.value);
    this.setState({notes: KeyStore.all(), masterVolume: this.masterVolumeSlider.value});
  }
});

module.exports = Synth;
