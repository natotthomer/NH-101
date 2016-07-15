var React = require('react'),
    SynthKey = require('./SynthKey'),
    KeyStore = require('../stores/key_store'),
    FullKeyMapping = require('../constants/full_key_mapping'),
    KeyCodes = require('../constants/key_codes');

var Synth = React.createClass({
  componentDidMount: function () {
    // KeyStore.addListener(this._onChange);
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

  buildSlider: function(onChangeFunction, min, max, step, defaultValue, tooltip) {
    return (
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        onChange={onChangeFunction}
        className="param-slider"
        />
    );
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
    return (
      <div className="main">
        <div className="synth">
          <div className="keys group">
          {
            KeyCodes.map(function (keyCode, index) {
              noteName = FullKeyMapping[keyCode][this.state.currentOctave].slice(0, -1);
              return (
                <SynthKey keyParams={this.state} noteName={noteName} key={index} keyCode={keyCode} />
              );
            }.bind(this))
          }
          </div><br/>
          <div className="sliders">
            <div className="clearfix slider-group">
              <div className="slider-first-group">
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label" title="Adjusts the total volume">
                      Volume<br/>
                    </p>
                    <div className="slider-sub-sub-container">
                      {
                        this.buildSlider(this.handleMasterVolChange, 0, 1, 0.01, 0.2)
                      }
                    </div>
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label" title="Adjusts the brightness">
                      Cutoff<br/>
                    </p>
                    {
                      this.buildSlider(this.handleFilterCutoff, 50, 15000, 50, 2000)
                    }
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label" title="Increases the emphasis of the cutoff">
                      Res<br/>
                    </p>
                    {
                      this.buildSlider(this.handleFilterResonance, 0.1, 40, 0.1, 0)
                    }
                  </div>
                </div>

                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label" title="Volume for sawtooth wave oscillator">
                      Saw<br/>
                    </p>
                    {
                      this.buildSlider(this.handleSawVolChange, 0, 1, 0.01, 0.2)
                    }
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label" title="Volume for square wave oscillator">
                      Square<br/>
                    </p>
                    {
                      this.buildSlider(this.handleSquareVolChange, 0, 1, 0.01, 0.2)
                    }
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label" title="Volume for triangle wave oscillator">
                      Triangle<br/>
                    </p>
                    {
                      this.buildSlider(this.handleTriVolChange, 0, 1, 0.01, 0.2)
                    }
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label"  title="Volume for sub oscillator (one octave below)">
                      Sub<br/>Osc<br/>
                    </p>
                    {
                      this.buildSlider(this.handleSubOscVolChange, 0, 0.8, 0.01, 0)
                    }
                  </div>
                </div>
              </div>
            </div><br/>
            <div className="slider-group clearfix">
              <div className="slider-second-group">
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label" title="Adjusts intensity for cyclical modulation of cutoff">
                      LFO 1<br/>Int<br/>
                    </p>
                    {
                      this.buildSlider(this.handleFilterLFOAmountChange, 0, 5000, 0.01, 0)
                    }
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label" title="Adjusts rate of cyclical modulation of cutoff">
                      LFO 1<br/>Rate<br/>
                    </p>
                    {
                      this.buildSlider(this.handleFilterLFOSpeedChange, 0.1, 50, 0.1, 0)
                    }
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label" title="Adjusts wave type of cyclical modulation of cutoff">
                      LFO 1<br/>Wave<br/>
                    </p>
                    {
                      this.buildSlider(this.handleFilterLFOWaveChange, 0, 3, 1, 0)
                    }
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label" title="Adjusts intensity of cyclical modulation of master volume">
                      LFO 2<br/>Int<br/>
                    </p>
                    {
                      this.buildSlider(this.handleAmpLFOAmountChange, 0, 2, 0.01, 0)
                    }
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label" title="Adjusts rate of cyclical modulation of master volume">
                      LFO 2<br/>Rate  <br/>
                    </p>
                    {
                      this.buildSlider(this.handleAmpLFOSpeedChange, 0.1, 25, 0.1, 0.1)
                    }
                  </div>
                </div>
                <div className="slider-container">
                  <div className="slider-sub-container clearfix">
                    <p className="slider-label" title="Adjusts wave type of cyclical modulation of master volume">
                      LFO 2<br/>Wave<br/>
                    </p>
                    {
                      this.buildSlider(this.handleAmpLFOWaveChange, 0, 3, 1, 0)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="instructions">
          <div className="instructions-title">
            Instructions:
          </div>
          <div className="instructions-text">
            Hover over slider labels for details! Play the highlighted keys to make sounds!<br/>
          </div>
          <div className="img-holder">
            <img src="app/assets/images/natkeyboard_text2.png" className="instructions-img"/>
          </div>
        </div><br/><br/>

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
            <a href="http://www.natotthomer.com/NOHresume.pdf">Resume</a>
          </span>&nbsp;&nbsp;&nbsp;
          <span className="personal-detail">
            <a href="mailto://nathaniel.ott.homer@gmail.com">Email</a>
          </span>
        </div>
      </div>
   );
  },

  // _onChange: function () {
  //   this.setState({notes: KeyStore.all()});
  // }
});

module.exports = Synth;
