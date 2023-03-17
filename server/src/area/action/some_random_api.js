const {fetcher} = require('../../controllers/api_access/apiCaller');
const argHandler = require('../../tools/argHandler');

function getSomeRandomRedPanda(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, "https://some-random-api.ml/animal/red_panda")
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((red_panda) => {
        if (isSuccess && red_panda) {
            argHandler.changeArg(reactionArgs, "text", "Here is your random red panda and a fact about them:\n" + red_panda.fact + "\n" + red_panda.image);
            callback(reactionArgs);
        }
    });
}

function getSomeRandomRaccoon(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, "https://some-random-api.ml/animal/raccoon")
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((raccoon) => {
        if (isSuccess && raccoon) {
            argHandler.changeArg(reactionArgs, "text", "Here is your random raccoon and a fact about them:\n" + raccoon.fact + "\n" + raccoon.image);
            callback(reactionArgs);
        }
    });
}

function getSomeRandomKangaroo(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, "https://some-random-api.ml/animal/kangaroo")
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((kangaroo) => {
        if (isSuccess && kangaroo) {
            argHandler.changeArg(reactionArgs, "text", "Here is your random kangaroo and a fact about them:\n" + kangaroo.fact + "\n" + kangaroo.image);
            callback(reactionArgs);
        }
    });
}

function getSomeRandomKoala(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, "https://some-random-api.ml/animal/koala")
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((koala) => {
        if (isSuccess && koala) {
            argHandler.changeArg(reactionArgs, "text", "Here is your random koala and a fact about them:\n" + koala.fact + "\n" + koala.image);
            callback(reactionArgs);
        }
    });
}

function getSomeRandomJoke(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, "https://some-random-api.ml/joke")
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((joke) => {
        if (isSuccess && joke) {
            argHandler.changeArg(reactionArgs, "text", "Here is your random joke\n" + joke.joke);
            callback(reactionArgs);
        }
    });
}

function getSomeRandomAnimePat(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, "https://some-random-api.ml/animu/pat")
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((pat) => {
        if (isSuccess && pat) {
            argHandler.changeArg(reactionArgs, "text", "Here is your random gif of anime pat\n" + pat.link);
            callback(reactionArgs);
        }
    });
}

function getSomeRandomAnimeWink(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, "https://some-random-api.ml/animu/wink")
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((wink) => {
        if (isSuccess && wink) {
            argHandler.changeArg(reactionArgs, "text", "Here is your random gif of anime wink\n" + wink.link);
            callback(reactionArgs);
        }
    });
}

function getSomeRandomAnimeHug(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, "https://some-random-api.ml/animu/hug")
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((hug) => {
        if (isSuccess && hug) {
            argHandler.changeArg(reactionArgs, "text", "Here is your random gif of anime hug\n" + hug.link);
            callback(reactionArgs);
        }
    });
}

module.exports.getSomeRandomRedPanda = getSomeRandomRedPanda;
module.exports.getSomeRandomRaccoon = getSomeRandomRaccoon;
module.exports.getSomeRandomKangaroo = getSomeRandomKangaroo;
module.exports.getSomeRandomKoala = getSomeRandomKoala;
module.exports.getSomeRandomJoke = getSomeRandomJoke;
module.exports.getSomeRandomAnimePat = getSomeRandomAnimePat;
module.exports.getSomeRandomAnimeWink = getSomeRandomAnimeWink;
module.exports.getSomeRandomAnimeHug = getSomeRandomAnimeHug;



const someRandomInfo = new Map();

someRandomInfo.set("[Random_Api] getSomeRandomRedPanda", {
    name: "[Random_Api] getSomeRandomRedPanda",
    description: "Give a random red panda picture and fact.",
    args: []
});

someRandomInfo.set("[Random_Api] getSomeRandomRaccoon", {
    name: "[Random_Api] getSomeRandomRaccoon",
    description: "Give a random raccoon picture and fact.",
    args: []
});

someRandomInfo.set("[Random_Api] getSomeRandomKangaroo", {
    name: "[Random_Api] getSomeRandomKangaroo",
    description: "Give a random kangaroo picture and fact.",
    args: []
});

someRandomInfo.set("[Random_Api] getSomeRandomKoala", {
    name: "[Random_Api] getSomeRandomKoala",
    description: "Give a random koala picture and fact.",
    args: []
});

someRandomInfo.set("[Random_Api] getSomeRandomJoke", {
    name: "[Random_Api] getSomeRandomJoke",
    description: "Give a random joke.",
    args: []
});

someRandomInfo.set("[Random_Api] getSomeRandomAnimePat", {
    name: "[Random_Api] getSomeRandomAnimePat",
    description: "Give a random anime pat GIF.",
    args: []
});

someRandomInfo.set("[Random_Api] getSomeRandomAnimeWink", {
    name: "[Random_Api] getSomeRandomAnimeWink",
    description: "Give a random anime wink GIF.",
    args: []
});

someRandomInfo.set("[Random_Api] getSomeRandomAnimeHug", {
    name: "[Random_Api] getSomeRandomAnimeHug",
    description: "Give a random anime hug GIF.",
    args: []
});

module.exports.someRandomInfo = someRandomInfo;