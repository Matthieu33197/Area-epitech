const argHandler = require('../../tools/argHandler');
const {Client, GatewayIntentBits} = require('discord.js');

let bot = new Client({intents : [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    ],  partials: ["CHANNEL"]});

bot.login("ODMyNTkwMzUzNzk3NDgwNDQ4.YHmAMQ.bMOLEFu6b2dBZF1oecxw2xxO-R4")

var bot_on = false;

bot.on('ready', () => {
    console.log("Discord bot is online.")
    bot_on = true;
});

function sendServerMessages(reactionArgs)
{
    const text = argHandler.getArg(reactionArgs, "text");
    const server = argHandler.getArg(reactionArgs, "serverID");

    if (text.length >= 2000 && bot_on){
        const splitText = text.match(/[\s\S]{1,1950}/g) || [];

        for (const pos in splitText) {
            bot.channels.fetch(server).then(chan => {
                chan.send(splitText[pos])
                .catch(console.error);
            })
            .catch(console.error);
        }
    }
    else if (text.length != 0 && bot_on) {
        bot.channels.fetch(server).then(chan => {
            chan.send(text)
            .catch(console.error);
        })
        .catch(console.error);
    }
}

function sendPrivateMessages(reactionArgs)
{
    const text = argHandler.getArg(reactionArgs, "text");
    const user = argHandler.getArg(reactionArgs, "userID");

    if (text.length >= 2000 && bot_on) {
        const splitText = text.match(/[\s\S]{1,1950}/g) || [];

        for (const pos in splitText) {
            bot.users.fetch(user).then(chan => {
                chan.send(splitText[pos])
                .catch(console.error);
            })
            .catch(console.error);
        }
    }
    else if (text.length != 0 && bot_on) {
        bot.users.fetch(user).then(chan => {
            chan.send(text)
            .catch(console.error);
        })
        .catch(console.error);
    }
}

module.exports.sendServerMessages = sendServerMessages;
module.exports.sendPrivateMessages = sendPrivateMessages;



const discordInfo = new Map();

discordInfo.set("[Discord] sendServerMessages", {
    name:"[Discord] sendServerMessages",
    description:"Use a discord bot to display a message in you server.",
    args: [
        {
            serverID: "Channel on wich our bot will communicate."
        },
    ]
});

discordInfo.set("[Discord] sendPrivateMessages", {
    name:"[Discord] sendPrivateMessages",
    description:"Use a discord bot to send a private message to a user.",
    args: [
        {
            userID: "The user who will receive a private message."
        },
    ]
});

module.exports.discordInfo = discordInfo;