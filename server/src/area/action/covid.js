const argHandler = require('../../tools/argHandler');
const {updateActionArg, updateReactionArg} = require("../../db_management/job/db_job");
const {convertToDecNumber} = require("../../tools/argConverter");
const covid = require('novelcovid');

covid.settings({
    baseUrl: 'https://disease.sh'
})

function getUpdatedInfo(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const country = argHandler.getArg(actionArgs, "country");
    const updated = convertToDecNumber(argHandler.getArg(actionArgs, "updated"));

    covid.countries({country: country})
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((coronavirus) => {
        if (isSuccess) {
            if (coronavirus && coronavirus.updated != undefined && coronavirus.updated > updated &&
                coronavirus.country != undefined && coronavirus.cases != undefined &&
                coronavirus.todayCases != undefined && coronavirus.deaths != undefined &&
                coronavirus.todayDeaths != undefined && coronavirus.recovered != undefined &&
                coronavirus.todayRecovered != undefined && coronavirus.active != undefined &&
                coronavirus.critical != undefined && coronavirus.population != undefined) {

                argHandler.changeArg(actionArgs, "updated", coronavirus.updated, {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg})
                argHandler.changeArg(reactionArgs, "text", "Please be aware that those informations should be taken with a grain of salt.\nYour chosen country: " + coronavirus.country + ".\nAs " + coronavirus.cases + " cases with " + coronavirus.todayCases + " today, " + coronavirus.deaths + " deaths with " + coronavirus.todayDeaths + " today and " + coronavirus.recovered + " peoples recovered with " + coronavirus.todayRecovered + " today.\nThey currently have " + coronavirus.active + " active cases from wich " + coronavirus.critical + " are critical.\nThey have a population of " + coronavirus.population + " people.\nThos information comes from disease.sh.");
                callback(reactionArgs);
            }
        }
    });
}

//target active
function getOverXActive(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const country = argHandler.getArg(actionArgs, "country");
    const updated = convertToDecNumber(argHandler.getArg(actionArgs, "updated"));
    const threshold = convertToDecNumber(argHandler.getArg(actionArgs, "threshold"));

    covid.countries({country: country})
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((coronavirus) => {
        if (isSuccess) {
            if (coronavirus && coronavirus.updated != undefined && coronavirus.updated > updated &&
                coronavirus.active != undefined && coronavirus.active >= threshold &&
                coronavirus.country != undefined && coronavirus.cases != undefined &&
                coronavirus.todayCases != undefined && coronavirus.deaths != undefined &&
                coronavirus.todayDeaths != undefined && coronavirus.recovered != undefined &&
                coronavirus.todayRecovered != undefined && coronavirus.critical != undefined &&
                coronavirus.population != undefined) {

                argHandler.changeArg(actionArgs, "updated", coronavirus.updated, {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg})
                argHandler.changeArg(reactionArgs, "text", "Your threshold (" + threshold + " active cases) for " + coronavirus.country + " as been reached and we have new informations about the covid-19 there.\nPlease be aware that those informations should be taken with a grain of salt.\nThey have " + coronavirus.cases + " cases with " + coronavirus.todayCases + " today, " + coronavirus.deaths + " deaths with " + coronavirus.todayDeaths + " today, " + coronavirus.recovered + " peoples recovered with " + coronavirus.todayRecovered + " today.\nThey currently have " + coronavirus.active + " active cases from wich " + coronavirus.critical + " are critical.\nThey have a population of " + coronavirus.population + " people.\nThos information comes from disease.sh.");
                callback(reactionArgs);
            }
        }
    });
}

//target critical
function getOverXCritical(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const country = argHandler.getArg(actionArgs, "country");
    const updated = convertToDecNumber(argHandler.getArg(actionArgs, "updated"));
    const threshold = convertToDecNumber(argHandler.getArg(actionArgs, "threshold"));

    covid.countries({country: country})
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((coronavirus) => {
        if (isSuccess) {
            if (coronavirus && coronavirus.updated != undefined && coronavirus.updated > updated &&
                coronavirus.critical != undefined && coronavirus.critical >= threshold &&
                coronavirus.country != undefined && coronavirus.active != undefined &&
                coronavirus.cases != undefined && coronavirus.todayCases != undefined &&
                coronavirus.deaths != undefined && coronavirus.todayDeaths != undefined &&
                coronavirus.todayDeaths != undefined && coronavirus.recovered != undefined &&
                coronavirus.todayRecovered != undefined && coronavirus.population != undefined) {

                argHandler.changeArg(actionArgs, "updated", coronavirus.updated, {jobToken: argHandler.getArg(actionArgs, "jobToken"), updater: updateActionArg})
                argHandler.changeArg(reactionArgs, "text", "Your threshold (" + threshold + " critical cases) for " + coronavirus.country + " as been reached and we have new informations about the covid-19 there.\nPlease be aware that those informations should be taken with a grain of salt.\nThey have " + coronavirus.cases + " cases with " + coronavirus.todayCases + " today, " + coronavirus.deaths + " deaths with " + coronavirus.todayDeaths + " today, " + coronavirus.recovered + " peoples recovered with " + coronavirus.todayRecovered + " today.\nThey currently have " + coronavirus.active + " active cases from wich " + coronavirus.critical + " are critical.\nThey have a population of " + coronavirus.population + " people.\nThos information comes from disease.sh.");
                callback(reactionArgs);
            }
        }
    });
}

module.exports.getUpdatedInfo = getUpdatedInfo;
module.exports.getOverXActive = getOverXActive;
module.exports.getOverXCritical = getOverXCritical;


const covidInfo = new Map();

covidInfo.set("[Covid] getUpdatedInfo", {
    name: "[Covid] getUpdatedInfo",
    description: "Informs you of the latest covid information for the chosen country.",
    args: [
        {country: "The chosen country."}
    ]
});

covidInfo.set("[Covid] getOverXActive", {
    name: "[Covid] getOverXActive",
    description: "Informs you of the latest covid information for the chosen country. When the number of active cases reach the threshold.",
    args: [
        {country: "The chosen country."},
        {threshold: "The threshold used to trigger the reaction."}
    ]
});

covidInfo.set("[Covid] getOverXCritical", {
    name: "[Covid] getOverXCritical",
    description: "Informs you of the latest covid information for the chosen country. When the number of critical cases reach the threshold.",
    args: [
        {country: "The chosen country."},
        {threshold: "The threshold used to trigger the reaction."}
    ]
});

module.exports.covidInfo = covidInfo;