const express = require('express');
const router = express.Router();

const {getJobApplications,getTrainingApplications} = require('../controllers/applications.controller')

router.get('/jobs',getJobApplications);
router.get('/trainings',getTrainingApplications);

module.exports = router;