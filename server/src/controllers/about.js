const {infoActions} = require('../area/actions');
const {infoReactions} = require('../area/reactions');
const { Service } = require('@prisma/client')

const about = (req, res) => {
    var jsonArr = [];
    const ip = (req.ip.substr(0, 7) == "::ffff:") ? req.ip.substr(7) : req.ip;

    for (const service in Service) {
        const currentService = {name: service};
        var actions = infoActions.get(service);
        var reactions = infoReactions.get(service);
        var tmpActions = [];
        var tmpReactions = [];

        if (actions) {
            let infoActionKeys = Array.from(actions.actions.keys());
            for (const i in infoActionKeys) {
                tmpActions.push(actions.actions.get(infoActionKeys[i]));
            }
        }
        currentService.actions = tmpActions;
        if (reactions) {
            let infoReactionKeys = Array.from(reactions.reactions.keys());
            for (const i in infoReactionKeys) {
                tmpReactions.push(reactions.reactions.get(infoReactionKeys[i]));
            }
        }
        currentService.reactions = tmpReactions;
        jsonArr.push(currentService);
    }

    res.status(200).json({
        client: {
            host: ip
        },
        server: {
            current_time: Date.now(),
            services: jsonArr
        }
    });
}

module.exports.about = about