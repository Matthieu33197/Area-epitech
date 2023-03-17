const argHandler = require('../../tools/argHandler');

const twitchExpectedInput = new Map();

twitchExpectedInput.set("[Twitch] getStream", function(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);
    argHandler.addArg(actionArgs, "live", false);
    if (argHandler.getArg(actionArgs, "channelName") == null)
        return false;
    return true;
});

twitchExpectedInput.set("[Twitch] overXViewer", function(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);
    argHandler.addArg(actionArgs, "done", false);

    if (argHandler.getArg(actionArgs, "channelName") == null || argHandler.getArg(actionArgs, "viewerCount") == null)
        return false;

    if (+argHandler.getArg(actionArgs, "viewerCount") != NaN)
        argHandler.changeArg(actionArgs, "viewerCount", +argHandler.getArg(actionArgs, "viewerCount"))
    else
        return false;

    if (!Number.isInteger(argHandler.getArg(actionArgs, "viewerCount")))
        return false;
    return true;
});

function checkOverXViewerY(userToken, actionArgs)
{
    argHandler.initializeArg(actionArgs);

    if (argHandler.getArg(actionArgs, "channelName") == null || argHandler.getArg(actionArgs, "viewerCount") == null || argHandler.getArg(actionArgs, "addViewerCount") == null)
        return false;

    if (+argHandler.getArg(actionArgs, "viewerCount") != NaN && +argHandler.getArg(actionArgs, "addViewerCount") != NaN) {
        argHandler.changeArg(actionArgs, "viewerCount", +argHandler.getArg(actionArgs, "viewerCount"))
        argHandler.changeArg(actionArgs, "addViewerCount", +argHandler.getArg(actionArgs, "addViewerCount"))
    }
    else
        return false;

    if (!Number.isInteger(argHandler.getArg(actionArgs, "viewerCount")) || !Number.isInteger(argHandler.getArg(actionArgs, "addViewerCount")))
        return false;
    return true;
}

twitchExpectedInput.set("[Twitch] overXViewerAddY", checkOverXViewerY);

twitchExpectedInput.set("[Twitch] overXViewerTimesY", checkOverXViewerY);

// function checkGetStreamsIfPlayingX(userToken, actionArgs)
// {
//     argHandler.initializeArg(actionArgs);
//     if (argHandler.getArg(actionArgs, "channelName") == null || argHandler.getArg(actionArgs, "wantedGame") == null)
//         return false;
//     return true;
// }

module.exports.twitchExpectedInput = twitchExpectedInput;