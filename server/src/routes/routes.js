const express = require('express');
const router = express.Router();
const { checkArea } = require("../middleware/check_area")
const general_controllers = require('../controllers/general/general');
const user_controllers = require('../controllers/user/user');
const job_controllers = require('../controllers/job/job');

router.post('/register', user_controllers.register);
router.post('/authenticate', user_controllers.authenticate);
router.post('/google-auth', user_controllers.googleUserHandler);
router.post('/unregister', user_controllers.unregister);
router.post('/change-password', user_controllers.updateUserPassword);
router.post('/update-services', user_controllers.updateUserServices);
router.get('/get-area-available', user_controllers.getUserServices);
router.get('/get-user-sub-services', user_controllers.getUserSubServices);
router.post('/update-user-data', user_controllers.updateUserData);
router.get('/get-user-data', user_controllers.getUserData);


router.get('/get-services-available', general_controllers.getServices);


router.post('/update-job', checkArea, job_controllers.updateJob);
router.post('/search-job', job_controllers.searchJob);
router.post('/delete-job', job_controllers.deleteJob);
router.post('/stop-job', job_controllers.stopJob);

module.exports = router;