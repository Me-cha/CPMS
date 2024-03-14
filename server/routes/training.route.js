const express = require('express')
const router = express.Router();
const {addTraining,getTrainings,getOneTraining,updateTraining,deleteTraining} = require('../controllers/training.controller')

router.post('/addtraining',addTraining);
router.get('/getalltrainings',getTrainings);
router.get('/gettraining/:id',getOneTraining);
router.patch('/updatetraining/:id',updateTraining);
router.delete('/deletetraining/:id',deleteTraining);

module.exports = router;