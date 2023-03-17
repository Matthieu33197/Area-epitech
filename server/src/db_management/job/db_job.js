const main = require('../../main');

async function updateJob(authToken, body, actionService, reactionService) {
    const user = await main.prisma.user.update({
        where: {
            token: authToken,
        },
        data: {
            job: {
                upsert: {
                    create: {
                        name: body.name,
                        actionService: actionService,
                        action: body.action,
                        reactionService: reactionService,
                        reaction: body.reaction,
                        interval: body.interval != 0 ? body.interval : 600,
                    },
                    update: {
                        name: body.name != '' ? body.name : undefined,
                        actionService: actionService,
                        action: body.action != '' ? body.action : undefined,
                        reactionService: reactionService,
                        reaction: body.reaction != '' ? body.reaction : undefined,
                        interval: body.interval != -1 ? body.interval : undefined,
                        is_stoped: false,
                    },
                    where: {
                        jobToken_userToken: {
                            jobToken: body.jobToken,
                            userToken: authToken,
                        }
                    },
                }
            }
        },
        select: {
            job: {
                select: {
                    jobToken: true,
                    name: true,
                    actionService: true,
                    action: true,
                    reactionService: true,
                    reaction: true,
                    interval: true,
                    is_stoped: true,
                }
            }
        }
    })
    return user.job;
}

async function findUniqueJob(jobToken) {
    const job = await main.prisma.job.findUnique({
        where: {
            jobToken: jobToken,
        },
        select: {
            jobToken: true,
            name: true,
            actionService: true,
            action: true,
            actionArg: {
                select: {
                    key: true,
                    value: true,
                },
            },
            reactionService: true,
            reaction: true,
            reactionArg: {
                select: {
                    key: true,
                    value: true,
                },
            },
            interval: true,
            is_stoped: true,
        }
    })
    return job;
}

async function updateActionArg(jobToken, key, value) {
    if (typeof(value) != 'string') {
        value = value.toString();
    }
    const user = await main.prisma.job.update({
        where: {
            jobToken: jobToken,
        },
        data: {
            actionArg: {
                upsert: {
                    create: {
                        key: key,
                        value: value
                    },
                    update: {
                        value: value != '' ? value : undefined,
                    },
                    where: {
                        key_jobToken: {
                            key: key,
                            jobToken: jobToken,
                        }
                    },
                }
            }
        },
    })
    return user;
}

async function updateReactionArg(jobToken, key, value) {
    const user = await main.prisma.job.update({
        where: {
            jobToken: jobToken,
        },
        data: {
            reactionArg: {
                upsert: {
                    create: {
                        key: key,
                        value: value
                    },
                    update: {
                        value: value != '' ? value : undefined,
                    },
                    where: {
                        key_jobToken: {
                            key: key,
                            jobToken: jobToken,
                        }
                    },
                }
            }
        },
    })
    return user;
}

async function deleteActionArgs(jobToken) {
    const user = await main.prisma.action_arg.deleteMany({
        where: {
            jobToken: jobToken,
        },
    })
    return user;
}

async function deleteReactionArgs(jobToken) {
    const user = await main.prisma.reaction_arg.deleteMany({
        where: {
            jobToken: jobToken,
        },
    })
    return user;
}

async function deleteJob(authToken, jobToken) {
    const user = await main.prisma.user.update({
        where: {
            token: authToken,
        },
        data: {
            job: {
                delete: {
                    jobToken_userToken: {
                        jobToken: jobToken,
                        userToken: authToken,
                    }
                }
            }
        }
    })
    return user;
}

function findJobByArg(body) {
    if (!body.name && !body.action && !body.reaction) { //search without any constrains.
        console.log("0");
        return {};
    }
    else if (body.name && !body.action && !body.reaction) { //search by name.
        console.log("1");
        return {
            name: {
                contains: body.name
            }
        };
    }
    else if (!body.name && body.action && !body.reaction) { //search by action.
        console.log("2");
        return {
            action: {
                contains: body.action,
            }
        };
    }
    else if (!body.name && !body.action && body.reaction) { //search by reaction.
        console.log("3");
        return {
            reaction: {
                contains: body.reaction,
            }
        };
    }
    else if (body.name && body.action && !body.reaction) { //search by name and action.
        console.log("4");
        return {
            name: {
                contains: body.name
            },
            action: {
                contains: body.action,
            }
        };
    }
    else if (body.name && !body.action && body.reaction) { //search by name and reaction.
        console.log("5");
        return {
            name: {
                contains: body.name
            },
            reaction: {
                contains: body.reaction,
            }
        };
    }
    else if (!body.name && body.action && body.reaction) { //search by action and reaction.
        console.log("6");
        return {
            action: {
                contains: body.action,
            },
            reaction: {
                contains: body.reaction,
            }
        };
    }
    else if (body.name && body.action && body.reaction) { //search by name, action and reaction.
        console.log("7");
        return {
            name: {
                contains: body.name
            },
            action: {
                contains: body.action,
            },
            reaction: {
                contains: body.reaction,
            }
        };
    }
    else if (body.service) { //search by service
        console.log("8");
        return {
            actionService: {
                contains: body.service.toUpperCase(),
            },
            reactionService: {
                contains: body.service.toUpperCase(),
            }
        };
    }
    return {}; // worst case scenario.
}

async function findJob(authToken, body) {
    const where = findJobByArg(body);

    const user = await main.prisma.user.findUnique({
        where: {
            token: authToken,
        },
        select: {
            job: {
                where: where,
                select: {
                    jobToken: true,
                    name: true,
                    actionService: true,
                    action: true,
                    actionArg: {
                        select: {
                            key: true,
                            value: true,
                        },
                    },
                    reactionService: true,
                    reaction: true,
                    reactionArg: {
                        select: {
                            key: true,
                            value: true,
                        },
                    },
                    interval: true,
                    is_stoped: true,
                }
            }
        }
    })
    return user.job;
}

async function stopJob(authToken, body) {
    const user = await main.prisma.user.update({
        where: {
            token: authToken,
        },
        data: {
            job: {
                update: {
                    where: {
                        jobToken: body.jobToken,
                    },
                    data: {
                        is_stoped: body.stop,
                    }
                }
            }
        }
    })
    return user;
}

async function getRelaunchJob() {
    const job = await main.prisma.job.findMany({
        where: {
            is_stoped: false,
        },
        select: {
            jobToken: true,
            action: true,
            actionArg: {
                select: {
                    key: true,
                    value: true,
                },
            },
            reaction: true,
            reactionArg: {
                select: {
                    key: true,
                    value: true,
                },
            },
            interval: true,
        }
    })
    return job;
}

module.exports.updateJob = updateJob;
module.exports.findUniqueJob = findUniqueJob;
module.exports.updateActionArg = updateActionArg;
module.exports.updateReactionArg = updateReactionArg;
module.exports.deleteActionArgs = deleteActionArgs;
module.exports.deleteReactionArgs = deleteReactionArgs;
module.exports.deleteJob = deleteJob;
module.exports.findJob = findJob;
module.exports.stopJob = stopJob;
module.exports.getRelaunchJob = getRelaunchJob;