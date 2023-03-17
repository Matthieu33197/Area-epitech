const argHandler = require('../../tools/argHandler');
const {fetcher} = require('../../controllers/api_access/apiCaller');

//temperature
function overXTemperature(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const temperature = argHandler.getArg(actionArgs, "temperature");
    const city = argHandler.getArg(actionArgs, "city");
    const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4fafe53c81fb82a6c557d25b46e2d2be&units=metric";
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, URL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((weather) => {
        if (isSuccess && weather && weather.main.temp && weather.main.temp >= temperature && weather.main.feels_like && weather.main.humidity && weather.wind.speed) {
            argHandler.changeArg(reactionArgs, "text", "The current temperature is above your threshold of " + temperature + "°C, it's " + weather.main.temp + "°C, but it feels like " + weather.main.feels_like + "°C, the humidity is " + weather.main.humidity + "% and the wind speed is " + weather.wind.speed + "km/h.");
            callback(reactionArgs);
        }
    });
}

//below X
function belowXTemperature(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const temperature = argHandler.getArg(actionArgs, "temperature");
    const city = argHandler.getArg(actionArgs, "city");
    const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4fafe53c81fb82a6c557d25b46e2d2be&units=metric";
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, URL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((weather) => {
        if (isSuccess && weather && weather.main.temp && weather.main.temp <= temperature && weather.main.feels_like && weather.main.humidity && weather.wind.speed) {
            argHandler.changeArg(reactionArgs, "text", "The current temperature is below your threshold of " + temperature + "°C, it's " + weather.main.temp + "°C, but it feels like " + weather.main.feels_like + "°C, the humidity is " + weather.main.humidity + "% and the wind speed is " + weather.wind.speed + "km/h.");
            callback(reactionArgs);
        }
    });
}

//humidity (over/below)
function overXHumidity(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const humidity = argHandler.getArg(actionArgs, "humidity");
    const city = argHandler.getArg(actionArgs, "city");
    const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4fafe53c81fb82a6c557d25b46e2d2be&units=metric";
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, URL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((weather) => {
        if (isSuccess && weather && weather.main.humidity && weather.main.humidity >= humidity && weather.main.temp && weather.main.feels_like) {
            argHandler.changeArg(reactionArgs, "text", "The current humidity is above your threshold of " + humidity + "%, it's " + weather.main.humidity + "%, the current temperature is " + weather.main.temp + "°C, but it feels like " + weather.main.feels_like + "°C.");
            callback(reactionArgs);
        }
    });
}

function belowXHumidity(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const humidity = argHandler.getArg(actionArgs, "humidity");
    const city = argHandler.getArg(actionArgs, "city");
    const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4fafe53c81fb82a6c557d25b46e2d2be&units=metric";
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, URL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((weather) => {
        if (isSuccess && weather && weather.main.humidity && weather.main.humidity <= humidity && weather.main.temp && weather.main.feels_like) {
            argHandler.changeArg(reactionArgs, "text", "The current humidity is below your threshold of " + humidity + "%, it's " + weather.main.humidity + "%, the current temperature is " + weather.main.temp + "°C, but it feels like " + weather.main.feels_like + "°C.");
            callback(reactionArgs);
        }
    });
}


//vissibility
function overXVisibility(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const visibility = argHandler.getArg(actionArgs, "visibility");
    const city = argHandler.getArg(actionArgs, "city");
    const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4fafe53c81fb82a6c557d25b46e2d2be&units=metric";
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, URL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((weather) => {
        if (isSuccess && weather && weather.visibility && weather.visibility >= visibility && weather.main.temp && weather.main.feels_like) {
            argHandler.changeArg(reactionArgs, "text", "The current visibility is above your threshold of " + visibility + "km, it's " + weather.visibility + "km, the current temperature is " + weather.main.temp + "°C, but it feels like " + weather.main.feels_like + "°C.");
            callback(reactionArgs);
        }
    });
}

function belowXVisibility(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const visibility = argHandler.getArg(actionArgs, "visibility");
    const city = argHandler.getArg(actionArgs, "city");
    const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4fafe53c81fb82a6c557d25b46e2d2be&units=metric";
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, URL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((weather) => {
        if (isSuccess && weather && weather.visibility && weather.visibility <= visibility && weather.main.temp && weather.main.feels_like) {
            argHandler.changeArg(reactionArgs, "text", "The current visibility is below your threshold of " + visibility + "km, it's " + weather.visibility + "km, the current temperature is " + weather.main.temp + "°C, but it feels like " + weather.main.feels_like + "°C.");
            callback(reactionArgs);
        }
    });
}

//wind speed
function overXWindSpeed(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const windSpeed = argHandler.getArg(actionArgs, "windSpeed");
    const city = argHandler.getArg(actionArgs, "city");
    const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4fafe53c81fb82a6c557d25b46e2d2be&units=metric";
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, URL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((weather) => {
        if (isSuccess && weather && weather.wind.speed && weather.wind.speed >= windSpeed && weather.main.temp && weather.main.feels_like) {
            argHandler.changeArg(reactionArgs, "text", "The current speed of the wind is above your threshold of " + windSpeed + "km/h, it's " + weather.wind.speed + "km/h, the current temperature is " + weather.main.temp + "°C, but it feels like " + weather.main.feels_like + "°C.");
            callback(reactionArgs);
        }
    });
}

function belowXWindSpeed(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const windSpeed = argHandler.getArg(actionArgs, "windSpeed");
    const city = argHandler.getArg(actionArgs, "city");
    const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4fafe53c81fb82a6c557d25b46e2d2be&units=metric";
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetcher(options, URL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((weather) => {
        if (isSuccess && weather && weather.wind.speed && weather.wind.speed <= windSpeed && weather.main.temp && weather.main.feels_like) {
            argHandler.changeArg(reactionArgs, "text", "The current speed of the wind is below your threshold of " + windSpeed + "km/h, it's " + weather.wind.speed + "km/h, the current temperature is " + weather.main.temp + "°C, but it feels like " + weather.main.feels_like + "°C.");
            callback(reactionArgs);
        }
    });
}

//At X(Date or worldtimeapi) send weather broadcast


module.exports.overXTemperature = overXTemperature;
module.exports.belowXTemperature = belowXTemperature;
module.exports.overXHumidity = overXHumidity;
module.exports.belowXHumidity = belowXHumidity;
module.exports.overXVisibility = overXVisibility;
module.exports.belowXVisibility = belowXVisibility;
module.exports.overXWindSpeed = overXWindSpeed;
module.exports.belowXWindSpeed = belowXWindSpeed;



const weatherInfo = new Map();

weatherInfo.set("[Weather] overXTemperature", {
    name: "[Weather] overXTemperature",
    description: "Give information if the current temperature (°C) is above your threshold.",
    args: [
        {city: "the city you wish to monitor."},
        {temperature: "the temperature (°C) threshold you wish to use."}
    ]
});

weatherInfo.set("[Weather] belowXTemperature", {
    name: "[Weather] belowXTemperature",
    description: "Give information if the current temperature (°C) is below your threshold.",
    args: [
        {city: "the city you wish to monitor."},
        {temperature: "the temperature (°C) threshold you wish to use."}
    ]
});

weatherInfo.set("[Weather] overXHumidity", {
    name: "[Weather] overXHumidity",
    description: "Give information if the current humidity (%) is above your threshold.",
    args: [
        {city: "the city you wish to monitor."},
        {humidity: "the humidity (%) threshold you wish to use."}
    ]
});

weatherInfo.set("[Weather] belowXHumidity", {
    name: "[Weather] belowXHumidity",
    description: "Give information if the current humidity (%) is below your threshold.",
    args: [
        {city: "the city you wish to monitor."},
        {humidity: "the humidity (%) threshold you wish to use."}
    ]
});

weatherInfo.set("[Weather] overXVisibility", {
    name: "[Weather] overXVisibility",
    description: "Give information if the current visibility (km) is above your threshold.",
    args: [
        {city: "the city you wish to monitor."},
        {visibility: "the visibility (km) threshold you wish to use."}
    ]
});

weatherInfo.set("[Weather] belowXVisibility", {
    name: "[Weather] belowXVisibility",
    description: "Give information if the current visibility (km) is below your threshold.",
    args: [
        {city: "the city you wish to monitor."},
        {visibility: "the visibility (km) threshold you wish to use."}
    ]
});

weatherInfo.set("[Weather] overXWindSpeed", {
    name: "[Weather] overXWindSpeed",
    description: "Give information if the current speed of the wind (km/h) is above your threshold.",
    args: [
        {city: "the city you wish to monitor."},
        {windSpeed: "the speed (km/h) threshold you wish to use."}
    ]
});

weatherInfo.set("[Weather] belowXWindSpeed", {
    name: "[Weather] belowXWindSpeed",
    description: "Give information if the current speed of the wind (km/h) is below your threshold.",
    args: [
        {city: "the city you wish to monitor."},
        {windSpeed: "the speed (km/h) threshold you wish to use."}
    ]
});

module.exports.weatherInfo = weatherInfo;