const argHandler = require('../../tools/argHandler');

const redditExpectedInput = new Map();

redditExpectedInput.set("[Reddit] newPrivateMessage", function(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);
    argHandler.addArg(actionArgs, "userToken", userToken);
    argHandler.addArg(actionArgs, "lastMessage", userToken);
    return true;
});

module.exports.redditExpectedInput = redditExpectedInput;