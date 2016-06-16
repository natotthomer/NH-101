var React = require('react');
var ReactDOM = require('react-dom');
var Synth = require('./components/Synth');
var $ = require('jquery');
KeyListener = require('./util/key_listener');

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Synth/>, document.getElementById('root'));
});
