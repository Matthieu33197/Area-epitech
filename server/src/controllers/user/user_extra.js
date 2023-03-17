const {oauth2Map} = require('../api_access/apiMaps');
const user_prisma = require('../../db_management/user/db_user');
const {googleGetAcessToken, googleUserInfo} = require('../api_access/google');
const {updateUserOauth2} = require('../../db_management/api_access/db_api_access');
const {findJob, deleteJob} = require('../../db_management/job/db_job');
const {deleteToadJob, removeActionArg, removeReactionArg} = require('../job/job_extra');
const { Service } = require('@prisma/client')

async function getGoogle(token)
{
    var tokens = null;
    var is_mobile = false;

    if (token.googleToken != undefined) {
        tokens = await googleGetAcessToken(token.googleToken);
    }
    else if (token.access_token != undefined && token.refresh_token != undefined) {
        tokens = {access_token: token.access_token, refresh_token: token.refresh_token, expires_in: 2500, id_token: ""};
        is_mobile = true;
    }
    if (tokens && tokens.access_token) {
        const info = await googleUserInfo(tokens.access_token);
        if (info) {
            const user = await user_prisma.findUniqueAuthenticate({email: info.email});
            if (user && user.token) {
                console.log("Google authenticate");
                const disableAt = (Date.now() + ((tokens.expires_in - 200) * 1000));
                const tmpBody = {service: "GOOGLE", token: tokens.id_token, is_mobile: false};
                await updateUserOauth2(user.token, tmpBody, disableAt, tokens.access_token, tokens.refresh_token);
                return {type: "authenticate", info: info, user};
            }
            else {
                console.log("Google register");
                return {type: "register", tokens: tokens, info: info};
            }
        }
        return null;
    }
    return null;
}

async function handleGoogleRegisterOauth(token, data)
{
    let isSuccess = true;

    try {
        const disableAt = (Date.now() + ((data.expires_in - 200) * 1000));
        const tmpBody = {service: "GOOGLE", token: data.id_token, is_mobile: false};
        const oauth2Id = await updateUserOauth2(token, tmpBody, disableAt, data.access_token, data.refresh_token);
        await user_prisma.updateUserServices(token, tmpBody, oauth2Id);
    }
    catch (error) {
        console.log(error);
        isSuccess = false;
    }
    finally {
        return isSuccess;
    }
}

async function oauth2Handler(cookie, body) {
    let isSuccess = true;
    let oauth2Id = null;

    try {
        if (body.token && body.mobile != undefined) {
            const data = await oauth2Map.get(body.service)(body.token, body.mobile);
            if (data) {
                const disableAt = (Date.now() + ((data.expires_in - 200) * 1000));
                oauth2Id = await updateUserOauth2(cookie, body, disableAt, data.access_token, data.refresh_token);
            }
            else {
                isSuccess = false;
            }
        }
        else {
            isSuccess = false;
        }
    }
    catch (error) {
        console.log(error);
        isSuccess = false;
    }
    finally {
        return isSuccess ? oauth2Id : isSuccess;
    }
}

async function deleteService(cookie, body) {
    let isSuccess = true;

    try {
        const oauth = await user_prisma.getUniqueUserServiceOauth(cookie, body);
        const jobs = await findJob(cookie, body)

        for (const jobIndex in jobs) {
            deleteToadJob(jobs[jobIndex].jobToken);
            await removeActionArg(jobs[jobIndex].jobToken);
            await removeReactionArg(jobs[jobIndex].jobToken);
            await deleteJob(cookie, jobs[jobIndex].jobToken);
        }
        if (oauth && oauth.oauth != -1) {
            await user_prisma.deleteUserOauth(cookie, body);
        }
        if (oauth != undefined) {
            await user_prisma.deleteUserServices(cookie, body);
        }
        else {
            isSuccess = false;
        }
    }
    catch (error) {
        console.log(error);
        isSuccess = false;
    }
    finally {
        return isSuccess;
    }
}

async function updateUserServices(cookie, body) {
    let isSuccess = true;

    try {
        if (body.subscribe) {
            if (oauth2Map.get(body.service)) {
                const data = await oauth2Handler(cookie, body);

                if (data != null) {
                    await user_prisma.updateUserServices(cookie, body, data)
                }
                else {
                    isSuccess = false;
                }
            }
            else {
                await user_prisma.updateUserServices(cookie, body, null);
            }
        }
        else {
            isSuccess = await deleteService(cookie, body) ? isSuccess : false;
        }
    }
    catch (error) {
        console.log(error);
        isSuccess = false;
    }
    finally {
        return isSuccess;
    }
}

async function deleteAccount(cookie, body) {
    let isSuccess = true;

    try {
        const info = await user_prisma.findUniqueAccount(cookie);

        if (info != undefined && info.password == body.password) {
            for (const service in Service) {
                body.service = service;
                await deleteService(cookie, body);
            }
            await user_prisma.deleteAccount(cookie, body);
        }
        else {
            isSuccess = false;
        }
    }
    catch (error) {
        console.log(error);
        isSuccess = false;
    }
    finally {
        return isSuccess;
    }
}

module.exports.getGoogle = getGoogle;
module.exports.handleGoogleRegisterOauth = handleGoogleRegisterOauth;
module.exports.updateUserServices = updateUserServices;
module.exports.deleteAccount = deleteAccount;