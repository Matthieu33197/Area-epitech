const discord = require('./reaction/discord');
const email = require('./reaction/email');

const reactions = new Map();

reactions.set("[Discord] sendServerMessages", discord.sendServerMessages);
reactions.set("[Discord] sendPrivateMessages", discord.sendPrivateMessages);

reactions.set("[Email] sendEmail", email.sendEmail);

module.exports.reactions = reactions;



const infoReactions = new Map();

infoReactions.set("DISCORD", {name: "discord", reactions: discord.discordInfo});
infoReactions.set("EMAIL", {name: "email", reactions: email.emailInfo});

module.exports.infoReactions = infoReactions;