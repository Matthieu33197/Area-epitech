const argHandler = require('../../tools/argHandler');

const nasaExpectedInput = new Map();

nasaExpectedInput.set("[NASA] getAPOD", function(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);
    return true;
});

module.exports.nasaExpectedInput = nasaExpectedInput;