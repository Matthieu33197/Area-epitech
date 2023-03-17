const {fetcher} = require('../../controllers/api_access/apiCaller');
const argHandler = require('../../tools/argHandler');

function getRandomWaifu(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, "https://api.waifu.im/random/?gif=false&is_nsfw=false")
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((waifu) => {
        if (isSuccess && waifu) {
            argHandler.changeArg(reactionArgs, "text", "Here is your random picture of a female character: " + waifu.images[0].url + "\nby: " + waifu.images[0].source);
            callback(reactionArgs);
        }
    });
}

module.exports.getRandomWaifu = getRandomWaifu;



const waifuInfo = new Map();

waifuInfo.set("[Waifu] getRandomWaifu", {
    name: "[Waifu] getRandomWaifu",
    description: "Give a random picture of a female character and the source of said picture.",
    args: []
});

module.exports.waifuInfo = waifuInfo;