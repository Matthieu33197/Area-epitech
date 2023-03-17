const argHandler = require('../../tools/argHandler');

const waifuExpectedInput = new Map();

waifuExpectedInput.set("[Waifu] getRandomWaifu", function(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);
    return true;
});

module.exports.waifuExpectedInput = waifuExpectedInput;