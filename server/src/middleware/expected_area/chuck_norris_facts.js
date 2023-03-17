const argHandler = require('../../tools/argHandler');

const chuck_norrisExpectedInput = new Map();

chuck_norrisExpectedInput.set("[Chuck_Norris] getRandomChuckNorrisFacts", function(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);
    return true;
});

module.exports.chuck_norrisExpectedInput = chuck_norrisExpectedInput;