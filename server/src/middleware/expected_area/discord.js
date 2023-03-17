const argHandler = require('../../tools/argHandler');

const discordExpectedInput = new Map();

discordExpectedInput.set("[Discord] sendServerMessages", function(userToken, reactionArgs) {
    if (argHandler.getArg(reactionArgs, "serverID") == null) { // put the mandatory args in a list to compare them all.
        return false;
    }
    argHandler.initializeArg(reactionArgs);
    if (Number.isInteger(argHandler.getArg(reactionArgs, "serverID"))) {
        return false;
    }
    argHandler.addArg(reactionArgs, "text", "");
    return true;
});

discordExpectedInput.set("[Discord] sendPrivateMessages", function(userToken, reactionArgs) {
    if (argHandler.getArg(reactionArgs, "userID") == null) { // put the mandatory args in a list to compare them all.
        return false;
    }
    argHandler.initializeArg(reactionArgs);
    if (Number.isInteger(argHandler.getArg(reactionArgs, "userID"))) {
        return false;
    }
    argHandler.addArg(reactionArgs, "text", "");
    return true;
});

module.exports.discordExpectedInput = discordExpectedInput;