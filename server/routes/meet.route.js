const express = require('express');
const router = express.Router();
const {createMeet,getMeetings,updateStatus,deleteMeet} = require('../controllers/meet.controller')

router.post('/createmeet', createMeet);
router.get('/getmeetings',getMeetings);
router.patch('/updatestatus/:id',updateStatus);
router.delete('/deletemeet/:id',deleteMeet);

module.exports = router;