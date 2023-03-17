const argHandler = require('../../tools/argHandler');

const shiba_inuExpectedInput = new Map();

shiba_inuExpectedInput.set("[Shiba_Inu] getRandomShibaInu", function(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);
    return true;
});

module.exports.shiba_inuExpectedInput = shiba_inuExpectedInput;