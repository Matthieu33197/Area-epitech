const argHandler = require('../../tools/argHandler');

const poemExpectedInput = new Map();

poemExpectedInput.set("[Poemist] getRandomPoem", function(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);
    return true;
});

module.exports.poemExpectedInput = poemExpectedInput;