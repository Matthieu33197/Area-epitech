const user_prisma = require('../../db_management/user/db_user');
const user_extra = require('./user_extra');
const {infoActions} = require('../../area/actions');
const {infoReactions} = require('../../area/reactions');
const {log} = require('../../tools/logger');
const {Service} = require('@prisma/client');
const {iconMap} = require('../general/general');

const register = (req, res) => {
    let isSuccess = true;

    user_prisma.createUser(req.body)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
        log.warn({register: {status: false}, req: req, err: e});
    })
    .then((user) => {
        log.info({register: {status: isSuccess}, req: req});
        if (isSuccess){
            console.log('Register SUCESSFUL');
            res.status(200).cookie('AREA', user.token, {sameSite: 'none', secure: true, maxAge: 24*60*60*1000}).json({
                success: true,
            });
        }
        else {
            console.log('Register FAIL');
            res.status(401).json({
                success: false,
            });
        }
    });

    console.log('Register');
    console.log('Got body:', req.body);
};

const authenticate = (req, res) => {
    let isSuccess = true;

    user_prisma.findUniqueAuthenticate(req.body)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
        log.warn({authenticate: {status: false}, req: req, err: e});
    })
    .then((user) => {
        log.info({authenticate: {status: (isSuccess && user != undefined && req.body.password == user.password)}, req: req});
        if (isSuccess && user && req.body.password == user.password){
            console.log('Authenticate SUCESSFUL');
            res.status(200).cookie('AREA', user.token, {sameSite: 'none', secure: true, maxAge: 24*60*60*1000}).json({
                success: true,
            });
        }
        else {
            console.log('Authenticate FAIL');
            res.status(401).json({
                success: false,
            });
        }
    });

    console.log('authenticate');
    console.log('Got body:', req.body);
};

const googleUserHandler = (req, res) => {
    let isSuccess = true;
    let isSuccess2 = true;

    user_extra.getGoogle(req.body)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((data) => {
        if (isSuccess && data && data.type == "register") { // register
            const tmpBody = {username: data.info.email, email: data.info.email, password: data.info.id, name: data.info.given_name, lstName: data.info.family_name}
            user_prisma.createUser(tmpBody)
            .catch((e) => {
                isSuccess2 = false;
                console.log(e);
                log.warn({googleUserHandler_register: {status: false}, req: req, err: e});
            })
            .then((user) => {

                let isSuccess3 = true;
                log.info({googleUserHandler_register: {status: isSuccess2}, req: req});
                if (isSuccess2) {
                    user_extra.handleGoogleRegisterOauth(user.token, data.tokens)
                    .catch((e) => {
                        isSuccess3 = false;
                        console.log(e);
                        log.warn({googleUserHandler_register_oauth: {status: isSuccess3, case: "ADD"}, req: req, err: e});
                    })
                    .then((is_good) => {
                        log.info({googleUserHandler_register_oauth: {status: isSuccess3, case: "ADD"}, req: req});
                        if (isSuccess3 && is_good) {
                            console.log('handleGoogleRegisterOauth SUCESSFUL');
                            res.status(200).cookie('AREA', user.token, {sameSite: 'none', secure: true, maxAge: 24*60*60*1000}).json({
                                success: true,
                            });
                        }
                        else {
                            console.log('handleGoogleRegisterOauth FAIL');
                            res.status(401).json({
                                success: false,
                            });
                        }
                    });
                }
                else {
                    console.log('Google Register FAIL');
                    res.status(401).json({
                        success: false,
                    });
                }
            });
        }

        else if (isSuccess && data && data.type == "authenticate") { // authenticate
            log.info({googleUserHandler_authenticate: {status: (data != undefined && data.info != undefined  && data.user != undefined &&
                                                                data.info.id == data.user.password)}, req: req});
            if (data != undefined && data.info != undefined  && data.user != undefined && data.info.id == data.user.password){
                console.log('Google Authenticate SUCESSFUL');
                res.status(200).cookie('AREA', data.user.token, {sameSite: 'none', secure: true, maxAge: 24*60*60*1000}).json({
                    success: true,
                });
            }
            else {
                console.log('Google Authenticate FAIL');
                res.status(401).json({
                    success: false,
                });
            }
        }

        else { // nop
            console.log('googleUserHandler unknown error');
            res.status(401).json({
                success: false,
            });
        }
    });

    console.log('googleUserHandler');
    console.log('Got body:', req.body);
};

const unregister = (req, res) => {
    let isSuccess = true;

    user_extra.deleteAccount(req.cookies.AREA, req.body)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
        log.warn({unregister: {status: false}, req: req, err: e});
    })
    .then((user) => {
        log.info({unregister: {status: (isSuccess && user != undefined)}, req: req});
        if (isSuccess && user){
            console.log('Unregister SUCESSFUL');
            res.status(200).clearCookie('AREA').json({
                success: true,
            });
        }
        else {
            console.log('Unregister FAIL');
            res.status(401).json({
                success: false,
            });
        }
    });

    console.log('unregister');
    console.log('Got body:', req.body);
};

const updateUserPassword = (req, res) => {
    let isSuccess = true;

    user_prisma.updateUserPassword(req.cookies.AREA, req.body)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
        log.warn({updateUserPassword: {status: false}, req: req, err: e});
    })
    .then((user) => {
        log.info({updateUserPassword: {status: (isSuccess && user != undefined)}, req: req});
        if (isSuccess && user){
            console.log('updateUserPassword SUCESSFUL');
            res.status(200).json({
                success: true,
            });
        }
        else {
            console.log('updateUserPassword FAIL');
            res.status(401).json({
                success: false,
            });
        }
    });

    console.log('updateUserPassword');
    console.log('Got body:', req.body);
};

const updateUserServices = (req, res) => {
    let isSuccess = true;

    user_extra.updateUserServices(req.cookies.AREA, req.body)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
        log.warn({updateUserServices: {status: isSuccess, case: (req.body.subscribe ? "ADD" : "REMOVE")}, req: req, err: e});
    })
    .then((user) => {
        log.info({updateUserServices: {status: isSuccess, case: (req.body.subscribe ? "ADD" : "REMOVE")}, req: req});
        if (isSuccess && user){
            console.log('updateUserServices SUCESSFUL');
            res.status(200).json({
                success: true,
            });
        }
        else {
            console.log('updateUserServices FAIL');
            res.status(401).json({
                success: false,
            });
        }
    });

    console.log('updateUserServices');
    console.log('Got body:', req.body);
};

const getUserServices = (req, res) => {
    let isSuccess = true;
    var actions = null;
    var reactions = null;

    user_prisma.getUserServices(req.cookies.AREA)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
        log.warn({getUserServices: {status: false}, req: req, err: e});
    })
    .then((user) => {
        log.info({getUserServices: {status: isSuccess}, req: req});
        if (isSuccess){
            console.log('getUserServices SUCESSFUL');
            var userServices = {}

            for (var services in user) {
                var tmpActions = [];
                var tmpReactions = [];
                actions = infoActions.get(user[services].service);
                reactions = infoReactions.get(user[services].service);
                if (actions) {
                    let infoActionKeys = Array.from(actions.actions.keys());
                    for (const i in infoActionKeys) {
                        tmpActions.push(actions.actions.get(infoActionKeys[i]));
                    }
                }
                if (reactions) {
                    let infoReactionKeys = Array.from(reactions.reactions.keys());
                    for (const i in infoReactionKeys) {
                        tmpReactions.push(reactions.reactions.get(infoReactionKeys[i]));
                    }
                }
                userServices[user[services].service] = {actions: tmpActions, reactions: tmpReactions}
            }
            res.status(200).json({
                success: true,
                services: userServices
            });
        }
        else {
            console.log('getUserServices FAIL');
            res.status(401).json({
                success: false,
            });
        }
    });

    console.log('getUserServices');
    console.log('Got body:', req.body);
};

const getUserSubServices = (req, res) => {
    let isSuccess = true;

    user_prisma.getUserServices(req.cookies.AREA)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
        log.warn({getUserSubServices: {status: false}, req: req, err: e});
    })
    .then((user) => {
        log.info({getUserSubServices: {status: isSuccess}, req: req});
        if (isSuccess){
            console.log('getUserSubServices SUCESSFUL');
            var rsl = [];

            for (const service in Service) {
                rsl.push({service: service, logo: iconMap.get(service).logo, subscribed: false});
                for (const userServiceNb in user) {
                    if (service == user[userServiceNb].service) {
                        rsl[(rsl.length - 1)].subscribed = true;
                    }
                }
            }
            res.status(200).json({
                success: true,
                services: rsl,
            });
        }
        else {
            console.log('getUserSubServices FAIL');
            res.status(401).json({
                success: false,
            });
        }
    });

    console.log('getUserSubServices');
    console.log('Got body:', req.body);
};

const updateUserData = (req, res) => {
    let isSuccess = true;

    user_prisma.updateUserData(req.cookies.AREA, req.body)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
        log.warn({updateUserData: {status: false}, req: req, err: e});
    })
    .then((user) => {
        log.info({updateUserData: {status: isSuccess}, req: req});
        if (isSuccess){
            console.log('updateUserData SUCESSFUL');
            res.status(200).json({
                success: true,
                user,
            });
        }
        else {
            console.log('updateUserData FAIL');
            res.status(401).json({
                success: false,
            });
        }
    });

    console.log('updateUserData');
    console.log('Got body:', req.body);
};

const getUserData = (req, res) => {
    let isSuccess = true;

    user_prisma.getUserData(req.cookies.AREA)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
        log.warn({getUserData: {status: false}, req: req, err: e});
    })
    .then((user) => {
        log.info({getUserData: {status: isSuccess}, req: req});
        if (isSuccess){
            console.log('getUserData SUCESSFUL');
            res.status(200).json({
                success: true,
                user,
            });
        }
        else {
            console.log('getUserData FAIL');
            res.status(401).json({
                success: false,
            });
        }
    });
    console.log('get-user-data');
    console.log('Got body:', req.body);
};

module.exports.register = register;
module.exports.authenticate = authenticate;
module.exports.googleUserHandler = googleUserHandler;
module.exports.unregister = unregister;
module.exports.updateUserPassword = updateUserPassword;
module.exports.updateUserServices = updateUserServices;
module.exports.getUserServices = getUserServices;
module.exports.getUserSubServices = getUserSubServices;
module.exports.updateUserData = updateUserData;
module.exports.getUserData = getUserData;