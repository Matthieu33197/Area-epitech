const {apiCaller} = require('./apiCaller');
const fetch = require('node-fetch');
const utf8 = require('utf8');

async function redditGetAcessToken(redditToken, is_mobile)
{
    const key = is_mobile ? '-N7geXrRgbc11UXfGCjsfQ:' : 'P_Pt6XOAB1LhUTVmFeSKMw:';
    const basicAuth = "Basic " + Buffer.from(utf8.encode(key)).toString('base64');
    var myHeaders = new fetch.Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", basicAuth);
    myHeaders.append("Cookie", "edgebucket=lgAI7iUeCBHpFvAvw7");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };
    var URL = "https://www.reddit.com/api/v1/access_token?grant_type=authorization_code&code=" + redditToken + (is_mobile ? '&redirect_uri=com.example.area://callback' : '&redirect_uri=http://localhost:8081/Account/ServicesSettings/callback')
    return await apiCaller(requestOptions, URL);
};

async function redditRefreshAcessToken(datas)
{
    const key = datas.is_mobile ? '-N7geXrRgbc11UXfGCjsfQ:' : 'P_Pt6XOAB1LhUTVmFeSKMw:';
    const basicAuth = "Basic " + Buffer.from(utf8.encode(key)).toString('base64');
    var myHeaders = new fetch.Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", basicAuth);
    myHeaders.append("Cookie", "edgebucket=lgAI7iUeCBHpFvAvw7");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };
    const rfsToken = datas.refresh_token ? datas.refresh_token : datas.rfstoken;
    var URL = "https://www.reddit.com/api/v1/access_token?grant_type=refresh_token&refresh_token=" + rfsToken + (datas.is_mobile ? '&redirect_uri=com.example.area://callback' : '&redirect_uri=http://localhost:8081/Account/ServicesSettings/callback')
    var data = await apiCaller(requestOptions, URL);
    return data;
};

module.exports.redditGetAcessToken = redditGetAcessToken;
module.exports.redditRefreshAcessToken = redditRefreshAcessToken;