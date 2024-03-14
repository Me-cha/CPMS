const express = require('express');
const router = express.Router();

const {getStudentDetails,getStudent,updateStudent,deleteStudent} = require('../controllers/students.controller')


router.get('/getstudents',getStudentDetails);
router.get('/getstudent/:id',getStudent)
router.patch('/updatestudent/:id',updateStudent);
router.delete('/deletestudent/:id',deleteStudent);

module.exports = router;