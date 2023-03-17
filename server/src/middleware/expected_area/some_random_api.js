const argHandler = require('../../tools/argHandler');

const ramdom_apiExpectedInput = new Map();

function checkGetSomeRandom(userToken, actionArgs)
{
    argHandler.initializeArg(actionArgs);
    return true;
}

ramdom_apiExpectedInput.set("[Random_Api] getSomeRandomRedPanda", checkGetSomeRandom);

ramdom_apiExpectedInput.set("[Random_Api] getSomeRandomRaccoon", checkGetSomeRandom);

ramdom_apiExpectedInput.set("[Random_Api] getSomeRandomKangaroo", checkGetSomeRandom);

ramdom_apiExpectedInput.set("[Random_Api] getSomeRandomKoala", checkGetSomeRandom);

ramdom_apiExpectedInput.set("[Random_Api] getSomeRandomJoke", checkGetSomeRandom);

ramdom_apiExpectedInput.set("[Random_Api] getSomeRandomAnimePat", checkGetSomeRandom);

ramdom_apiExpectedInput.set("[Random_Api] getSomeRandomAnimeWink", checkGetSomeRandom);

ramdom_apiExpectedInput.set("[Random_Api] getSomeRandomAnimeHug", checkGetSomeRandom);

module.exports.ramdom_apiExpectedInput = ramdom_apiExpectedInput;