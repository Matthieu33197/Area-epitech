const pactum = require('pactum');

//#region [Register]
module.exports.register_200 = function() {
    it('POST /register (normal working register)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/register')
            .withJson({
                username: "itjustworksa",
                email: "itjustworksa@bugthesda.com",
                password: "bugthesda"
            })
            .expectStatus(200)
            // .stores('authtoken', 'res.headers.set-cookie[0]');
    });
}

module.exports.register_401 = function() {
    it('POST /register (fail because username is a number)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/register')
            .withJson({
                username: 5,
                email: "itjustworksa@bugthesda.com",
                password: "bugthesda"
            })
            .expectStatus(401)
    });
}
//#endregion

//#region [Authenticate]
module.exports.authenticate_200 = function() {
    it('POST /authenticate (normal working authenticate)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/authenticate')
            .withJson({
                "email": "itjustworksa@bugthesda.com",
                "password": "bugthesda"
            })
            .expectStatus(200)
            .stores('authtoken', 'res.headers.set-cookie[0]');
    });
}

module.exports.authenticate_401 = function() {
    it('POST /authenticate (wrong password authenticate)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/authenticate')
            .withJson({
                "email": "itjustworksa@bugthesda.com",
                "password": "bugthesdaa"
            })
            .expectStatus(401)
    });
}

module.exports.authenticate_401_2 = function() {
    it('POST /authenticate (fail because email is a number)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/authenticate')
            .withJson({
                "email": 5,
                "password": "yolo"
            })
            .expectStatus(401)
    });
}
//#endregion

//#region [Change password]
module.exports.change_password_200 = function() {
    it('POST /change-password (normal working change-password)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/change-password')
            .withCookies('$S{authtoken}')
            .withJson({
                "oldPassword": "bugthesda",
                "newPassword": "bugthesdaa"
            })
            .expectStatus(200)
    });
}

module.exports.change_password_401 = function() {
    it('POST /change-password (fail because oldPassword is wrong)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/change-password')
            .withCookies('$S{authtoken}')
            .withJson({
                "oldPassword": "bugthesda",
                "newPassword": "bugthesdaa"
            })
            .expectStatus(401)
    });
}

module.exports.change_password_401_2 = function() {
    it('POST /change-password (fail because no AREA cookie)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/change-password')
            .withJson({
                "oldPassword": "bugthesda",
                "newPassword": "bugthesdaa"
            })
            .expectStatus(401)
    });
}

module.exports.change_password_401_3 = function() {
    it('POST /change-password (special test route) (fail because no AREA cookie)', async () => {
        await pactum.spec()
        .post('http://localhost:8079/api/v3/spec1al/t3st42/change-password')
        .withJson({
            "oldPassword": "bugthesda",
            "newPassword": "bugthesdaa"
        })
            .expectStatus(401)
    });
}

module.exports.change_password_401_4 = function() {
    it('POST /change-password (fail because no newPassword field)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/change-password')
            .withCookies('$S{authtoken}')
            .withJson({
                "oldPassword": "bugthesda",
            })
            .expectStatus(401)
    });
}
//#endregion

//#region [Unregister]
module.exports.unregister_200 = function() {
    it('POST /unregister (normal working after change-password)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/unregister')
            .withCookies('$S{authtoken}')
            .withJson({
                "password": "bugthesdaa"
            })
            .expectStatus(200)
    });
}

module.exports.unregister_401 = function() {
    it('POST /unregister (normal fail because already unregistered)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/unregister')
            .withCookies('$S{authtoken}')
            .withJson({
                "password": "bugthesda"
            })
            .expectStatus(401)
    });
}

module.exports.unregister_401_2 = function() {
    it('POST /unregister (special test route) (fail because no AREA cookie)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/spec1al/t3st42/unregister')
            .withJson({
                "password": "bugthesda"
            })
            .expectStatus(401)
    });
}
//#endregion

//#region [Update user's services]
module.exports.updateUserServices_200 = function() {
    it('POST /update-services (normal working add reaction)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/update-services')
            .withCookies('$S{authtoken}')
            .withJson({
                "service": "DISCORD",
                "subscribe": true
            })
            .expectStatus(200)
    });
}

module.exports.updateUserServices_200_2 = function() {
    it('POST /update-services (normal working remove)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/update-services')
            .withCookies('$S{authtoken}')
            .withJson({
                "service": "DISCORD",
                "subscribe": false
            })
            .expectStatus(200)
    });
}

module.exports.updateUserServices_200_3 = function() {
    it('POST /update-services (normal working add action)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/update-services')
            .withCookies('$S{authtoken}')
            .withJson({
                "service": "YOUTUBE",
                "subscribe": true
            })
            .expectStatus(200)
    });
}

module.exports.updateUserServices_401 = function() {
    it('POST /update-services (fail because no AREA cookie, add)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/spec1al/t3st42/update-services')
            .withJson({
                "service": "DISCORD",
                "subscribe": true
            })
            .expectStatus(401)
    });
}

module.exports.updateUserServices_401_2 = function() {
    it('POST /update-services (fail because no AREA cookie, remove)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/spec1al/t3st42/update-services')
            .withJson({
                "service": "DISCORD",
                "subscribe": false
            })
            .expectStatus(401)
    });
}
//#endregion

//#region [Get user's services]
module.exports.getUserServices_200 = function() {
    it('GET /get-area-available (normal working)', async () => {
        await pactum.spec()
            .get('http://localhost:8079/api/v3/get-area-available')
            .withCookies('$S{authtoken}')
            .expectStatus(200)
    });
}

module.exports.getUserServices_401 = function() {
    it('GET /get-area-available (fail because no AREA cookie)', async () => {
        await pactum.spec()
            .get('http://localhost:8079/api/v3/spec1al/t3st42/get-area-available')
            .expectStatus(401)
    });
}
//#endregion

//#region [Get user's sub services]
module.exports.getUserSubServices_200 = function() {
    it('GET /get-user-sub-services (normal working)', async () => {
        await pactum.spec()
            .get('http://localhost:8079/api/v3/get-user-sub-services')
            .withCookies('$S{authtoken}')
            .expectStatus(200)
    });
}

module.exports.getUserSubServices_401 = function() {
    it('GET /get-user-sub-services (fail because no AREA cookie)', async () => {
        await pactum.spec()
            .get('http://localhost:8079/api/v3/spec1al/t3st42/get-user-sub-services')
            .expectStatus(401)
    });
}
//#endregion

//#region [Update user's data]
module.exports.updateUserData_200 = function() {
    it('POST /update-user-data (normal working)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/update-user-data')
            .withCookies('$S{authtoken}')
            .withJson({
                "name": "test",
                "lstName": "ok",
                "avatar": null
            })
            .expectStatus(200)
    });
}

module.exports.updateUserData_401 = function() {
    it('POST /update-user-data (fail because no AREA cookie)', async () => {
        await pactum.spec()
            .post('http://localhost:8079/api/v3/spec1al/t3st42/update-user-data')
            .withJson({
                "name": "test",
                "lstName": "ok",
                "avatar": null
            })
            .expectStatus(401)
    });
}
//#endregion

//#region [Get user's data]
module.exports.getUserData_200 = function() {
    it('GET /update-user-data (normal working)', async () => {
        await pactum.spec()
            .get('http://localhost:8079/api/v3/get-user-data')
            .withCookies('$S{authtoken}')
            .expectStatus(200)
    });
}

module.exports.getUserData_401 = function() {
    it('GET /update-user-data (fail because no AREA cookie)', async () => {
        await pactum.spec()
            .get('http://localhost:8079/api/v3/spec1al/t3st42/get-user-data')
            .expectStatus(401)
    });
}
//#endregion


// module.exports. = function() {
//     
// }