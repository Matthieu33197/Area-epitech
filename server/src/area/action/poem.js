const {fetcher} = require('../../controllers/api_access/apiCaller');
const argHandler = require('../../tools/argHandler');

function getRandomPoem(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, "https://www.poemist.com/api/v1/randompoems")
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((poems) => {
        if (isSuccess && poems) {
            argHandler.changeArg(reactionArgs, "text", "Here is your random poem:\n\n\nTitled: " + poems[0].title + "\n\n" + poems[0].content + "\nBy: " + poems[0].poet.name);
            callback(reactionArgs);
        }
    });
}

module.exports.getRandomPoem = getRandomPoem;



const poemInfo = new Map();

poemInfo.set("[Poemist] getRandomPoem", {
    name: "[Poemist] getRandomPoem",
    description: "Give a random poem.",
    args: []
});

module.exports.poemInfo = poemInfo;