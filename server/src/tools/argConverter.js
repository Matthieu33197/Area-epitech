
// from front to end.
function convertJsonToArray(args) {
    var arr = []

    for (const data in args) {
        arr.push({[data]: args[data]});
    }
    return arr;
}

// from end to front.
function convertArrayToJson(args) {
    var js = {}

    for (const json in args) {
        for (const arg in args[json]) {
            js[arg] = args[json][arg];
        }
    }
    return js;
}

// from db to end.
function convertDbToArray(args) {
    let i = 1;
    let key = null;
    var arr = []

    for (const json in args) {
        for (const arg in args[json]) {
            if (i % 2 != 0) {
                key = args[json][arg];
            }
            else if (i % 2 == 0) {
                arr.push({[key]: args[json][arg]});
            }
            i += 1;
        }
    }
    return arr;
}

function convertInt(x, base) {
    const parsed = parseInt(x, base);

    if (isNaN(parsed)) {
        return null;
    }
    return parsed;
};

function convertToDecNumber(arg) {
    var tmpArg = arg;

    if (typeof(tmpArg) !== 'number') {
        const newTmpArg = convertInt(tmpArg, 10);
        tmpArg = (newTmpArg != null) ? newTmpArg : 0;
        // console.log("convertToNumber = " + tmpArg);
    }
    return tmpArg;
}

function convertStrToBool(str) {
    if (typeof(str) === 'boolean')
        return str;
    else
        return (str === 'true');
}

module.exports.convertJsonToArray = convertJsonToArray;
module.exports.convertArrayToJson = convertArrayToJson;
module.exports.convertDbToArray = convertDbToArray;
module.exports.convertInt = convertInt;
module.exports.convertToDecNumber = convertToDecNumber;
module.exports.convertStrToBool = convertStrToBool;