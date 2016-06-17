var $ = require('jquery'),
    KeyActions = require('./../actions/key_actions'),
    TONES = require("../constants/tones"),
    KeyMapping = require('../constants/key_mapping'),
    RevKeyMapping = require('../constants/rev_key_mapping'),
    KeyStore = require('../stores/key_store');

$(function () {


  $(document).on('keydown', function (e) {
    var code = e.keyCode;

    if (!KeyStore.has(KeyMapping[code])) {
      KeyActions.keyPressed(KeyMapping[code]);
    }
  });

  $(document).on('keyup', function (e) {
    var code = e.keyCode,
        has = KeyStore.has(KeyMapping[code]);
    if (has !== -1) {
      KeyActions.keyReleased(KeyMapping[code]);
    }
  });
});
