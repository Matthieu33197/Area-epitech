const {fetcher} = require('../../controllers/api_access/apiCaller');
const argHandler = require('../../tools/argHandler');
const fetch = require('node-fetch');
const {updateActionArg, updateReactionArg} = require("../../db_management/job/db_job");

function getNewsByCountry(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    var myHeaders = new fetch.Headers();
    myHeaders.append("Authorization", "Bearer b843f6f4fb97465f862f7da9dd78d56b");
    const options = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const country = argHandler.getArg(actionArgs, "country");
    const lastNews = argHandler.getArg(actionArgs, "lastTitle");
    const URL = "https://newsapi.org/v2/top-headlines?country=" + country;

    fetcher(options, URL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((news) => {
        if (isSuccess && news && news.status == "ok" && news.articles && news.articles.length >= 1 &&
                news.articles[0].title && news.articles[0].title != lastNews && news.articles[0].source.name &&
                news.articles[0].author && news.articles[0].description && news.articles[0].url) {
            argHandler.changeArg(actionArgs, "lastTitle", news.articles[0].title, {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
            argHandler.changeArg(reactionArgs, "text", "The latest news from " + country + " is from " + news.articles[0].source.name + ".\n It's titled: " + news.articles[0].title + ", by " + news.articles[0].author + ".\n description: " + news.articles[0].description + "\n link: " + news.articles[0].url);
            callback(reactionArgs);
        }
    });
};

function getNewsByCategory(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    var myHeaders = new fetch.Headers();
    myHeaders.append("Authorization", "Bearer b843f6f4fb97465f862f7da9dd78d56b");
    const options = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const category = argHandler.getArg(actionArgs, "category");
    const lastNews = argHandler.getArg(actionArgs, "lastTitle");
    const URL = "https://newsapi.org/v2/top-headlines?category=" + category;

    fetcher(options, URL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((news) => {
        if (isSuccess && news && news.status == "ok" && news.articles && news.articles.length >= 1 &&
                news.articles[0].title && news.articles[0].title != lastNews && news.articles[0].source.name &&
                news.articles[0].author && news.articles[0].description && news.articles[0].url) {
            argHandler.changeArg(actionArgs, "lastTitle", news.articles[0].title, {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg});
            argHandler.changeArg(reactionArgs, "text", "The latest news from " + category + " is from " + news.articles[0].source.name + ".\n It's titled: " + news.articles[0].title + ", by " + news.articles[0].author + ".\n description: " + news.articles[0].description + "\n link: " + news.articles[0].url);
            callback(reactionArgs);
        }
    });
};

module.exports.getNewsByCountry = getNewsByCountry;
module.exports.getNewsByCategory = getNewsByCategory;



const newsInfo = new Map();

newsInfo.set("[News] getNewsByCountry", {
    name: "[News] getNewsByCountry",
    description: "Give the latest news from a given country.",
    args: [
        {country: "The country from wich you wish to get the latest new.(The following values are possible: ae, ar, at, au, be, bg, br, ca, ch, cn, co, cu, cz, de, eg, fr, gb, gr, hk, hu, id, ie, il, in, it, jp, kr, lt, lv, ma, mx, my, ng, nl, no, nz, ph, pl, pt, ro, rs, ru, sa, se, sg, si, sk, th, tr, tw, ua, us, ve, za)"}
    ]
});

newsInfo.set("[News] getNewsByCategory", {
    name: "[News] getNewsByCategory",
    description: "Give the latest news from a given category.",
    args: [
        {category: "The category from wich you wish to get the latest new.(The following values are possible: business, entertainment, general, health, science, sports, technology)"}
    ]
});

module.exports.newsInfo = newsInfo;