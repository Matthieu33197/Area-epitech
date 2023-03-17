const {fetcher} = require('../../controllers/api_access/apiCaller');
const argHandler = require('../../tools/argHandler');

function getRandomChuckNorrisFacts(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, "https://api.chucknorris.io/jokes/random")
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((fatcs) => {
        if (isSuccess && fatcs) {
            argHandler.changeArg(reactionArgs, "text", "Here is your random Chuck Norris facts, remember they are ALWAYS true:\n" + fatcs.value);
            callback(reactionArgs);
        }
    });
}

module.exports.getRandomChuckNorrisFacts = getRandomChuckNorrisFacts;



const chuckNorrisFactsInfo = new Map();

chuckNorrisFactsInfo.set("[Chuck_Norris] getRandomChuckNorrisFacts", {
    name: "[Chuck_Norris] getRandomChuckNorrisFacts",
    description: "Give a random and true fact about Chuck Norris.",
    args: []
});

module.exports.chuckNorrisFactsInfo = chuckNorrisFactsInfo;