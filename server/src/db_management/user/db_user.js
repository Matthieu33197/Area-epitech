const main = require('../../main');

// function convertInt(x, base) {
//     const parsed = parseInt(x, base);

//     if (isNaN(parsed)) {
//         return 0;
//     }
//     return parsed;
// }

async function createUser(body) {
    const user = await main.prisma.user.create({
        data: {
            username: body.username,
            email: body.email,
            password: body.password,
            name: body.name,
            lstName: body.lstName,
        },
        select: {
            token: true,
        },
    });
    return user;
}

async function findUniqueAuthenticate(body) {
    const user = await main.prisma.user.findUnique({
        where: {
            email: body.email,
        },
        select: {
            password: true,
            token: true,
        },
    });
    return user;
}

async function findUniqueAccount(authToken) {
    const user = await main.prisma.user.findUnique({
        where: {
            token: authToken,
        },
    });
    return user;
}

async function deleteAccount(authToken, body) {
    const user = await main.prisma.user.delete({
        where: {
            token: authToken,
        },
    });
    return user;
}

async function updateUserPassword(authToken, body) {
    const info = await findUniqueAccount(authToken);

    if (info != undefined && info.password == body.oldPassword) {
        const user = await main.prisma.user.update({
            where: {
                token: authToken,
            },
            data: {
                password: body.newPassword,
            },
        });
        return user;
    }
    return undefined;
}

async function updateUserServices(authToken, body, oauth) {
    const user = await main.prisma.user.update({
        where: {
            token: authToken,
        },
        data: {
            services: {
                upsert: {
                    create: {
                        service: body.service,
                        oauth: oauth != null ? oauth : -1
                    },
                    update: {
                        oauth: oauth != null ? oauth : -1
                    },
                    where: {
                        service_userToken: {
                            service: body.service,
                            userToken: authToken,
                        }
                    },
                }
            }
        }
    })
    return user;
}

async function deleteUserServices(authToken, body) {
    const user = await main.prisma.user.update({
        where: {
            token: authToken,
        },
        data: {
            services: {
                delete: {
                    service_userToken: {
                        service: body.service,
                        userToken: authToken,
                    }
                }
            }
        }
    })
    return user;
}

async function getUserServices(authToken) {
    const user = await main.prisma.user.findUnique({
        where: {
            token: authToken,
        },
        select: {
            services : {
                select: {
                    service: true,
                },
            },
        },
    });
    return user.services;
}

async function getUniqueUserServiceOauth(authToken, body) {
    const service = await main.prisma.services.findUnique({
        where: {
            service_userToken: {
                service: body.service,
                userToken: authToken,
            }
        },
        select: {
            oauth: true,
        },
    })
    return service;
}

async function deleteUserOauth(authToken, body) {
    await main.prisma.eX_API.delete({
        where: {
            service_userToken: {
                service: body.service.toUpperCase(),
                userToken: authToken,
            }
        },
    })
}

async function updateUserData(authToken, body) {
    const user = await main.prisma.user.update({
        where: {
            token: authToken,
        },
        data: {
            name: body.name,
            lstName: body.lstName,
            avatar: body.avatar,
        },
    });
    return user;
}

async function getUserData(authToken) {
    const user = await main.prisma.user.findUnique({
        where: {
            token: authToken,
        },
        select: {
            username: true,
            email: true,
            name: true,
            lstName: true,
            avatar: true,
        },
    });
    return user;
}

// async function goAdmin(authToken) {
//     const user = await main.prisma.user.update({
//         where: {
//             token: authToken,
//         },
//         data: {
//             role: 'ADMIN',
//         },
//     });
//     return user;
// }

// module.exports.convertInt = convertInt;
module.exports.createUser = createUser;
module.exports.findUniqueAuthenticate = findUniqueAuthenticate;
module.exports.findUniqueAccount = findUniqueAccount;
module.exports.deleteAccount = deleteAccount;
module.exports.updateUserPassword = updateUserPassword;
module.exports.updateUserServices = updateUserServices;
module.exports.deleteUserServices = deleteUserServices;
module.exports.getUserServices = getUserServices;
module.exports.getUniqueUserServiceOauth = getUniqueUserServiceOauth;
module.exports.deleteUserOauth = deleteUserOauth;
module.exports.updateUserData = updateUserData;
module.exports.getUserData = getUserData;
// module.exports.goAdmin = goAdmin;