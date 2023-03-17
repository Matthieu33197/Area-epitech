const argHandler = require('../../tools/argHandler');
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: "FastMail", //last 30 days from the 09/11/2022
    auth: {
        user: 'giga_great_area_yeepee@fastmail.com',
        pass: 'km8l8l5rlx2rae22',
    },
});

async function sendEmail(reactionArgs)
{
    let is_failed = false;
    const text = argHandler.getArg(reactionArgs, "text");
    const recvEmail = argHandler.getArg(reactionArgs, "recvEmail");

    try {
        var email = await transporter.sendMail({
            from: '"GIGA Great Area YEEPEE 👻" <giga_great_area_yeepee@fastmail.com>', // sender address
            to: recvEmail, // list of receivers
            subject: "Response from your area", // Subject line
            text: text, // plain text body
        });
    }
    catch (error) {
        console.log(error);
        is_failed = true
    }
    finally {
        if (!is_failed && email.messageId != undefined) {
            console.log("sendEmail SUCESSFUL")
        }
        else {
            console.log("sendEmail FAIL")
        }
    }
}

module.exports.sendEmail = sendEmail;



const emailInfo = new Map();

emailInfo.set("[Email] sendEmail", {
    name:"[Email] sendEmail",
    description:"Send an email as a reaction.",
    args: [
        {recvEmail: "The email adress that will receive the message we send."}
    ]
});

module.exports.emailInfo = emailInfo;