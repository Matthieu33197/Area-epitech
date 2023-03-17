const argHandler = require('../../tools/argHandler');

const covidExpectedInput = new Map();

function checkGetOverX(userToken, actionArgs)
{
    argHandler.initializeArg(actionArgs);
    argHandler.addArg(actionArgs, "updated", 0);

    if (argHandler.getArg(actionArgs, "country") == null || argHandler.getArg(actionArgs, "threshold") == null)
        return false;

    if (+argHandler.getArg(actionArgs, "threshold") != NaN)
        argHandler.changeArg(actionArgs, "threshold", +argHandler.getArg(actionArgs, "threshold"))
    else
        return false;

    if (!Number.isInteger(argHandler.getArg(actionArgs, "threshold")))
        return false;
    return true;
}

covidExpectedInput.set("[Covid] getUpdatedInfo", function(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);
    argHandler.addArg(actionArgs, "updated", 0);
    if (argHandler.getArg(actionArgs, "country") == null)
        return false;
    return true;
});

covidExpectedInput.set("[Covid] getOverXActive", checkGetOverX);

covidExpectedInput.set("[Covid] getOverXCritical", checkGetOverX);

module.exports.covidExpectedInput = covidExpectedInput;