const main = require('../../main');

async function updateUserOauth2(authToken, body, disableAt, acstoken, rfstoken) { //--//
    const exApi = await main.prisma.eX_API.upsert({
        where: {
            service_userToken: {
                service: body.service,
                userToken: authToken,
            }
        },
        update: {
            service: body.service,
            token: body.token,
            disableAt: disableAt,
            acstoken: acstoken,
            rfstoken: rfstoken,
            is_mobile: body.mobile,
        },
        create: {
            service: body.service,
            token: body.token,
            disableAt: disableAt,
            acstoken: acstoken,
            rfstoken: rfstoken,
            is_mobile: body.mobile,
            userToken: authToken,
        },
        select: {
            id: true,
        }
    })
    return exApi.id;
}

async function findUniqueApiTokenSimple(token, type) {
    const user = await main.prisma.eX_API.findUnique({
        where: {
            service_userToken: {
                service: type,
                userToken: token,
            }
        },
        select: {
            disableAt: true,
            acstoken: true,
            rfstoken: true,
            is_mobile: true,
        }
    })
    return user;
}

async function updateApiAccessToken(type, token, acstoken, rfstoken, disableAt) {
    const user = await main.prisma.eX_API.update({
        where: {
            service_userToken: {
                service: type,
                userToken: token,
            }
        },
        data: {
            acstoken: acstoken,
            rfstoken: rfstoken,
            disableAt: disableAt,
        }
    });
    return user;
}

module.exports.updateUserOauth2 = updateUserOauth2;
module.exports.findUniqueApiTokenSimple = findUniqueApiTokenSimple;
module.exports.updateApiAccessToken = updateApiAccessToken;