const express = require('express');
const router = express.Router();

const {getJobApplications} = require('../controllers/applications.controller')

router.get('/jobs',getJobApplications);

module.exports = router;