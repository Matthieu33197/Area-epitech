const {userExpectedInput} = require("./expected_input/user")
const {jobExpectedInput} = require("./expected_input/job")
const {log} = require("../tools/logger")


function checkNFillOptionalInput(input, expectedInput) {
    for (var data in expectedInput) {
        if (!input.hasOwnProperty(data)) {
            input[data] = expectedInput[data];
        }
        else if (input[data] !== expectedInput[data]) {
            checkNFillOptionalInput(input[data], expectedInput[data]);
        }
    }
}

const checkInput = function (req, res, next) {
    let isSuccess = true;
    var expectedInputs = new Map([...userExpectedInput].concat([...jobExpectedInput]));
    const expectedInput = expectedInputs.get(req.url);

    if (expectedInput == undefined) {
        log.info({checkInput: {expectedInput: false}, req: req});
        next();
    }
    if (expectedInput) {
        if (expectedInput.cookie === true && !req.cookies.AREA) {
            log.info({checkInput: {expectedInput: true, cookie: false}, req: req});
            isSuccess = false;
            res.status(401).json({success: false});
        }

        for (var input in expectedInput.mandatory) {
            // console.log('input = ' + input)
            if (!req.body.hasOwnProperty(input) && isSuccess) {
                log.info({checkInput: {expectedInput: true, cookie: true, input: 'missing mandatory input: ' + input}, req: req});
                isSuccess = false;
                res.status(401).json({success: false});
            }
        }
        if (isSuccess && Object.keys(expectedInput.optional).length !== 0) {
            // console.log("checkNFillOptionalInput -> next");
            checkNFillOptionalInput(req.body, expectedInput.optional)
            next();
        }
        else if (isSuccess && Object.keys(expectedInput.optional).length === 0) {
            next();
        }
    }
    // log.warn({checkInput: {}, req: req}, "Unknow error please retry later.");
    // res.status(401).send('Unknow error please retry later.')
}


module.exports.checkInput = checkInput;