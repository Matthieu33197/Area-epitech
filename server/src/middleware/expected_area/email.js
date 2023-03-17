const argHandler = require('../../tools/argHandler');

const emailExpectedInput = new Map();

emailExpectedInput.set("[Email] sendEmail", function(userToken, reactionArgs) {
    argHandler.initializeArg(reactionArgs);
    if (argHandler.getArg(reactionArgs, "recvEmail") == null)
        return false;
    argHandler.addArg(reactionArgs, "text", "");
    return true;
});

module.exports.emailExpectedInput = emailExpectedInput;