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
    this.masterVolumeSlider = document.getElementById('master-volume');
    this.masterVolumeSlider.addEventListener('click', this.changeVolume);
  },

  changeOctave: function (e) {
    if (e.key === "z" && this.state.currentOctave !== 0) {
      this.setState({ currentOctave: this.state.currentOctave - 1});
    } else if (e.key === "x" && this.state.currentOctave !== 9){
      this.setState({ currentOctave: this.state.currentOctave + 1});
    }
  },

  handleMasterVolChange: function (e) {
    this.setState({ masterVolume: e.target.value });
  },

  handleFilterCutoff: function (e) {
    this.setState({ filterCutoff: e.target.value });
  },

  handleFilterResonance: function (e) {
    this.setState({ Q: e.target.value})
  },

  handleSawVolChange: function (e) {
    this.setState({ sawVol: e.target.value });
  },

  handleSquareVolChange: function (e) {
    this.setState({ squareVol: e.target.value });
  },

  handleTriVolChange: function (e) {
    this.setState({ triVol: e.target.value });
  },

  getInitialState: function () {
    return {
      notes: KeyStore.all(),
      currentOctave: 4,
      masterVolume: 0.2,
      filterCutoff: 2000,
      Q: 0,
      sawVol: 0.2,
      squareVol: 0.2,
      triVol: 0.2
    };
  },

  render: function () {
    console.log(KeyStore.all());
    var noteName;
    var vol = this.state.masterVolume;
    var cutoff = this.state.filterCutoff;
    var Q = this.state.Q;
    var sawVol = this.state.sawVol;
    var squareVol = this.state.squareVol;
    var triVol = this.state.triVol;
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
                filterCutoff={cutoff}
                Q={Q}
                sawVol={sawVol}
                squareVol={squareVol}
                triVol={triVol}/>
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
              step="0.01"
              defaultValue="0.2"
              onChange={this.handleMasterVolChange}/>
          </label><br/>
          <label>Filter Cutoff:
            <input
              id='filter-cutoff'
              type="range"
              min="0"
              max="15000"
              step="250"
              defaultValue="2000"
              onChange={this.handleFilterCutoff}/>
          </label><br/>
          <label>Filter Resonance:
            <input
              id='filter-resonance'
              type="range"
              min="0.1"
              max="40"
              step=".1"
              defaultValue="0"
              onChange={this.handleFilterResonance}/>
          </label><br/>
          <label>Saw Volume:
            <input
              id='saw-vol'
              type="range"
              min="0"
              max="1"
              step=".001"
              defaultValue="0.2"
              onChange={this.handleSawVolChange}/>
          </label><br/>
          <label>Square Volume:
            <input
              id='square-vol'
              type="range"
              min="0"
              max="1"
              step=".001"
              defaultValue="0.2"
              onChange={this.handleSquareVolChange}/>
          </label><br/>
          <label>Triangle Volume:
            <input
              id='tri-vol'
              type="range"
              min="0"
              max="1"
              step=".001"
              defaultValue="0.2"
              onChange={this.handleTriVolChange}/>
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
