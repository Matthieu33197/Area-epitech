const TwitchApi = require("node-twitch").default;
const argHandler = require('../../tools/argHandler');
const {updateActionArg, updateReactionArg} = require("../../db_management/job/db_job");
const {convertStrToBool, convertToDecNumber} = require("../../tools/argConverter");

const twitch = new TwitchApi({
    client_id: "84write1ma6r2u8dtgx47h9qz2pgaj",
    client_secret: "53wv6bcfjfthbi8afzvhwk6t13eb48"
});

function getStream(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const channelName = argHandler.getArg(actionArgs, "channelName");
    const live = convertStrToBool(argHandler.getArg(actionArgs, "live"));

    twitch.getStreams({ channel: channelName })
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((twitch) => {
        if (isSuccess) {
            if (!live && twitch.data[0] && twitch.data[0].game_name) {
                argHandler.changeArg(actionArgs, "live", true, {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
                argHandler.changeArg(reactionArgs, "text", "The streamer named " + channelName + " is streamimg.\nThey are currently playing " + twitch.data[0].game_name + ".");
                callback(reactionArgs);
            }
            else if (live && twitch.data[0] == undefined) {
                argHandler.changeArg(actionArgs, "live", false, {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
                argHandler.changeArg(reactionArgs, "text", "The streamer named " + channelName + " is no longer streamimg.\n");
                callback(reactionArgs);
            }
        }
    });
}

//viewerCount
function overXViewer(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const viewerCount = convertToDecNumber(argHandler.getArg(actionArgs, "viewerCount"));
    const channelName = argHandler.getArg(actionArgs, "channelName");
    const done = convertStrToBool(argHandler.getArg(actionArgs, "done")); //added by us

    if (!done) {
        twitch.getStreams({ channel: channelName })
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((twitch) => {
            if (isSuccess) {
                if (!done && twitch.data[0] && twitch.data[0].viewer_count && twitch.data[0].viewer_count >= viewerCount) {
                    argHandler.changeArg(actionArgs, "done", true, {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
                    argHandler.changeArg(reactionArgs, "text", "The streamer named " + channelName + " as reached the targeted viewer count of " + viewerCount + " viewers.\nThey currently have " + twitch.data[0].viewer_count + " viewers.");
                    callback(reactionArgs);
                }
            }
        });
    }
}

//viewerCount X + Y
function overXViewerAddY(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const viewerCount = convertToDecNumber(argHandler.getArg(actionArgs, "viewerCount"));
    const addViewerCount = convertToDecNumber(argHandler.getArg(actionArgs, "addViewerCount"));
    const channelName = argHandler.getArg(actionArgs, "channelName");

    twitch.getStreams({ channel: channelName })
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((twitch) => {
        if (isSuccess) {
            if (twitch.data[0] && twitch.data[0].viewer_count && twitch.data[0].viewer_count >= viewerCount) {
                argHandler.changeArg(actionArgs, "viewerCount", (viewerCount + addViewerCount), {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
                argHandler.changeArg(reactionArgs, "text", "The streamer named " + channelName + " as reached the targeted viewer count of " + viewerCount + " viewers.\nThey currently have " + twitch.data[0].viewer_count + " viewers.\nThe new target is " + (viewerCount + addViewerCount) + " viewers");
                callback(reactionArgs);
            }
        }
    });
}

//viewerCount X * Y
function overXViewerTimesY(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const viewerCount = convertToDecNumber(argHandler.getArg(actionArgs, "viewerCount"));
    const addViewerCount = convertToDecNumber(argHandler.getArg(actionArgs, "addViewerCount"));
    const channelName = argHandler.getArg(actionArgs, "channelName");

    twitch.getStreams({ channel: channelName })
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((twitch) => {
        if (isSuccess) {
            if (twitch.data[0] && twitch.data[0].viewer_count && twitch.data[0].viewer_count >= viewerCount) {
                argHandler.changeArg(actionArgs, "viewerCount", (viewerCount * addViewerCount), {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
                argHandler.changeArg(reactionArgs, "text", "The streamer named " + channelName + " as reached the targeted viewer count of " + viewerCount + " viewers.\nThey currently have " + twitch.data[0].viewer_count + " viewers.\nThe new target is " + (viewerCount * addViewerCount) + " viewers");
                callback(reactionArgs);
            }
        }
    });
}


//check game name
// function getStreamsIfPlayingX(actionArgs, callback, reactionArgs)
// {
//     let isSuccess = true;
//     const wantedGame = argHandler.getArg(actionArgs, "wantedGame");
//     const channelName = argHandler.getArg(actionArgs, "channelName");
//     //const channelName = argHandler.getArg(actionArgs, "channelName");

//     const twitch = new TwitchApi({
//         client_id: "84write1ma6r2u8dtgx47h9qz2pgaj",
//         client_secret: "53wv6bcfjfthbi8afzvhwk6t13eb48"
//     });
//     twitch.getStreams({ channel: channelName })
//     .catch((e) => {
//         isSuccess = false;
//         console.log(e);
//     })
//     .then((twitch) => {
//         if (isSuccess == true) {
//             if (twitch.data[0] != undefined && twitch.data[0].game_name != undefined && twitch.data[0].game_name == wantedGame) {
//                 argHandler.changeArg(reactionArgs, "text", "The streamer named " + channelName + " is streaming the game you wish to see, " + wantedGame + ".");
//                 callback(reactionArgs);
//             }
//         }
//     });
// }

//switched game

module.exports.getStream = getStream;
module.exports.overXViewer = overXViewer;
module.exports.overXViewerAddY = overXViewerAddY;
module.exports.overXViewerTimesY = overXViewerTimesY;
// module.exports.getStreamsIfPlayingX = getStreamsIfPlayingX;


const twitchInfo = new Map();

twitchInfo.set("[Twitch] getStream", {
    name: "[Twitch] getStream",
    description: "Tells you if the requested streamer as started or stoped streamimg.",
    args: [
        {channelName: "The requested streamer channel name."}
    ]
});

twitchInfo.set("[Twitch] overXViewer", {
    name: "[Twitch] overXViewer",
    description: "Tells you if the requested streamer as reached the targeted number of viewers.",
    args: [
        {channelName: "The requested streamer channel name."},
        {viewerCount: "Targeted number of viewers."}
    ]
});

twitchInfo.set("[Twitch] overXViewerAddY", {
    name: "[Twitch] overXViewerAddY",
    description: "Tells you if the requested streamer as reached the targeted number of viewers. And then add addViewerCount to the target.",
    args: [
        {channelName: "The requested streamer channel name."},
        {viewerCount: "Targeted number of viewers."},
        {addViewerCount: "Number of viewers to add when the previous target has been reached."}
    ]
});

twitchInfo.set("[Twitch] overXViewerTimesY", {
    name: "[Twitch] overXViewerTimesY",
    description: "Tells you if the requested streamer as reached the targeted number of viewers. And then multiply the target by addViewerCount.",
    args: [
        {channelName: "The requested streamer channel name."},
        {viewerCount: "Targeted number of viewers."},
        {addViewerCount: "Number of viewers to multiply by when the previous target has been reached."}
    ]
});

module.exports.twitchInfo = twitchInfo;
