function initializeArg(argList)
{
    if (argList[0] == undefined)
        argList.push({});
}

function addArg(argList, newDataName, newData)
{
    argList.push({});
    argList[argList.length - 1][newDataName] = newData;
}

function getArg(argList, search)
{
    for (const args in argList) {
        // console.log(argList[args]);
        for (const arg in argList[args]) {
            if (arg == search)
                return argList[args][arg];
        }
    }
    return null;
}

function changeArg(argList, search, newData, db) // db: {jobToken: jobToken, updater: (updateActionArg/updateReactionArg)}
{
    let isSuccess = true;
    let isGood = false;

    for (const args in argList) {
        // console.log(argList[args]);
        for (const arg in argList[args]) {
            if (arg == search) {
                argList[args][arg] = newData;
                isGood = true;
            }
        }
    }
    if (db) {
        console.log("changeArg update db for: " + db.jobToken);
        db.updater(db.jobToken, search, newData)
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then(() => {
            return (isGood && isSuccess) ? true : null;
        });
    }
    else {
        return (isGood && isSuccess) ? true : null;
    }
}

function upsertArg(argList, dataName, newData, db)
{
    if (changeArg(argList, dataName, newData, db) == null) {
        addArg(argList, dataName, newData)
    }
}

function removeSpecialArgs(argList)
{
    for (let i = 0; i < argList.length; i++) {
        if (argList[i].key == "updated" || argList[i].key == "live" || argList[i].key == "done" || argList[i].key == "lastVideoID" ||
            argList[i].key == "s_views" || argList[i].key == "s_likes" || argList[i].key == "text" || argList[i].key == "userToken" ||
            argList[i].key == "jobToken") {
                argList.splice(i, 1);
                i = 0;
            }
    }
    return null;
}

module.exports.initializeArg = initializeArg;
module.exports.addArg = addArg;
module.exports.getArg = getArg;
module.exports.changeArg = changeArg;
module.exports.upsertArg = upsertArg;
module.exports.removeSpecialArgs = removeSpecialArgs;