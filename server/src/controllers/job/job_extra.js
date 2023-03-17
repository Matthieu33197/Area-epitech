const job = require('../../db_management/job/db_job');
const {actions} = require('../../area/actions');
const {reactions} = require('../../area/reactions');
const {removeSpecialArgs} = require("../../tools/argHandler")
const {ToadScheduler, SimpleIntervalJob, Task} = require('toad-scheduler');
const {upsertArg} = require("../../tools/argHandler");

const scheduler = new ToadScheduler()

function deleteToadJob(jobToken)
{
    scheduler.removeById(jobToken);
}

async function removeActionArg(jobToken) {
    let deleteActionArg = await job.deleteActionArgs(jobToken);
    if (deleteActionArg.count == undefined) {
        throw new Error("deleteActionArgs");
    }
    else {
        console.log('deleteActionArgs SUCESSFUL');
    }
    return true;
}

async function removeReactionArg(jobToken) {
    let deleteReactionArg = await job.deleteReactionArgs(jobToken);
    if (deleteReactionArg.count == undefined) {
        throw new Error("deleteReactionArgs");
    }
    else {
        console.log('deleteReactionArgs SUCESSFUL');
    }
    return true;
}

async function changeActionArg(jobToken, body) {
    let isSuccess = true;

    try {
        for (const actionArg in body.actionArg) {
            for (const arg in body.actionArg[actionArg]) {
                let argJob = await job.updateActionArg(jobToken, arg, body.actionArg[actionArg][arg].toString()); //good
                //let argJob = await job.updateActionArg("nop", arg, body.actionArg[actionArg][arg]); //crash test
                if (!argJob.id) {
                    isSuccess = false;
                    throw new Error("updateActionArg");
                }
                console.log('updateActionArg SUCESSFUL')
            }
        }
    }
    catch (error) {
        console.log(error);
        isSuccess = false;
    }
    finally {
        return isSuccess;
    }
}

async function changeReactionArg(jobToken, body) {
    let isSuccess = true;

    try {
        for (const reactionArg in body.reactionArg) {
            for (const arg in body.reactionArg[reactionArg]) {
                let argJob_2 = await job.updateReactionArg(jobToken, arg, body.reactionArg[reactionArg][arg].toString()); //good
                //let argJob_2 = await job.updateReactionArg("nop", arg, body.reactionArg[reactionArg][arg]); //crash test
                if (!argJob_2.id) {
                    isSuccess = false;
                    throw new Error("updateReactionArg");
                }
                console.log('updateReactionArg SUCESSFUL');
            }
        }
    }
    catch (error) {
        console.log(error);
        isSuccess = false;
    }
    finally {
        return isSuccess;
    }
}

function getJob(body)
{
    return new Task(body.name, () => {actions.get(body.action)(body.actionArg, reactions.get(body.reaction), body.reactionArg)});
}

async function isUpdateOrCreateJob(cookie, body) {
    let isSuccess = true;

    try {
        const actionService = body.action.split('[').pop().split(']')[0].toUpperCase();
        const reactionService = body.reaction.split('[').pop().split(']')[0].toUpperCase();
        var currentJob = await job.updateJob(cookie, body, actionService, reactionService);
        if (!(currentJob && (currentJob.length - 1) >= 0)) {
            throw new Error("UnknowJob");
        }
        const jobToken = currentJob[(currentJob.length - 1)].jobToken;

        if (await removeActionArg(jobToken) && await removeReactionArg(jobToken) && await changeActionArg(jobToken, body) && await changeReactionArg(jobToken, body)) {

            console.log("isUpdateOrCreateJob GOOD")
            var goodJob = await job.findUniqueJob(jobToken);
            if (goodJob.jobToken) {
                upsertArg(body.actionArg, "jobToken", goodJob.jobToken, {jobToken: goodJob.jobToken, updater: job.updateActionArg});
                upsertArg(body.reactionArg, "jobToken", goodJob.jobToken, {jobToken: goodJob.jobToken, updater: job.updateReactionArg});
                deleteToadJob(goodJob.jobToken);
                const jobToLaunch = getJob(body);
                const job1 = new SimpleIntervalJob(
                    {seconds: body.interval, runImmediately: body.runNow},
                    jobToLaunch,
                    goodJob.jobToken
                );
                scheduler.addSimpleIntervalJob(job1);
            }
            else {
                throw new Error("findUniqueJob");
            }
        }
        else {
            throw new Error("updateJob");
        }
    }
    catch (error) {
        console.log(error);
        console.log("err = " + error.message);
        switch (error.message) {
            case 'deleteActionArgs':
            case 'deleteReactionArgs':
            case 'updateActionArg':
            case 'updateReactionArg':
            case 'findUniqueJob':
            case 'updateJob':
                deleteToadJob(jobToken);
                await removeActionArg(jobToken);
                await removeReactionArg(jobToken);
                await job.deleteJob(cookie, jobToken);
                console.log("General Error handled job removed.")
                break;
            case 'UnknowJob':
                console.log("Unknown Error detected check the logs.")
                if (body.jobToken != undefined && body.jobToken != "") {
                    deleteToadJob(jobToken);
                    await job.deleteJob(cookie, body.jobToken);
                }
                break;
        }
        isSuccess = false;
    }
    finally {
        if (isSuccess) {
            removeSpecialArgs(goodJob.actionArg);
            removeSpecialArgs(goodJob.reactionArg);
            return goodJob;
        }
        else {
            return undefined;
        }
    }
}

async function deleteJob(cookie, body) {
    let isSuccess = true;

    try {
        deleteToadJob(body.jobToken);
        await removeActionArg(body.jobToken);
        await removeReactionArg(body.jobToken);
        await job.deleteJob(cookie, body.jobToken);
    }
    catch (error) {
        console.log(error);
        console.log("err = " + error.message);
        switch (error.message) {
            case 'deleteActionArgs':
            case 'deleteReactionArgs':
                console.log("Failed to delete args")
                break;
            default:
                console.log(`Unknown error.`);
        }
        isSuccess = false;
    }
    finally {
        if (isSuccess) {
            return true;
        }
        else {
            return false;
        }
    }
}

async function stopJob(cookie, body) {
    let isSuccess = true;

    try {
        if (body.stop) {
            console.log("Stop");
            scheduler.stopById(body.jobToken);
        }
        else if (!body.stop) {
            console.log("Go");
            scheduler.startById(body.jobToken);
        }
        await job.stopJob(cookie, body);
    }
    catch (error) {
        console.log(error);
        console.log("err = " + error.message);
        isSuccess = false;
    }
    finally {
        if (isSuccess) {
            return true;
        }
        else {
            return false;
        }
    }
}

function launchJobOnStart()
{
    let isSuccess = true;

    job.getRelaunchJob()
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((job) => {
        if (isSuccess && job != null && job != undefined){
            console.log('getRelaunchJob SUCESSFUL');

            for (const i in job) {
                var actionArg = [];
                var reactionArg = [];

                for (const j in job[i].actionArg) {
                    actionArg.push({[job[i].actionArg[j].key]: job[i].actionArg[j].value});
                }
                for (const j in job[i].reactionArg) {
                    reactionArg.push({[job[i].reactionArg[j].key]: job[i].reactionArg[j].value});
                }
                const jobToLaunch = getJob({action: job[i].action, actionArg: actionArg, reaction: job[i].reaction, reactionArg: reactionArg});
                const job1 = new SimpleIntervalJob(
                    { seconds: job[i].interval, runImmediately: true },
                    jobToLaunch,
                    job[i].jobToken
                );
                scheduler.addSimpleIntervalJob(job1);
            }
        }
        else {
            console.log('getRelaunchJob FAIL');
        }
    });
}

module.exports.isUpdateOrCreateJob = isUpdateOrCreateJob;
module.exports.deleteJob = deleteJob;
module.exports.stopJob = stopJob;
module.exports.launchJobOnStart = launchJobOnStart;

module.exports.deleteToadJob = deleteToadJob;
module.exports.removeActionArg = removeActionArg;
module.exports.removeReactionArg = removeReactionArg;