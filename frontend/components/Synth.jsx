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

  handleFilterLFOAmountChange: function (e) {
    this.setState({ filterLFOAmount: e.target.value });
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
      triVol: 0.2,
      filterLFOAmount: 0
    };
  },

  render: function () {
    var noteName;
    var vol = this.state.masterVolume;
    var cutoff = this.state.filterCutoff;
    var Q = this.state.Q;
    var sawVol = this.state.sawVol;
    var squareVol = this.state.squareVol;
    var triVol = this.state.triVol;
    var filterLFOAmount = this.state.filterLFOAmount;
    return (
      <div className="main">
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
                  triVol={triVol}
                  filterLFOAmount={filterLFOAmount}/>
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
            </label>
            <label>Filter Cutoff:
              <input
                id='filter-cutoff'
                type="range"
                min="50"
                max="15000"
                step="50"
                defaultValue="2000"
                onChange={this.handleFilterCutoff}/>
            </label>
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
            </label>
            <label>Square Volume:
              <input
                id='square-vol'
                type="range"
                min="0"
                max="1"
                step=".001"
                defaultValue="0.2"
                onChange={this.handleSquareVolChange}/>
            </label>
            <label>Triangle Volume:
              <input
                id='tri-vol'
                type="range"
                min="0"
                max="1"
                step=".001"
                defaultValue="0.2"
                onChange={this.handleTriVolChange}/>
            </label><br/>
            <label>Filter LFO Amount:
              <input
                id='filter-lfo-amount'
                type="range"
                min="0"
                max="1"
                step=".01"
                defaultValue="0"
                onChange={this.handleFilterLFOAmountChange}/>
            </label>
          </div>
        </div>
        <div className="instructions">
          <div className="img-holder">
            <img src="app/assets/images/natkeyboard_text2.png" className="instructions-img"/>
          </div>
        </div>

        <div className="personal-details">
        <span>
          <a href="natotthomer.com">Personal Site</a>
        </span>&nbsp;&nbsp;&nbsp;
          <span>
            <a href="https://github.com/natotthomer">GitHub</a>
          </span>&nbsp;&nbsp;&nbsp;
          <span>
            <a href="https://www.linkedin.com/in/nathanielotthomer">LinkedIn</a>
          </span>&nbsp;&nbsp;&nbsp;
          <span>
            <a href="app/assets/images/NOH_Resume.pdf">Resume</a>
          </span>&nbsp;&nbsp;&nbsp;
          <span>
            <a href="mailto://nathaniel.ott.homer@gmail.com">Email</a>
          </span>
        </div>
      </div>
   );
  },

  _onChange: function () {
    this.setState({notes: KeyStore.all()});
  }
});

module.exports = Synth;
