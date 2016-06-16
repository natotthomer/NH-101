var _keys = [],
    Store = require ("flux/utils").Store,
    SynthConstants = require("../constants/synth_constants"),
    AppDispatcher = require('../dispatcher/dispatcher'),
    KeyStore = new Store(AppDispatcher);

KeyStore.all = function () {
  return _keys.slice(0);
};

KeyStore.__onDispatch = function (payload) {

  switch(payload.actionType) {
  case SynthConstants.KEY_DOWN:
    KeyStore._addKey(payload.note);
    break;
  case SynthConstants.KEY_UP:
    KeyStore._removeKey(payload.note);
    break;
  case SynthConstants.GROUP_UPDATE:
    KeyStore._groupUpdate(payload.notes);
    break;
  }
};

KeyStore._addKey = function (key) {
  var idx = _keys.indexOf(key);
  if (idx == -1) {
    _keys.push(key);
    this.__emitChange();
  }
};

KeyStore._groupUpdate = function (keys) {
  _keys = keys.slice();
  this.__emitChange();
};

KeyStore._removeKey = function (key) {
  var idx = _keys.indexOf(key);
  if (idx != -1) {
    _keys.splice(idx, 1);
    this.__emitChange();
  }
};

module.exports = KeyStore;
