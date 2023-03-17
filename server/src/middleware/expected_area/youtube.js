const argHandler = require('../../tools/argHandler');
const urlParser = require('js-video-url-parser');

function checkOverXLikeY(userToken, actionArgs)
{
    argHandler.initializeArg(actionArgs);
    const videoURL = argHandler.getArg(actionArgs, "videoURL");

    if (videoURL == null) {
        return false;
    }
    else {
        const data = urlParser.parse(videoURL);

        if (!data || !data.id) {
            return false;
        }
        argHandler.changeArg(actionArgs, "videoURL", data.id);
    }

    if (argHandler.getArg(actionArgs, "likes") == null || argHandler.getArg(actionArgs, "addLikes") == null)
        return false;

    if (+argHandler.getArg(actionArgs, "likes") != NaN && +argHandler.getArg(actionArgs, "addLikes") != NaN) {
        argHandler.changeArg(actionArgs, "likes", +argHandler.getArg(actionArgs, "likes"))
        argHandler.changeArg(actionArgs, "addLikes", +argHandler.getArg(actionArgs, "addLikes"))
    }
    else
        return false;

    if (!Number.isInteger(argHandler.getArg(actionArgs, "likes")) || !Number.isInteger(argHandler.getArg(actionArgs, "addLikes")))
        return false;
    return true;
}

function checkOverXViewY(userToken, actionArgs)
{
    argHandler.initializeArg(actionArgs);
    const videoURL = argHandler.getArg(actionArgs, "videoURL");

    if (videoURL == null) {
        return false;
    }
    else {
        const data = urlParser.parse(videoURL);

        if (!data || !data.id) {
            return false;
        }
        argHandler.changeArg(actionArgs, "videoURL", data.id);
    }

    if (argHandler.getArg(actionArgs, "views") == null || argHandler.getArg(actionArgs, "addViews") == null)
        return false;

    if (+argHandler.getArg(actionArgs, "views") != NaN && +argHandler.getArg(actionArgs, "addViews") != NaN) {
        argHandler.changeArg(actionArgs, "views", +argHandler.getArg(actionArgs, "views"))
        argHandler.changeArg(actionArgs, "addViews", +argHandler.getArg(actionArgs, "addViews"))
    }
    else
        return false;

    if (!Number.isInteger(argHandler.getArg(actionArgs, "views")) || !Number.isInteger(argHandler.getArg(actionArgs, "addViews")))
        return false;
    return true;
}

function checkOverXVideosY(userToken, actionArgs)
{
    argHandler.initializeArg(actionArgs);

    if (argHandler.getArg(actionArgs, "channelName") == null || argHandler.getArg(actionArgs, "videoCount") == null || argHandler.getArg(actionArgs, "addVideoCount") == null)
        return false;

    if (+argHandler.getArg(actionArgs, "videoCount") != NaN && +argHandler.getArg(actionArgs, "addVideoCount") != NaN) {
        argHandler.changeArg(actionArgs, "videoCount", +argHandler.getArg(actionArgs, "videoCount"))
        argHandler.changeArg(actionArgs, "addVideoCount", +argHandler.getArg(actionArgs, "addVideoCount"))
    }
    else
        return false;

    if (!Number.isInteger(argHandler.getArg(actionArgs, "videoCount")) || !Number.isInteger(argHandler.getArg(actionArgs, "addVideoCount")))
        return false;
    return true;
}

const youtubeExpectedInput = new Map();

youtubeExpectedInput.set("[Youtube] NewLike", function(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);
    const videoURL = argHandler.getArg(actionArgs, "videoURL");

    if (videoURL == null) {
        return false;
    }
    else {
        const data = urlParser.parse(videoURL);

        if (!data || !data.id) {
            return false;
        }
        argHandler.changeArg(actionArgs, "videoURL", data.id);
    }
    argHandler.addArg(actionArgs, "s_likes", 0);
    return true;
});

youtubeExpectedInput.set("[Youtube] overXLike", function(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);
    const videoURL = argHandler.getArg(actionArgs, "videoURL");

    if (videoURL == null) {
        return false;
    }
    else {
        const data = urlParser.parse(videoURL);

        if (!data || !data.id) {
            return false;
        }
        argHandler.changeArg(actionArgs, "videoURL", data.id);
    }
    argHandler.addArg(actionArgs, "done", false);

    if (argHandler.getArg(actionArgs, "likes") == null)
        return false;

    if (+argHandler.getArg(actionArgs, "likes") != NaN)
        argHandler.changeArg(actionArgs, "likes", +argHandler.getArg(actionArgs, "likes"))
    else
        return false;

    if (!Number.isInteger(argHandler.getArg(actionArgs, "likes")))
        return false;
    return true;
});

youtubeExpectedInput.set("[Youtube] overXLikeAddY", checkOverXLikeY);

youtubeExpectedInput.set("[Youtube] overXLikeTimesY", checkOverXLikeY);

youtubeExpectedInput.set("[Youtube] newView", function(userToken, actionArgs) {
    const videoURL = argHandler.getArg(actionArgs, "videoURL");

    if (videoURL == null) {
        return false;
    }
    else {
        const data = urlParser.parse(videoURL);

        if (!data || !data.id) {
            return false;
        }
        argHandler.changeArg(actionArgs, "videoURL", data.id);
    }
    argHandler.initializeArg(actionArgs);
    argHandler.addArg(actionArgs, "s_views", 0);
    return true;
});

youtubeExpectedInput.set("[Youtube] overXView", function(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);
    const videoURL = argHandler.getArg(actionArgs, "videoURL");

    if (videoURL == null) {
        return false;
    }
    else {
        const data = urlParser.parse(videoURL);

        if (!data || !data.id) {
            return false;
        }
        argHandler.changeArg(actionArgs, "videoURL", data.id);
    }
    argHandler.addArg(actionArgs, "done", false);

    if (argHandler.getArg(actionArgs, "views") == null)
        return false;

    if (+argHandler.getArg(actionArgs, "views") != NaN)
        argHandler.changeArg(actionArgs, "views", +argHandler.getArg(actionArgs, "views"))
    else
        return false;

    if (!Number.isInteger(argHandler.getArg(actionArgs, "views")))
        return false;
    return true;
});

youtubeExpectedInput.set("[Youtube] overXViewAddY", checkOverXViewY);

youtubeExpectedInput.set("[Youtube] overXViewTimesY", checkOverXViewY);

youtubeExpectedInput.set("[Youtube] newVideos", function(userToken, actionArgs) {
    if (argHandler.getArg(actionArgs, "channelName") == null) {
        return false;
    }
    argHandler.initializeArg(actionArgs);
    argHandler.addArg(actionArgs, "lastVideoID", "");
    return true;
});

youtubeExpectedInput.set("[Youtube] overXVideos", function(userToken, actionArgs) {
    argHandler.initializeArg(actionArgs);
    argHandler.addArg(actionArgs, "done", false);

    if (argHandler.getArg(actionArgs, "channelName") == null || argHandler.getArg(actionArgs, "videoCount") == null)
        return false;

    if (+argHandler.getArg(actionArgs, "videoCount") != NaN)
        argHandler.changeArg(actionArgs, "videoCount", +argHandler.getArg(actionArgs, "videoCount"))
    else
        return false;

    if (!Number.isInteger(argHandler.getArg(actionArgs, "videoCount")))
        return false;
    return true;
});

youtubeExpectedInput.set("[Youtube] overXVideosAddY", checkOverXVideosY);

youtubeExpectedInput.set("[Youtube] overXVideosTimesY", checkOverXVideosY);


module.exports.youtubeExpectedInput = youtubeExpectedInput;