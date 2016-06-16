var $ = require('jquery'),
    KeyActions = require('./../actions/key_actions'),
    TONES = require("../constants/tones"),
    KeyMapping = require('../constants/key_mapping'),
    RevKeyMapping = require('../constants/rev_key_mapping');

$(function () {
  var NOTE_MAP = {}, tones = Object.keys(TONES);

  var _heldKeys = [];

  $(document).on('keydown', function (e) {
    var code = e.keyCode,
        valid = KeyMapping.hasOwnProperty(code) !== -1;
    if (_heldKeys.indexOf(code) === -1 && valid) {
      _heldKeys.push(code);
      KeyActions.keyPressed(KeyMapping[code]);
    }
  });

  $(document).on('keyup', function (e) {
    var code = e.keyCode,
        idx = _heldKeys.indexOf(code);
    if (idx !== -1) {
      _heldKeys.splice(idx, 1);
      KeyActions.keyReleased(KeyMapping[code]);
    }
  });
});
