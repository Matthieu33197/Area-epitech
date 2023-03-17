const pactum = require('pactum');

// module.exports.close_server_200 = function() {
//     it('POST /close-server', async () => {
//         await pactum.spec()
//             .post("http://localhost:8079/He_is_dead_Jim")
//             .withJson({
//                 password: 68179798
//             })
//             .expectStatus(200)
//     });
// }

module.exports.about = function() {
    it('GET /about', async () => {
        await pactum.spec()
            .get("http://localhost:8079/about")
            .expectStatus(200)
    });
}

module.exports.about_json = function() {
    it('GET /about', async () => {
        await pactum.spec()
            .get("http://localhost:8079/about.json")
            .expectStatus(200)
    });
}

module.exports.close_server_401 = function() {
    it('POST /close-server', async () => {
        await pactum.spec()
            .post("http://localhost:8079/He's_dead_Jim")
            .expectStatus(401)
    });
}

module.exports.check_bigInt_401 = function() {
    it('POST /check-bigInt', async () => {
        await pactum.spec()
            .post("http://localhost:8079/BIG_CHUNGUS")
            .expectStatus(401)
    });
}

// module.exports. = function() {
//     
// }