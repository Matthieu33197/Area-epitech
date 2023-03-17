const argHandler = require('../../tools/argHandler');

const newsExpectedInput = new Map();

newsExpectedInput.set("[News] getNewsByCountry", function(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);
    argHandler.addArg(actionArgs, "lastTitle", "");
    if (argHandler.getArg(actionArgs, "country") == null)
        return false;
    const possibleCountry = ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"];
    if (!possibleCountry.includes(argHandler.getArg(actionArgs, "country")))
        return false;
    return true;
});

newsExpectedInput.set("[News] getNewsByCategory", function(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);
    argHandler.addArg(actionArgs, "lastTitle", "");
    if (argHandler.getArg(actionArgs, "category") == null)
        return false;
    const possibleCountry = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
    if (!possibleCountry.includes(argHandler.getArg(actionArgs, "category")))
        return false;
    return true;
});

module.exports.newsExpectedInput = newsExpectedInput;