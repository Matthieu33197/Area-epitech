const {apiCaller} = require('./apiCaller');
const fetch = require('node-fetch');
const utf8 = require('utf8');

async function googleGetAcessToken(token, is_mobile)
{
    // console.log("INSIDE googleGetAcessToken only for the web");
    if (is_mobile) {
        // return {access_token: token.access_token, refresh_token: token.refresh_token, expires_in: 2500, id_token: ""}
        return {access_token: token, refresh_token: "", expires_in: 2500, id_token: ""}
    }
    else {
        const basicAuth = "Basic " + Buffer.from(utf8.encode('810716893898-1rut2g2moomhua5h6tgnrq49nk3ijc3s.apps.googleusercontent.com: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')).toString('base64');
        var myHeaders = new fetch.Headers();
        var urlencoded = new URLSearchParams();

        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", basicAuth);
        urlencoded.append("grant_type", "authorization_code");
        urlencoded.append("code", token);
        urlencoded.append("redirect_uri", "http://localhost:8081/google_oauth2_callback");
        urlencoded.append("client_id", "810716893898-1rut2g2moomhua5h6tgnrq49nk3ijc3s.apps.googleusercontent.com");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        var URL = "https://oauth2.googleapis.com/token"
        return await apiCaller(requestOptions, URL);
    }
};

async function googleRefreshAcessToken(datas)
{
    // console.log("INSIDE googleRefreshAcessToken only for the web");
    if (is_mobile) {
        return null
    }
    else {
        const basicAuth = "Basic " + Buffer.from(utf8.encode('810716893898-1rut2g2moomhua5h6tgnrq49nk3ijc3s.apps.googleusercontent.com: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')).toString('base64');
        var myHeaders = new fetch.Headers();
        var urlencoded = new URLSearchParams();

        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", basicAuth);
        urlencoded.append("grant_type", "refresh_token");
        urlencoded.append("redirect_uri", "http://localhost:8081/google_oauth2_callback");
        urlencoded.append("client_id", "810716893898-1rut2g2moomhua5h6tgnrq49nk3ijc3s.apps.googleusercontent.com");
        urlencoded.append("refresh_token", (datas.refresh_token ? datas.refresh_token : datas.rfstoken));
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        var URL = "https://oauth2.googleapis.com/token"
        return await apiCaller(requestOptions, URL);
    }
};

async function googleUserInfo(access_token)
{
    // console.log("INSIDE getGoogleUserInfo only for the web");
    var myHeaders = new fetch.Headers();
    myHeaders.append("Authorization", "Bearer " + access_token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    var URL = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json"
    return await apiCaller(requestOptions, URL);
}

module.exports.googleGetAcessToken = googleGetAcessToken;
module.exports.googleRefreshAcessToken = googleRefreshAcessToken;
module.exports.googleUserInfo = googleUserInfo;