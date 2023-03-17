const reddit = require('./reddit');
const google = require('./google');

const oauth2Map = new Map();

oauth2Map.set("REDDIT", reddit.redditGetAcessToken);
oauth2Map.set("GOOGLE", google.googleGetAcessToken);

module.exports.oauth2Map = oauth2Map;

const oauth2RefreshMap = new Map();

oauth2RefreshMap.set("REDDIT", reddit.redditRefreshAcessToken);
oauth2RefreshMap.set("GOOGLE", google.googleRefreshAcessToken);

module.exports.oauth2RefreshMap = oauth2RefreshMap;