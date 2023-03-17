const argHandler = require('../../tools/argHandler');

const catExpectedInput = new Map();

catExpectedInput.set("[Cat] getRandomCat", function(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);
    return true;
});

module.exports.catExpectedInput = catExpectedInput;