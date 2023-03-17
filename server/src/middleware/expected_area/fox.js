const argHandler = require('../../tools/argHandler');

const foxExpectedInput = new Map();

foxExpectedInput.set("[Fox] getRandomFox", function(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);
    return true;
});

module.exports.foxExpectedInput = foxExpectedInput;