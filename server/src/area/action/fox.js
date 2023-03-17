const {fetcher} = require('../../controllers/api_access/apiCaller');
const argHandler = require('../../tools/argHandler');

function getRandomFox(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, "https://randomfox.ca/floof/")
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((fox) => {
        if (isSuccess && fox) {
            argHandler.changeArg(reactionArgs, "text", "Here is your random picture of a fox:\n" + fox.image);
            callback(reactionArgs);
        }
    });
}

module.exports.getRandomFox = getRandomFox;



const foxInfo = new Map();

foxInfo.set("[Fox] getRandomFox", {
    name: "[Fox] getRandomFox",
    description: "Give a random fox picture.",
    args: []
});

module.exports.foxInfo = foxInfo;