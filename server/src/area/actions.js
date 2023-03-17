const youtube = require('./action/youtube');
const weather = require('./action/weather');
const twitch = require('./action/twitch');
const covid = require('./action/covid');
const random_api = require('./action/some_random_api');
const cat = require('./action/cat');
const chuck_norris_facts = require('./action/chuck_norris_facts');
const doggo = require('./action/doggo');
const fox = require('./action/fox');
const nasa = require('./action/nasa');
const poem = require('./action/poem');
const shiba = require('./action/shiba_inu');
const waifu = require('./action/waifu');
const news = require('./action/news');
const reddit = require('./action/reddit');

const actions = new Map();

actions.set("[Youtube] NewLike", youtube.NewLike);
actions.set("[Youtube] overXLike", youtube.overXLike);
actions.set("[Youtube] overXLikeAddY", youtube.overXLikeAddY);
actions.set("[Youtube] overXLikeTimesY", youtube.overXLikeTimesY);
actions.set("[Youtube] newView", youtube.newView);
actions.set("[Youtube] overXView", youtube.overXView);
actions.set("[Youtube] overXViewAddY", youtube.overXViewAddY);
actions.set("[Youtube] overXViewTimesY", youtube.overXViewTimesY);
actions.set("[Youtube] newVideos", youtube.newVideos);
actions.set("[Youtube] overXVideos", youtube.overXVideos);
actions.set("[Youtube] overXVideosAddY", youtube.overXVideosAddY);
actions.set("[Youtube] overXVideosTimesY", youtube.overXVideosTimesY);

actions.set("[Weather] overXTemperature", weather.overXTemperature);
actions.set("[Weather] belowXTemperature", weather.belowXTemperature);
actions.set("[Weather] overXHumidity", weather.overXHumidity);
actions.set("[Weather] belowXHumidity", weather.belowXHumidity);
actions.set("[Weather] overXVisibility", weather.overXVisibility);
actions.set("[Weather] belowXVisibility", weather.belowXVisibility);
actions.set("[Weather] overXWindSpeed", weather.overXWindSpeed);
actions.set("[Weather] belowXWindSpeed", weather.belowXWindSpeed);

actions.set("[Twitch] getStream", twitch.getStream);
actions.set("[Twitch] overXViewer", twitch.overXViewer);
actions.set("[Twitch] overXViewerAddY", twitch.overXViewerAddY);
actions.set("[Twitch] overXViewerTimesY", twitch.overXViewerTimesY);

actions.set("[Covid] getUpdatedInfo", covid.getUpdatedInfo);
actions.set("[Covid] getOverXActive", covid.getOverXActive);
actions.set("[Covid] getOverXCritical", covid.getOverXCritical);

actions.set("[Random_Api] getSomeRandomRedPanda", random_api.getSomeRandomRedPanda);
actions.set("[Random_Api] getSomeRandomRaccoon", random_api.getSomeRandomRaccoon);
actions.set("[Random_Api] getSomeRandomKangaroo", random_api.getSomeRandomKangaroo);
actions.set("[Random_Api] getSomeRandomKoala", random_api.getSomeRandomKoala);
actions.set("[Random_Api] getSomeRandomJoke", random_api.getSomeRandomJoke);
actions.set("[Random_Api] getSomeRandomAnimePat", random_api.getSomeRandomAnimePat);
actions.set("[Random_Api] getSomeRandomAnimeWink", random_api.getSomeRandomAnimeWink);
actions.set("[Random_Api] getSomeRandomAnimeHug", random_api.getSomeRandomAnimeHug);

actions.set("[Cat] getRandomCat", cat.getRandomCat);

actions.set("[Chuck_Norris] getRandomChuckNorrisFacts", chuck_norris_facts.getRandomChuckNorrisFacts);

actions.set("[Doggo] getRandomDog", doggo.getRandomDog);

actions.set("[Fox] getRandomFox", fox.getRandomFox);

actions.set("[NASA] getAPOD", nasa.getAPOD);

actions.set("[Poemist] getRandomPoem", poem.getRandomPoem); // error 429 ???

actions.set("[Shiba_Inu] getRandomShibaInu", shiba.getRandomShibaInu);

actions.set("[Waifu] getRandomWaifu", waifu.getRandomWaifu);

actions.set("[News] getNewsByCountry", news.getNewsByCountry);
actions.set("[News] getNewsByCategory", news.getNewsByCategory);

actions.set("[Reddit] newPrivateMessage", reddit.newPrivateMessage);

module.exports.actions = actions;



const infoActions = new Map();

infoActions.set("YOUTUBE", {name: "youtube", actions: youtube.youtubeInfo});
infoActions.set("WEATHER", {name: "weather", actions: weather.weatherInfo});
infoActions.set("TWITCH", {name: "twitch", actions: twitch.twitchInfo});
infoActions.set("COVID", {name: "covid", actions: covid.covidInfo});
infoActions.set("RANDOM_API", {name: "random_api", actions: random_api.someRandomInfo});
infoActions.set("CAT", {name: "cat", actions: cat.catInfo});
infoActions.set("CHUCK_NORRIS", {name: "chuck_norris", actions: chuck_norris_facts.chuckNorrisFactsInfo});
infoActions.set("DOGGO", {name: "doggo", actions: doggo.doggoInfo});
infoActions.set("FOX", {name: "fox", actions: fox.foxInfo});
infoActions.set("NASA", {name: "nasa", actions: nasa.nasaInfo});
infoActions.set("POEMIST", {name: "poemist", actions: poem.poemInfo});
infoActions.set("SHIBA_INU", {name: "shiba_inu", actions: shiba.shibaInuInfo});
infoActions.set("WAIFU", {name: "waifu", actions: waifu.waifuInfo});
infoActions.set("NEWS", {name: "news", actions: news.newsInfo});
infoActions.set("REDDIT", {name: "reddit", actions: reddit.redditInfo});

module.exports.infoActions = infoActions;