const { Client } = require("youtubei");
const argHandler = require('../../tools/argHandler');
const {updateActionArg, updateReactionArg} = require("../../db_management/job/db_job");
const {convertToDecNumber, convertStrToBool} = require("../../tools/argConverter");

const youtube = new Client();

//like counter changed
function NewLike(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const server_likes = convertToDecNumber(argHandler.getArg(actionArgs, "s_likes")); //added by us
    const videoURL = argHandler.getArg(actionArgs, "videoURL"); //needed

    youtube.getVideo(videoURL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((video) => {
        if (isSuccess && video != null && video != undefined && video.likeCount != undefined && video.likeCount != server_likes) {
            argHandler.changeArg(actionArgs, "s_likes", video.likeCount, {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
            argHandler.changeArg(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " like count as changed.\nCurrent like counter is " + video.likeCount + " likes.\n");
            callback(reactionArgs);
        }
    });
}

//video got over x likes
function overXLike(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const likes = convertToDecNumber(argHandler.getArg(actionArgs, "likes"));  //needed
    const videoURL = argHandler.getArg(actionArgs, "videoURL"); //needed
    const done = convertStrToBool(argHandler.getArg(actionArgs, "done")); //added by us

    if (!done) {
        youtube.getVideo(videoURL)
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((video) => {
            if (isSuccess && video != null && video != undefined && video.likeCount != undefined && video.likeCount >= likes) {
                argHandler.changeArg(actionArgs, "done", true, {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
                argHandler.changeArg(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " targeted number of like as been reached.\nCurrent like counter is " + video.likeCount + " likes.\n");
                callback(reactionArgs);
            }
        });
    }
}

function overXLikeAddY(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const likes = convertToDecNumber(argHandler.getArg(actionArgs, "likes"));  //needed
    const addLikes = convertToDecNumber(argHandler.getArg(actionArgs, "addLikes"));  //needed
    const videoURL = argHandler.getArg(actionArgs, "videoURL"); //needed

    youtube.getVideo(videoURL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((video) => {
        if (isSuccess && video != null && video != undefined && video.likeCount != undefined && video.likeCount >= likes) {
            argHandler.changeArg(actionArgs, "likes", (likes + addLikes), {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
            argHandler.changeArg(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " targeted number of like (" + likes + " likes) as been reached.\nThe new target is " + (likes + addLikes) + " likes.\nCurrent like counter is " + video.likeCount + " likes.\n");
            callback(reactionArgs);
        }
    });
}

function overXLikeTimesY(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const likes = convertToDecNumber(argHandler.getArg(actionArgs, "likes")); //needed
    const addLikes = convertToDecNumber(argHandler.getArg(actionArgs, "addLikes")); //needed
    const videoURL = argHandler.getArg(actionArgs, "videoURL"); //needed

    youtube.getVideo(videoURL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((video) => {
        if (isSuccess && video != null && video != undefined && video.likeCount != undefined && video.likeCount >= likes) {
            argHandler.changeArg(actionArgs, "likes", (likes * addLikes), {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
            argHandler.changeArg(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " targeted number of like (" + likes + " likes) as been reached.\nThe new target is " + (likes * addLikes) + " likes.\nCurrent like counter is " + video.likeCount + " likes.\n");
            callback(reactionArgs);
        }
    });
}

//change view counter
function newView(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const views = convertToDecNumber(argHandler.getArg(actionArgs, "s_views")); //added by us
    const videoURL = argHandler.getArg(actionArgs, "videoURL"); //needed

    youtube.getVideo(videoURL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((video) => {
        if (isSuccess && video != null && video != undefined && video.viewCount != undefined && video.viewCount != views) {
            argHandler.changeArg(actionArgs, "s_views", video.viewCount, {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
            argHandler.changeArg(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " view count as changed.\nCurrent view counter is " + video.viewCount + " views.\n");
            callback(reactionArgs);
        }
    });
}

//reached targeted view
function overXView(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const views = convertToDecNumber(argHandler.getArg(actionArgs, "views"));  //needed
    const videoURL = argHandler.getArg(actionArgs, "videoURL"); //needed
    const done = convertStrToBool(argHandler.getArg(actionArgs, "done")); //added by us

    if (!done) {
        youtube.getVideo(videoURL)
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((video) => {
            if (isSuccess && video != null && video != undefined && video.viewCount != undefined && video.viewCount >= views) {
                argHandler.changeArg(actionArgs, "done", true, {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
                argHandler.changeArg(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " targeted number of views as been reached.\nCurrent views counter is " + video.viewCount + " views.\n");
                callback(reactionArgs);
            }
        });
    }
}

function overXViewAddY(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const views = convertToDecNumber(argHandler.getArg(actionArgs, "views")); //needed
    const addViews = convertToDecNumber(argHandler.getArg(actionArgs, "addViews")); //needed
    const videoURL = argHandler.getArg(actionArgs, "videoURL"); //needed

    youtube.getVideo(videoURL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((video) => {
        if (isSuccess && video != null && video != undefined && video.viewCount != undefined && video.viewCount >= views) {
            argHandler.changeArg(actionArgs, "views", (views + addViews), {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
            argHandler.changeArg(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " targeted number of views (" + views + " views) as been reached.\nThe new target is " + (views + addViews) + " views.\nCurrent views counter is " + video.viewCount + " views.\n");
            callback(reactionArgs);
        }
    });
}

function overXViewTimesY(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const views = convertToDecNumber(argHandler.getArg(actionArgs, "views")); //needed
    const addViews = convertToDecNumber(argHandler.getArg(actionArgs, "addViews")); //needed
    const videoURL = argHandler.getArg(actionArgs, "videoURL"); //needed

    youtube.getVideo(videoURL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((video) => {
        if (isSuccess && video != null && video != undefined && video.viewCount != undefined && video.viewCount >= views) {
            argHandler.changeArg(actionArgs, "views", (views * addViews), {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
            argHandler.changeArg(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " targeted number of views (" + views + " views) as been reached.\nThe new target is " + (views * addViews) + " views.\nCurrent views counter is " + video.viewCount + " views.\n");
            callback(reactionArgs);
        }
    });
}

//new videos
function newVideos(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;
    const lastVideoID = argHandler.getArg(actionArgs, "lastVideoID"); //added by us
    const channelName = argHandler.getArg(actionArgs, "channelName"); //needed

    youtube.findOne(channelName, {type: "channel"})
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((channel) => {
        if (isSuccess && channel) {
            channel.videos.next()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((video) => {
                if (isSuccess_2 && channel.videos.items && channel.videos.items.length >= 1 && lastVideoID != channel.videos.items[0].id){
                    argHandler.changeArg(actionArgs, "lastVideoID", channel.videos.items[0].id, {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
                    argHandler.changeArg(reactionArgs, "text", "Your chossen Youtube channel named: " + channel.name + " as published a new video titled \"" + channel.videos.items[0].title + "\", it has a duration of " + channel.videos.items[0].duration + " seconds.\n");
                    callback(reactionArgs);
                }
            });
        }
    });
}

//reached targeted number of videos
function overXVideos(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const videoCount = convertToDecNumber(argHandler.getArg(actionArgs, "videoCount")); //needed
    const channelName = argHandler.getArg(actionArgs, "channelName"); //needed
    const done = convertStrToBool(argHandler.getArg(actionArgs, "done")); //added by us

    if (!done) {
        youtube.findOne(channelName, {type: "channel"})
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((channel) => {
            if (isSuccess && channel != null && channel != undefined && channel.videoCount != undefined && channel.videoCount >= videoCount) {
                argHandler.changeArg(actionArgs, "done", true, {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
                argHandler.changeArg(reactionArgs, "text", "Your chossen Youtube channel named: " + channel.name + " as reached the targeted number of videos uploaded.\nCurrent video counter is " + channel.videoCount + " video.\n");
                callback(reactionArgs);
            }
        });
    }
}

function overXVideosAddY(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const videoCount = convertToDecNumber(argHandler.getArg(actionArgs, "videoCount")); //needed
    const addVideoCount = convertToDecNumber(argHandler.getArg(actionArgs, "addVideoCount")); //needed
    const channelName = argHandler.getArg(actionArgs, "channelName"); //needed

    youtube.findOne(channelName, {type: "channel"})
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((channel) => {
        if (isSuccess && channel != null && channel != undefined && channel.videoCount != undefined && channel.videoCount >= videoCount) {
            argHandler.changeArg(actionArgs, "videoCount", (videoCount + addVideoCount), {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
            argHandler.changeArg(reactionArgs, "text", "Your chossen Youtube channel named: " + channel.name + " as reached the targeted number of videos uploaded (" + videoCount + " videos).\nThe new target is " + (videoCount + addVideoCount) + " videos.\nCurrent video counter is " + channel.videoCount + " videos.\n");
            callback(reactionArgs);
        }
    });
}

function overXVideosTimesY(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const videoCount = convertToDecNumber(argHandler.getArg(actionArgs, "videoCount")); //needed
    const addVideoCount = convertToDecNumber(argHandler.getArg(actionArgs, "addVideoCount")); //needed
    const channelName = argHandler.getArg(actionArgs, "channelName"); //needed

    youtube.findOne(channelName, {type: "channel"})
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((channel) => {
        if (isSuccess && channel != null && channel != undefined && channel.videoCount != undefined && channel.videoCount >= videoCount) {
            argHandler.changeArg(actionArgs, "videoCount", (videoCount * addVideoCount), {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
            argHandler.changeArg(reactionArgs, "text", "Your chossen Youtube channel named: " + channel.name + " as reached the targeted number of videos uploaded (" + videoCount + " videos).\nThe new target is " + (videoCount * addVideoCount) + " videos.\nCurrent video counter is " + channel.videoCount + " videos.\n");
            callback(reactionArgs);
        }
    });
}

module.exports.NewLike = NewLike;
module.exports.overXLike = overXLike;
module.exports.overXLikeAddY = overXLikeAddY;
module.exports.overXLikeTimesY = overXLikeTimesY;

module.exports.newView = newView;
module.exports.overXView = overXView;
module.exports.overXViewAddY = overXViewAddY;
module.exports.overXViewTimesY = overXViewTimesY;

module.exports.newVideos = newVideos;
module.exports.overXVideos = overXVideos;
module.exports.overXVideosAddY = overXVideosAddY;
module.exports.overXVideosTimesY = overXVideosTimesY;



const youtubeInfo = new Map();

youtubeInfo.set("[Youtube] NewLike", {
    name: "[Youtube] NewLike",
    description: "To know if a video's like counter changed.",
    args: [
        {videoURL: "The URL of the video you wish to monitor."}
    ]
});

youtubeInfo.set("[Youtube] overXLike", {
    name: "[Youtube] overXLike",
    description: "To know if a video as reached the targeted number of likes.",
    args: [
        {videoURL: "The URL of the video you wish to monitor."},
        {likes: "Targeted number of likes."}
    ]
});

youtubeInfo.set("[Youtube] overXLikeAddY", {
    name: "[Youtube] overXLikeAddY",
    description: "To know if a video as reached the targeted number of likes. And then add addLikes to the target.",
    args: [
        {videoURL: "The URL of the video you wish to monitor."},
        {likes: "Targeted number of likes."},
        {addLikes: "Number of likes to add when the previous target has been reached."}
    ]
});

youtubeInfo.set("[Youtube] overXLikeTimesY", {
    name: "[Youtube] overXLikeTimesY",
    description: "To know if a video as reached the targeted number of likes. And then multiply the target by addLikes.",
    args: [
        {videoURL: "The URL of the video you wish to monitor."},
        {likes: "Targeted number of likes."},
        {addLikes: "Number of likes to multiply by when the previous target has been reached."}
    ]
});

youtubeInfo.set("[Youtube] newView", {
    name: "[Youtube] newView",
    description: "To know if a video's views counter changed.",
    args: [
        {videoURL: "The URL of the video you wish to monitor."}
    ]
});

youtubeInfo.set("[Youtube] overXView", {
    name: "[Youtube] overXView",
    description: "To know if a video as reached the targeted number of views.",
    args: [
        {videoURL: "The URL of the video you wish to monitor."},
        {views: "Targeted number of views."}
    ]
});

youtubeInfo.set("[Youtube] overXViewAddY", {
    name: "[Youtube] overXViewAddY",
    description: "To know if a video as reached the targeted number of views. And then add addViews to the target.",
    args: [
        {videoURL: "The URL of the video you wish to monitor."},
        {views: "Targeted number of views."},
        {addViews: "Number of views to add when the previous target has been reached."}
    ]
});

youtubeInfo.set("[Youtube] overXViewTimesY", {
    name: "[Youtube] overXViewTimesY",
    description: "To know if a video as reached the targeted number of views. And then multiply the target by addViews.",
    args: [
        {videoURL: "The URL of the video you wish to monitor."},
        {views: "Targeted number of views."},
        {addViews: "Number of views to multiply by when the previous target has been reached."}
    ]
});

youtubeInfo.set("[Youtube] newVideos", {
    name: "[Youtube] newVideos",
    description: "To know if a Youtube channel as uploaded a new video.",
    args: [
        {channelName: "The channel's name you wish to monitor."}
    ]
});

youtubeInfo.set("[Youtube] overXVideos", {
    name: "[Youtube] overXVideos",
    description: "To know if a Youtube channel as reached the targeted number of videos.",
    args: [
        {channelName: "The channel's name you wish to monitor."},
        {videoCount: "Targeted number of videos."}
    ]
});

youtubeInfo.set("[Youtube] overXVideosAddY", {
    name: "[Youtube] overXVideosAddY",
    description: "To know if a Youtube channel as reached the targeted number of videos. And then add addVideoCount to the target.",
    args: [
        {channelName: "The channel's name you wish to monitor."},
        {videoCount: "Targeted number of videos."},
        {addVideoCount: "Number of videos to add when the previous target has been reached."}
    ]
});

youtubeInfo.set("[Youtube] overXVideosTimesY", {
    name: "[Youtube] overXVideosTimesY",
    description: "To know if a Youtube channel as reached the targeted number of videos. And then multiply the target by addVideoCount.",
    args: [
        {channelName: "The channel's name you wish to monitor."},
        {videoCount: "Targeted number of videos."},
        {addVideoCount: "Number of videos to multiply by when the previous target has been reached."}
    ]
});

module.exports.youtubeInfo = youtubeInfo;