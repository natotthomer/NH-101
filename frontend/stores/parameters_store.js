var _parameters = [],
    Store = require('flux/utils').Store,
    ParametersConstants = require('../constants/parameters_constants'),
    AppDispatcher = require('../dispatcher/dispatcher'),
    ParametersStore = new Store(AppDispatcher);

ParametersStore.all = function () {
  return _parameters.slice(0);
};

ParametersStore._addParameter = function (payload) {}