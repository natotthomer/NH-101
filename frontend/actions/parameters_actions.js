var AppDispatcher = require("../dispatcher/dispatcher"),
	ParametersConstants = require("../constants/parameters_constants");

var ParametersActions = {
  slide: function(parameter) {
  	AppDispatcher.dispatch({
  		actionType: ParametersConstants.SLIDE,
  		parameter: parameter
  	});
  }
};

module.exports = ParametersActions;