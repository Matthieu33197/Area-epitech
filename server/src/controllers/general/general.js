var fs = require('fs');
const {Service} = require('@prisma/client');

function base64_encode(file) {
    var bitmap = fs.readFileSync(file);

    return Buffer.from(bitmap).toString('base64');
}

const iconMap = new Map();

iconMap.set("DISCORD", {name: "DISCORD", oauth2: false, logo: base64_encode('./img/DISCORD.png')});
iconMap.set("YOUTUBE", {name: "YOUTUBE", oauth2: false, logo: base64_encode('./img/YOUTUBE.png')});
iconMap.set("GOOGLE", {name: "GOOGLE", oauth2: true, logo: base64_encode('./img/GOOGLE.png')});
iconMap.set("REDDIT", {name: "REDDIT", oauth2: true, logo: base64_encode('./img/REDDIT.png')});
iconMap.set("WEATHER", {name: "WEATHER", oauth2: false, logo: base64_encode('./img/WEATHER.png')});
iconMap.set("EMAIL", {name: "EMAIL", oauth2: false, logo: base64_encode('./img/EMAIL.jpg')});
iconMap.set("TWITCH", {name: "TWITCH", oauth2: false, logo: base64_encode('./img/TWITCH.png')});
iconMap.set("COVID", {name: "COVID", oauth2: false, logo: base64_encode('./img/COVID.png')});
iconMap.set("RANDOM_API", {name: "RANDOM_API", oauth2: false, logo: base64_encode('./img/RANDOM_API.png')});
iconMap.set("CAT", {name: "CAT", oauth2: false, logo: base64_encode('./img/CAT.png')});
iconMap.set("CHUCK_NORRIS", {name: "CHUCK_NORRIS", oauth2: false, logo: base64_encode('./img/CHUCK_NORRIS.png')});
iconMap.set("DOGGO", {name: "DOGGO", oauth2: false, logo: base64_encode('./img/DOGGO.png')});
iconMap.set("FOX", {name: "FOX", oauth2: false, logo: base64_encode('./img/FOX.png')});
iconMap.set("NASA", {name: "NASA", oauth2: false, logo: base64_encode('./img/NASA.png')});
iconMap.set("POEMIST", {name: "POEMIST", oauth2: false, logo: base64_encode('./img/POEMIST.jpg')});
iconMap.set("SHIBA_INU", {name: "SHIBA_INU", oauth2: false, logo: base64_encode('./img/SHIBA_INU.png')});
iconMap.set("WAIFU", {name: "WAIFU", oauth2: false, logo: base64_encode('./img/WAIFU.png')});
iconMap.set("NEWS", {name: "NEWS", oauth2: false, logo: base64_encode('./img/NEWS.png')});

const getServices = (req, res) => {
    var js = [];

    for (const service in Service) {
        js.push(iconMap.get(service));
    }

    res.status(200).json({
        success: true,
        services: js,
    });

    console.log('get-user-data');
    console.log('Got body:', req.body);
};

module.exports.getServices = getServices;
module.exports.iconMap = iconMap;