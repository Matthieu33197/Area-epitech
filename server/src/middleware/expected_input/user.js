const userExpectedInput = new Map();

userExpectedInput.set("/api/v3/register", {mandatory: {username: "", email: "", password: ""},
                                            optional: {name: undefined, lstName: undefined},
                                            cookie: false});
userExpectedInput.set("/api/v3/authenticate", {mandatory: {email: "", password: ""}, optional: {}, cookie: false});
userExpectedInput.set("/api/v3/google-auth", {mandatory: {}, optional: {googleToken: undefined, access_token: undefined,
                                                refresh_token: undefined}, cookie: false});
userExpectedInput.set("/api/v3/change-password", {mandatory: {oldPassword: "", newPassword: ""}, optional: {}, cookie: true});
userExpectedInput.set("/api/v3/unregister", {mandatory: {password: ""}, optional: {}, cookie: true});
userExpectedInput.set("/api/v3/update-services", {mandatory: {service: "", subscribe: ""},
                                                    optional: {mobile: undefined, token: undefined},
                                                    cookie: true});
userExpectedInput.set("/api/v3/get-area-available", {mandatory: {}, optional: {}, cookie: true});
userExpectedInput.set("/api/v3/update-user-data", {mandatory: {},
                                                    optional: {name: undefined, lstName: undefined, avatar: undefined},
                                                    cookie: true});
userExpectedInput.set("/api/v3/get-user-data", {mandatory: {}, optional: {}, cookie: true});

module.exports.userExpectedInput = userExpectedInput;