const {fetcher} = require('../../controllers/api_access/apiCaller');
const argHandler = require('../../tools/argHandler');
const {updateActionArg, updateReactionArg} = require("../../db_management/job/db_job");
const {apiGetter} = require("../../controllers/api_access/apiGetter");
const fetch = require('node-fetch');

function newPrivateMessage(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess2 = true;
    const lastMessage = argHandler.getArg(actionArgs, "lastMessage"); //added by us

    apiGetter(argHandler.getArg(actionArgs, "userToken"), "REDDIT")
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((token) => {
        if (isSuccess && token && token.access_token) {
            var myHeaders = new fetch.Headers();
            myHeaders.append("User-Agent", "NotePad-Chan_AREA by /u/NotePad-Chan");
            myHeaders.append("Authorization", "Bearer " + token.access_token);
            // myHeaders.append("Cookie", "csv=2; edgebucket=jQl0TZZYVjh9BPyc3k; loid=0000000000cvh6aceh.2.1624377178000.Z0FBQUFBQmpiOTAtdlZhMDI3SjZzRmZQNDZ2OVVJaENna05SS252U1RPQlJtR25lVUpJMjBhTzJmVFlmbHZ6ejB2UUVEbUFxS0JMSlFZYzZ2ZXhWZ0g2ODZMNXlxQ3V0QzFQelNCOTVOaVdGeWNKQW55U1p3VFY3V011Tk0wejZYR1VLNUdTWnMwYjM; session_tracker=8qksakWYu9gS48qgVX.0.1668277450474.Z0FBQUFBQmpiLVRLQ2M3c1JWd3huUC0tb0Z5UHRjdFBpcFdnRHpoTGJVbjZ1SUlncjVBUk5RcUh6cjNicUlPczlQSHEtZ0RKWndPRm56ekxZTVJ1cWx5M1gzRDBwM3hTZ1NCYWp3N1h6aHpPRnRtWjZJS1d4M2c0VmE3S1hnZ0RvUENQOVkzck5odHI");
            // myHeaders.append("Cookie", "csv=2; edgebucket=jQl0TZZYVjh9BPyc3k");
            const options = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetcher(options, "https://oauth.reddit.com/message/inbox.json?limit=1")
            .catch((e) => {
                isSuccess2 = false;
                console.log(e);
            })
            .then((reddit) => {
                if (isSuccess2 && reddit && reddit.data.children.length >= 1 && reddit.data.children[0].data &&
                        reddit.data.children[0].data.id && lastMessage != reddit.data.children[0].data.id) {
                    argHandler.changeArg(actionArgs, "lastMessage", reddit.data.children[0].data.id, {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
                    argHandler.changeArg(reactionArgs, "text", "You've Got Mail, Reddit Mail from: " + reddit.data.children[0].data.author + ".\n subject: " + reddit.data.children[0].data.subject + "\n" + reddit.data.children[0].data.body);
                    callback(reactionArgs);
                }
            });
        }
    });
}

module.exports.newPrivateMessage = newPrivateMessage;



const redditInfo = new Map();

redditInfo.set("[Reddit] newPrivateMessage", {
    name: "[Reddit] newPrivateMessage",
    description: "To know when you have received a new reddit private message.",
    args: []
});

module.exports.redditInfo = redditInfo;