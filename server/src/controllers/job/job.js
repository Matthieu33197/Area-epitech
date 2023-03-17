const {removeSpecialArgs} = require("../../tools/argHandler")
const {convertArrayToJson, convertDbToArray} = require("../../tools/argConverter")
const job = require('../../db_management/job/db_job');
const job_extra = require('./job_extra');
const {log} = require('../../tools/logger');

// function convertInt(x, base) {
//     const parsed = parseInt(x, base);

//     if (isNaN(parsed)) {
//         return 600;
//     }
//     return parsed;
// };

const updateJob = (req, res) => {
    let isSuccess = true;

    job_extra.isUpdateOrCreateJob(req.cookies.AREA, req.body)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
        log.warn({updateJob: {status: false}, req: req, err: e});
    })
    .then((job) => {
        log.info({updateJob: {status: (isSuccess && job != undefined)}, req: req});
        if (isSuccess && job) {
            job.actionArg = convertArrayToJson(convertDbToArray(job.actionArg));
            job.reactionArg = convertArrayToJson(convertDbToArray(job.reactionArg));
            res.status(200).json({
                success: true,
                job: job
            });
        }
        else {
            res.status(401).json({
                success: false,
            });
        }
    });

    console.log('update-job');
    console.log('Got body:', req.body);
};

const searchJob = (req, res) => {
    let isSuccess = true;

    job.findJob(req.cookies.AREA, req.body)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
        log.warn({searchJob: {status: false}, req: req, err: e});
    })
    .then((job) => {
        log.info({searchJob: {status: (isSuccess && job != undefined)}, req: req});
        if (isSuccess && job) {
            console.log('findJob SUCESSFUL');
            for (const jobNumber in job) {
                removeSpecialArgs(job[jobNumber].actionArg);
                removeSpecialArgs(job[jobNumber].reactionArg);
                job[jobNumber].actionArg = convertArrayToJson(convertDbToArray(job[jobNumber].actionArg));
                job[jobNumber].reactionArg = convertArrayToJson(convertDbToArray(job[jobNumber].reactionArg));
            }
            res.status(200).json({
                success: true,
                job: job,
            });
        }
        else {
            console.log('findJob FAIL');
            res.status(401).json({
                success: false,
            });
        }
    });

    console.log('search-job');
    console.log('Got body:', req.body);
};

const deleteJob = (req, res) => {
    let isSuccess = true;

    job_extra.deleteJob(req.cookies.AREA, req.body)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
        log.warn({deleteJob: {status: false}, req: req, err: e});
    })
    .then((result) => {
        log.info({deleteJob: {status: (isSuccess && result)}, req: req});
        const status = (isSuccess && result) ? 200 : 401;
        console.log('deleteJob ' + ((isSuccess && result) ? 'SUCESSFUL' : 'FAIL'));
        res.status(status).json({
            success: (isSuccess && result)
        });
    });

    console.log('delete-job');
    console.log('Got body:', req.body);
};

const stopJob = (req, res) => {
    let isSuccess = true;

    job_extra.stopJob(req.cookies.AREA, req.body)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
        log.warn({stopJob: {status: false}, req: req, err: e});
    })
    .then((result) => {
        log.info({stopJob: {status: (isSuccess && result)}, req: req});
        const status = (isSuccess && result) ? 200 : 401;
        console.log('stopJob ' + ((isSuccess && result) ? 'SUCESSFUL' : 'FAIL'));
        res.status(status).json({
            success: (isSuccess && result)
        });
    });

    console.log('stop-job');
    console.log('Got body:', req.body);
};

module.exports.updateJob = updateJob;
module.exports.searchJob = searchJob;
module.exports.deleteJob = deleteJob;
module.exports.stopJob = stopJob;