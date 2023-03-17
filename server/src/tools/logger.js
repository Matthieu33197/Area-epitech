var bunyan = require('bunyan');

function reqSerializer(req) {
    return {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body,
    };
}

var log = bunyan.createLogger({
    name: 'AREA',
    serializers: {
        req: reqSerializer,
        err: bunyan.stdSerializers.err,
    },
    streams: [{
        type: 'rotating-file',
        path: './log/AREA.log',
        period: '1d', // daily rotation
        count: 7 // keep 7 back copies
    }]
});

module.exports.log = log