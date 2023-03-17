const {fetcher} = require('../../controllers/api_access/apiCaller');
const argHandler = require('../../tools/argHandler');

function getRandomDog(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, "https://dog.ceo/api/breeds/image/random")
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((dog) => {
        if (isSuccess && dog) {
            argHandler.changeArg(reactionArgs, "text", "Here is your random picture of a dog:\n" + dog.message);
            callback(reactionArgs);
        }
    });
}

module.exports.getRandomDog = getRandomDog;



const doggoInfo = new Map();

doggoInfo.set("[Doggo] getRandomDog", {
    name: "[Doggo] getRandomDog",
    description: "Give a random dog picture.",
    args: []
});

module.exports.doggoInfo = doggoInfo;