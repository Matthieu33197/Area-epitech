const {fetcher} = require('../../controllers/api_access/apiCaller');
const argHandler = require('../../tools/argHandler');

function getRandomCat(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, "https://api.thecatapi.com/v1/images/search")
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((cat) => {
        if (isSuccess && cat) {
            argHandler.changeArg(reactionArgs, "text", "Here is your random picture of a cat:\n" + cat[0].url);
            callback(reactionArgs);
        }
    });
}

module.exports.getRandomCat = getRandomCat;



const catInfo = new Map();

catInfo.set("[Cat] getRandomCat", {
    name: "[Cat] getRandomCat",
    description: "Give a random cat picture.",
    args: []
});

module.exports.catInfo = catInfo;