const express = require('express');
const router = express.Router();

const {getUserApplications} = require('../controllers/applications.controller')

router.get('/:id',getUserApplications);

module.exports = router;