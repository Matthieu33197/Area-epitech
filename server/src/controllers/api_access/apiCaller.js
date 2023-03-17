const fetch = require('node-fetch');

async function apiCaller(options, url)
{
    const response = await fetch(url, options);
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    else {
        const data = await response.json();
        return data;
    }
}

module.exports.apiCaller = apiCaller;
module.exports.fetcher = apiCaller;