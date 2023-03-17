const {fetcher} = require('../../controllers/api_access/apiCaller');
const argHandler = require('../../tools/argHandler');

function getAPOD(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, "https://api.nasa.gov/planetary/apod?api_key=6eCKaKJ3S6MhXUEMr3DDhcphb5Qbl1DohqPezjGB")
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((apod) => {
        if (isSuccess && apod) {
            argHandler.changeArg(reactionArgs, "text", "Here is your astronomy picture of the day:\n\n\nTitled: " + apod.title + "\n\n" + "Explanation: " + apod.explanation + "\n" + apod.hdurl);
            callback(reactionArgs);
        }
    });
}

module.exports.getAPOD = getAPOD;



const nasaInfo = new Map();

nasaInfo.set("[NASA] getAPOD", {
    name: "[NASA] getAPOD",
    description: "With the nasa gives the astronomy picture of the day.",
    args: []
});

module.exports.nasaInfo = nasaInfo;