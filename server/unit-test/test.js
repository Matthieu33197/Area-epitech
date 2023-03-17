// const pactum = require('pactum');
const general_test = require('./test/general.test');
const user_test = require('./test/user.test');
const job_test = require('./test/job.test');
const extra_test = require('./test/extra.test');

describe('AREA-server', () => {
//#region {General}
    general_test.getServicesAvailable_200();
//#endregion


//#region {User}
    //#region [Register]
        user_test.register_200();
        user_test.register_401();
    //#endregion

    //#region [Authenticate]
        user_test.authenticate_200();
        user_test.authenticate_401();
        user_test.authenticate_401_2();
    //#endregion

    //#region [Change password]
        user_test.change_password_401_4();
        user_test.change_password_401_3();
        user_test.change_password_200();
        user_test.change_password_401();
        user_test.change_password_401_2();
    //#endregion

    //#region [Update user's services]
        user_test.updateUserServices_200();
        user_test.updateUserServices_200_2();
        user_test.updateUserServices_200();
        user_test.updateUserServices_200_3();
        user_test.updateUserServices_401();
        user_test.updateUserServices_401_2();
    //#endregion

    //#region [Get user's services]
        user_test.getUserServices_200();
        user_test.getUserServices_401();
    //#endregion

    //#region [Get user's sub services]
        user_test.getUserSubServices_200();
        user_test.getUserSubServices_401();
    //#endregion

    //#region [Update user's data]
        user_test.updateUserData_200();
        user_test.updateUserData_401();
    //#endregion

    //#region [Get user's data]
        user_test.getUserData_200();
        user_test.getUserData_401();
    //#endregion
//#endregion


//#region {Job}
    //#region [Update user's job]
        job_test.updateJob_200();
        job_test.updateJob_401();
        job_test.updateJob_401_2();
        job_test.updateJob_401_3();
    //#endregion

    //#region [Search user's job]
        job_test.searchJob_200();
        job_test.searchJob_401();
    //#endregion

    //#region [Stop user's job]
        job_test.stopJob_200();
        job_test.stopJob_200_2();
        job_test.stopJob_401();
    //#endregion

    //#region [Delete user's job]
        job_test.deleteJob_200();
        job_test.deleteJob_401();
    //#endregion
//#endregion


//#region {User(bis)}
    //#region [Unregister]
        user_test.unregister_401_2();
        user_test.unregister_200();
        user_test.unregister_401();
    //#endregion
//#endregion

    /////////////////////////////////////----Extra coverage Test----/////////////////////////////////////

    extra_test.about();
    extra_test.about_json();
    extra_test.close_server_401();
    extra_test.check_bigInt_401();

    /////////////////////////////////////----Extra coverage Test----/////////////////////////////////////
});