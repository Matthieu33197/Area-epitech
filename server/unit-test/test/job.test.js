const pactum = require('pactum');

//#region [Update user's job]
module.exports.updateJob_200 = function() {
    it('POST /update-job (normal working)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/update-job')
            .withCookies('$S{authtoken}')
            .withJson({
                "jobToken": "",
                "name": "srdtfu",
                "action": "[Youtube] NewLike",
                "actionArg": {
                    "videoURL": "https://www.youtube.com/watch?v=o91JrH9phTk"
                },
                "reaction": "[Discord] sendPrivateMessages",
                "reactionArg": {
                    "userID": "143472015762784256"
                },
                "interval": 10,
                "runNow": "true"
            })
            .expectStatus(200)
            .stores('jobToken', 'res.body.job.jobToken');
    });
}

module.exports.updateJob_401 = function() {
    it('POST /update-job (fail because no AREA cookie)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/spec1al/t3st42/update-job')
            .withJson({
                "jobToken": "",
                "name": "srdtfu",
                "action": "[Youtube] NewLike",
                "actionArg": {
                    "videoURL": "https://www.youtube.com/watch?v=o91JrH9phTk"
                },
                "reaction": "[Discord] sendPrivateMessages",
                "reactionArg": {
                    "userID": "143472015762784256"
                },
                "interval": 10,
                "runNow": "true"
            })
            .expectStatus(401)
    });
}

module.exports.updateJob_401_2 = function() {
    it('POST /update-job (fail because action does not exist)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/update-job')
            .withCookies('$S{authtoken}')
            .withJson({
                "jobToken": "",
                "name": "srdtfu",
                "action": "[Youtube] NewLikae",
                "actionArg": {
                    "videoURL": "https://www.youtube.com/watch?v=o91JrH9phTk"
                },
                "reaction": "[Discord] sendPrivateMessages",
                "reactionArg": {
                    "userID": "143472015762784256"
                },
                "interval": 10,
                "runNow": "true"
            })
            .expectStatus(401)
    });
}

module.exports.updateJob_401_3 = function() {
    it('POST /update-job (fail because reaction does not exist)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/update-job')
            .withCookies('$S{authtoken}')
            .withJson({
                "jobToken": "",
                "name": "srdtfu",
                "action": "[Youtube] NewLike",
                "actionArg": {
                    "videoURL": "https://www.youtube.com/watch?v=o91JrH9phTk"
                },
                "reaction": "[Discord] saendPrivateMessages",
                "reactionArg": {
                    "userID": "143472015762784256"
                },
                "interval": 10,
                "runNow": "true"
            })
            .expectStatus(401)
    });
}
//#endregion

//#region [Search user's job]
module.exports.searchJob_200 = function() {
    it('POST /search-job (normal working)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/search-job')
            .withCookies('$S{authtoken}')
            .withJson({
                "name": "srd",
                "action": "[Youtube]",
                "reaction": "[Discord]"
            })
            .expectStatus(200)
    });
}

module.exports.searchJob_401 = function() {
    it('POST /search-job (fail because no AREA cookie)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/spec1al/t3st42/search-job')
            .withJson({
                "name": "srd",
                "action": "[Youtube]",
                "reaction": "[Discord]"
            })
            .expectStatus(401)
    });
}
//#endregion

//#region [Stop user's job]
module.exports.stopJob_200 = function() {
    it('POST /stop-job (normal working stop)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/stop-job')
            .withCookies('$S{authtoken}')
            .withJson({
                "jobToken": "$S{jobToken}",
                "stop": true
            })
            .expectStatus(200)
    });
}

module.exports.stopJob_200_2 = function() {
    it('POST /stop-job (normal working resume)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/stop-job')
            .withCookies('$S{authtoken}')
            .withJson({
                "jobToken": "$S{jobToken}",
                "stop": false
            })
            .expectStatus(200)
    });
}

module.exports.stopJob_401 = function() {
    it('POST /stop-job (fail because no AREA cookie)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/spec1al/t3st42/stop-job')
            .withJson({
                "jobToken": "$S{jobToken}",
                "stop": true
            })
            .expectStatus(401)
    });
}
//#endregion

//#region [Delete user's job]
module.exports.deleteJob_200 = function() {
    it('POST /delete-job (normal working)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/delete-job')
            .withCookies('$S{authtoken}')
            .withJson({
                "jobToken": "$S{jobToken}"
            })
            .expectStatus(200)
    });
}

module.exports.deleteJob_401 = function() {
    it('POST /delete-job (fail because no AREA cookie)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/spec1al/t3st42/delete-job')
            .withJson({
                "jobToken": "$S{jobToken}"
            })
            .expectStatus(401)
    });
}
//#endregion

// module.exports. = function() {
//     
// }