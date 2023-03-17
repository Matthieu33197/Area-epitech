const {fetcher} = require('../../controllers/api_access/apiCaller');
const argHandler = require('../../tools/argHandler');

function getRandomShibaInu(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, "http://shibe.online/api/shibes?count=1&urls=true")
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((shibaInu) => {
        if (isSuccess && shibaInu) {
            argHandler.changeArg(reactionArgs, "text", "Here is your random picture of a Shiba Inu:\n" + shibaInu);
            callback(reactionArgs);
        }
    });
}

module.exports.getRandomShibaInu = getRandomShibaInu;



const shibaInuInfo = new Map();

shibaInuInfo.set("[Shiba_Inu] getRandomShibaInu", {
    name: "[Shiba_Inu] getRandomShibaInu",
    description: "Give a random Shiba Inu picture.",
    args: []
});

module.exports.shibaInuInfo = shibaInuInfo;