const pactum = require('pactum');

module.exports.getServicesAvailable_200 = function() {
    it('GET /get-services-available (normal working)', async () => {
        await pactum.spec()
            .get('http://localhost:8079/api/v3/get-services-available')
            .expectStatus(200)
    });
}


// module.exports. = function() {
//     
// }