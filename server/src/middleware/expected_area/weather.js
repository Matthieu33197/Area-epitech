const argHandler = require('../../tools/argHandler');
const weatherExpectedInput = new Map();

function temperature(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);

    if (argHandler.getArg(actionArgs, "city") == null || argHandler.getArg(actionArgs, "temperature") == null)
        return false;

    if (+argHandler.getArg(actionArgs, "temperature") != NaN)
        argHandler.changeArg(actionArgs, "temperature", +argHandler.getArg(actionArgs, "temperature"))
    else
        return false;

    if (!Number.isInteger(argHandler.getArg(actionArgs, "temperature")))
        return false;

    return true;
}

function humidity(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);

    if (argHandler.getArg(actionArgs, "city") == null || argHandler.getArg(actionArgs, "humidity") == null)
        return false;

    if (+argHandler.getArg(actionArgs, "humidity") != NaN)
        argHandler.changeArg(actionArgs, "humidity", +argHandler.getArg(actionArgs, "humidity"))
    else
        return false;

    if (!Number.isInteger(argHandler.getArg(actionArgs, "humidity")))
        return false;

    return true;
}

function visibility(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);

    if (argHandler.getArg(actionArgs, "city") == null || argHandler.getArg(actionArgs, "visibility") == null)
        return false;

    if (+argHandler.getArg(actionArgs, "visibility") != NaN)
        argHandler.changeArg(actionArgs, "visibility", +argHandler.getArg(actionArgs, "visibility"))
    else
        return false;

    if (!Number.isInteger(argHandler.getArg(actionArgs, "visibility")))
        return false;

    return true;
}

function windSpeed(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);

    if (argHandler.getArg(actionArgs, "city") == null || argHandler.getArg(actionArgs, "windSpeed") == null)
        return false;

    if (+argHandler.getArg(actionArgs, "windSpeed") != NaN)
        argHandler.changeArg(actionArgs, "windSpeed", +argHandler.getArg(actionArgs, "windSpeed"))
    else
        return false;

    if (!Number.isInteger(argHandler.getArg(actionArgs, "windSpeed")))
        return false;

    return true;
}

weatherExpectedInput.set("[Weather] overXTemperature", temperature);

weatherExpectedInput.set("[Weather] belowXTemperature", temperature);

weatherExpectedInput.set("[Weather] overXHumidity", humidity);

weatherExpectedInput.set("[Weather] belowXHumidity", humidity);

weatherExpectedInput.set("[Weather] overXVisibility", visibility);

weatherExpectedInput.set("[Weather] belowXVisibility", visibility);

weatherExpectedInput.set("[Weather] overXWindSpeed", windSpeed);

weatherExpectedInput.set("[Weather] belowXWindSpeed", windSpeed);

module.exports.weatherExpectedInput = weatherExpectedInput;