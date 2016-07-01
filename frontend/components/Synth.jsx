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

  handleFilterLFOSpeedChange: function (e) {
    this.setState({ filterLFOSpeed: e.target.value });
  },

  handleFilterLFOWaveChange: function (e) {
    this.setState({ filterLFOWave: e.target.value });
  },

  handleAmpLFOAmountChange: function (e) {
    this.setState({ ampLFOAmount: e.target.value });
  },

  handleAmpLFOSpeedChange: function (e) {
    this.setState({ ampLFOSpeed: e.target.value });
  },

  handleAmpLFOWaveChange: function (e) {
    this.setState({ ampLFOWave: e.target.value });
  },

  handleSubOscVolChange: function (e) {
    this.setState({ subOscVol: e.target.value });
  },

  handleHPFChange: function (e) {
    this.setState({ hpf: e.target.value });
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
      filterLFOAmount: 0,
      filterLFOSpeed: 1,
      filterLFOWave: 0,
      subOscVol: 0,
      ampLFOAmount: 0,
      ampLFOSpeed: 1,
      ampLFOWave: 0,
      hpf: 200
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
    var filterLFOSpeed = this.state.filterLFOSpeed;
    var filterLFOWave = this.state.filterLFOWave;
    var subOscVol = this.state.subOscVol;
    var ampLFOAmount = this.state.ampLFOAmount;
    var ampLFOSpeed = this.state.ampLFOSpeed;
    var ampLFOWave = this.state.ampLFOWave;
    var hpf = this.state.hpf;
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
                  filterLFOAmount={filterLFOAmount}
                  filterLFOSpeed={filterLFOSpeed}
                  filterLFOWave={filterLFOWave}
                  subOscVol={subOscVol}
                  ampLFOAmount={ampLFOAmount}
                  ampLFOSpeed={ampLFOSpeed}
                  ampLFOWave={ampLFOWave}
                  hpf={hpf}/>
              );
            }.bind(this))
          }
          </div><br/>
          <div className="sliders">
            <div className="clearfix slider-group">
              <div className="slider-first-group">
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label">
                      Vol:<br/>
                    </p>
                    <input
                      id='master-volume'
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      defaultValue="0.2"
                      onChange={this.handleMasterVolChange}
                      className="param-slider"/>
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label">
                      Cutoff:<br/>
                    </p>
                    <input
                      id='filter-cutoff'
                      type="range"
                      min="50"
                      max="15000"
                      step="50"
                      defaultValue="2000"
                      onChange={this.handleFilterCutoff}
                      className="param-slider"/>
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label">
                      Res:<br/>
                    </p>
                    <input
                      id='filter-resonance'
                      type="range"
                      min="0.1"
                      max="40"
                      step=".1"
                      defaultValue="0"
                      onChange={this.handleFilterResonance}
                      className="param-slider"/>
                  </div>
                </div>

                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label">
                      Saw:<br/>
                    </p>
                    <input
                      id='saw-vol'
                      type="range"
                      min="0"
                      max="1"
                      step=".001"
                      defaultValue="0.2"
                      onChange={this.handleSawVolChange}
                      className="param-slider"/>
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label">
                      Square:<br/>
                    </p>
                    <input
                      id='square-vol'
                      type="range"
                      min="0"
                      max="1"
                      step=".001"
                      defaultValue="0.2"
                      onChange={this.handleSquareVolChange}
                      className="param-slider"/>
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label">
                      Tri:<br/>
                    </p>
                    <input
                      id='tri-vol'
                      type="range"
                      min="0"
                      max="1"
                      step=".001"
                      defaultValue="0.2"
                      onChange={this.handleTriVolChange}
                      className="param-slider"/>
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label">
                      Sub:<br/>
                    </p>
                    <input
                      id='sub-osc-vol'
                      type="range"
                      min="0"
                      max="0.8"
                      step="0.001"
                      defaultValue="0"
                      onChange={this.handleSubOscVolChange}
                      className="param-slider"/>
                  </div>
                </div>
              </div>
            </div><br/>
            <div className="slider-group clearfix">
              <div className="slider-second-group">
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label">
                      LFO 1 Int:<br/>
                    </p>
                    <input
                      id='filter-lfo-amount'
                      type="range"
                      min="0"
                      max="5000"
                      step=".01"
                      defaultValue="0"
                      onChange={this.handleFilterLFOAmountChange}
                      className="param-slider"/>
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label">
                      LFO 1 Rate:<br/>
                    </p>
                    <input
                      id='filter-lfo-speed'
                      type="range"
                      min="0.1"
                      max="50"
                      step="0.1"
                      defaultValue="0"
                      onChange={this.handleFilterLFOSpeedChange}
                      className="param-slider"/>
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label">
                      LFO 1 Wave:<br/>
                    </p>
                    <input
                      id='filter-lfo-wave'
                      type="range"
                      min="0"
                      max="3"
                      step="1"
                      defaultValue="0"
                      onChange={this.handleFilterLFOWaveChange}
                      className="param-slider"/>
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label">
                      LFO 2 Int:<br/>
                    </p>
                    <input
                      id='amp-lfo-amount'
                      type="range"
                      min="0"
                      max="2"
                      step=".01"
                      defaultValue="0"
                      onChange={this.handleAmpLFOAmountChange}
                      className="param-slider"/>
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label">
                      LFO 2 Rate:<br/>
                    </p>
                    <input
                      id='amp-lfo-speed'
                      type="range"
                      min="0.1"
                      max="25"
                      step="0.1"
                      defaultValue="0"
                      onChange={this.handleAmpLFOSpeedChange}
                      className="param-slider"/>
                    </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label">
                      LFO 2 Wave:<br/>
                    </p>
                    <input
                      id='amp-lfo-wave'
                      type="range"
                      min="0"
                      max="3"
                      step="1"
                      defaultValue="0"
                      onChange={this.handleAmpLFOWaveChange}
                      className="param-slider"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="instructions">
          <div className="img-holder">
            <img src="app/assets/images/natkeyboard_text2.png" className="instructions-img"/>
          </div>
        </div>

        <div className="personal-details">
          <span className="personal-detail">
            <a href="http://www.natotthomer.com">Personal Site</a>
          </span>&nbsp;&nbsp;&nbsp;
          <span className="personal-detail">
            <a href="https://github.com/natotthomer">GitHub</a>
          </span>&nbsp;&nbsp;&nbsp;
          <span className="personal-detail">
            <a href="https://www.linkedin.com/in/nathanielotthomer">LinkedIn</a>
          </span>&nbsp;&nbsp;&nbsp;
          <span className="personal-detail">
            <a href="app/assets/images/NOHresume62016.pdf">Resume</a>
          </span>&nbsp;&nbsp;&nbsp;
          <span className="personal-detail">
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

// <div className="slider-container">
//   <p className="slider-label">
//     HPF:<br/>
//   </p>
//   <input
//     id='hpf'
//     type="range"
//     min="200"
//     max="20000"
//     step="1"
//     defaultValue="200"
//     onChange={this.handleHPFChange}
//     className="param-slider"/>
// </div>

module.exports = Synth;
