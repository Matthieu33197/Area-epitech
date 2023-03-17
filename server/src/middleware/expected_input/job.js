const jobExpectedInput = new Map();

jobExpectedInput.set("/api/v3/update-job", {mandatory: {name: "", action: "", actionArg: "", reaction: "", reactionArg: "", interval: "", runNow: ""},
                                            optional: {},
                                            cookie: true});

jobExpectedInput.set("/api/v3/search-job", {mandatory: {},
                                            optional: {}, //no need to put anything here.
                                            cookie: true});

jobExpectedInput.set("/api/v3/delete-job", {mandatory: {jobToken: ""},
                                            optional: {},
                                            cookie: true});

jobExpectedInput.set("/api/v3/stop-job", {mandatory: {jobToken: "", stop: ""},
                                            optional: {},
                                            cookie: true});

module.exports.jobExpectedInput = jobExpectedInput;