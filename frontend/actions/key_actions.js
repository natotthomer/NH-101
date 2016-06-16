var AppDispatcher = require("../dispatcher/dispatcher"),
    SynthConstants = require("../constants/synth_constants");

var KeyActions = {
  groupUpdate: function (notes) {
    AppDispatcher.dispatch({
      actionType: SynthConstants.GROUP_UPDATE,
      notes: notes
    });
  },

  keyPressed: function (noteName) {
    AppDispatcher.dispatch({
      actionType: SynthConstants.KEY_DOWN,
      note: noteName
    });
  },

  keyReleased: function (noteName) {
    AppDispatcher.dispatch({
      actionType: SynthConstants.KEY_UP,
      note: noteName
    });
  }
};

module.exports = KeyActions;
