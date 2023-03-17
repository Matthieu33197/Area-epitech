const {oauth2RefreshMap} = require('./apiMaps');
const db_api_access = require('../../db_management/api_access/db_api_access');


const apiTokens = new Map();

async function apiGetter(userToken, type)
{
    let isSuccess = true;

    if (apiTokens.get(userToken) != undefined && apiTokens.get(userToken)[type] != undefined) { // token already in map
        console.log("token already in map");
        const data = apiTokens.get(userToken)[type];
        if (data.expires_in <= Date.now()) { // refresh token
            console.log("refresh token");
            try {
                var refreshData = await oauth2RefreshMap.get(type)(data);
            }
            catch (error) {
                console.log(error);
                isSuccess = false
            }
            finally {
                if (isSuccess && refreshData) {
                    console.log("refresh token DONE");
                    refreshData.expires_in = (Date.now() + ((refreshData.expires_in - 200) * 1000));
                    await db_api_access.updateApiAccessToken(type, userToken, refreshData.access_token, refreshData.refresh_token, refreshData.expires_in);
                    apiTokens.set(userToken, {[type]: refreshData});
                    return refreshData;
                }
                else {
                    console.log("FAIL");
                    return null;
                }
            }
        }
        return data; //no need to refresh token.
    }
    else {
        console.log("token NOT in map");
        try {
            const apiToken = await db_api_access.findUniqueApiTokenSimple(userToken, type);
            if (apiToken.disableAt <= Date.now()) { // disableAt because of the DB.
                console.log("refresh token 2");
                var refreshData = await oauth2RefreshMap.get(type)(apiToken);
                refreshData.is_mobile = apiToken.is_mobile;
                refreshData.expires_in = (Date.now() + ((refreshData.expires_in - 200) * 1000));
                await db_api_access.updateApiAccessToken(type, userToken, refreshData.access_token, refreshData.refresh_token, refreshData.expires_in);
                apiTokens.set(userToken, {[type]: refreshData});
                console.log("refresh token 2 DONE");
            }
            else {
                apiTokens.set(userToken, {[type]: {access_token: apiToken.acstoken, expires_in: apiToken.disableAt, refresh_token: apiToken.rfstoken, is_mobile: apiToken.is_mobile}});
            }
        }
        catch (error) {
            console.log(error);
            isSuccess = false
        }
        finally {
            if (isSuccess) {
                return apiTokens.get(userToken)[type];
            }
            else {
                console.log("FAIL");
                return null;
            }
        }
    }
}

module.exports.apiGetter = apiGetter;