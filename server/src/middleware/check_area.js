const {convertJsonToArray} = require("../tools/argConverter")
const {log} = require("../tools/logger")
const {youtubeExpectedInput} = require("./expected_area/youtube")
const {weatherExpectedInput} = require("./expected_area/weather")
const {twitchExpectedInput} = require("./expected_area/twitch")
const {covidExpectedInput} = require("./expected_area/covid")
const {ramdom_apiExpectedInput} = require("./expected_area/some_random_api")
const {catExpectedInput} = require("./expected_area/cat")
const {chuck_norrisExpectedInput} = require("./expected_area/chuck_norris_facts")
const {doggoExpectedInput} = require("./expected_area/doggo")
const {foxExpectedInput} = require("./expected_area/fox")
const {nasaExpectedInput} = require("./expected_area/nasa")
const {poemExpectedInput} = require("./expected_area/poem")
const {shiba_inuExpectedInput} = require("./expected_area/shiba_inu")
const {waifuExpectedInput} = require("./expected_area/waifu")
const {newsExpectedInput} = require("./expected_area/news")
const {redditExpectedInput} = require("./expected_area/reddit")

const {discordExpectedInput} = require("./expected_area/discord")
const {emailExpectedInput} = require("./expected_area/email")

const checkArea = function (req, res, next) {
    let isSuccess = true;
    var actionsExpectedInput = new Map([...youtubeExpectedInput].concat([...weatherExpectedInput])
                                        .concat([...twitchExpectedInput]).concat([...covidExpectedInput])
                                        .concat([...ramdom_apiExpectedInput]).concat([...catExpectedInput])
                                        .concat([...chuck_norrisExpectedInput]).concat([...doggoExpectedInput])
                                        .concat([...foxExpectedInput]).concat([...nasaExpectedInput])
                                        .concat([...poemExpectedInput]).concat([...shiba_inuExpectedInput])
                                        .concat([...waifuExpectedInput]).concat([...newsExpectedInput])
                                        .concat([...redditExpectedInput]));
    var reactionsExpectedInput = new Map([...discordExpectedInput].concat([...emailExpectedInput]));

    try {
        console.log("checkArea")
        req.body.actionArg = convertJsonToArray(req.body.actionArg);
        req.body.reactionArg = convertJsonToArray(req.body.reactionArg);

        isSuccess = (actionsExpectedInput.get(req.body.action)(req.cookies.AREA, req.body.actionArg) &&
                    reactionsExpectedInput.get(req.body.reaction)(req.cookies.AREA, req.body.reactionArg));
        console.log("isSuccess = " + isSuccess);
    }
    catch (error) {
        // add switch to compare the error and know what to do.
        console.log(error);
        isSuccess = false
    }
    finally {
        log.info({checkArea: {isSuccess: isSuccess}, req: req})
        if (isSuccess) {
            next();
        }
        else {
            res.status(401).json({success: false});
        }
    }
}

module.exports.checkArea = checkArea;