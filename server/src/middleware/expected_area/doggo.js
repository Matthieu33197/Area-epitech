const argHandler = require('../../tools/argHandler');

const doggoExpectedInput = new Map();

doggoExpectedInput.set("[Doggo] getRandomDog", function(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);
    return true;
});

module.exports.doggoExpectedInput = doggoExpectedInput;