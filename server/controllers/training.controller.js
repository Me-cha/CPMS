const Training = require('../models/training.model')
const {trainingNotificationToAllUsers} = require('../services/mail.service')
 
const addTraining = async (req,res) => {
    const body = req.body;
    try {
        const existingTraining = await Training.findOne({
            title: body.title,
            date: body.date,
        });

        if(existingTraining) {
            
            return res.status(400).json({
                success: false,
                message: "Training post already exists!",
            });
        }
        const training = await Training.create(body);
        res.status(200).json({
            sucess: true,
            result: training,
            message: "Successfully new training post added.",
          });
          await trainingNotificationToAllUsers(training);
    } catch (error) {
        return res.status(500).json({err: error, message: "Internal server error!"})
    }
}

const getTrainings = async (req,res) => {
    try {
        const trainings = await Training.find({});
        res.status(200).json({trainings});
    } catch (error) {
        return res.status(500).json({err: error, message: "Internal server error!"})
    }
}

const getOneTraining = async( req,res) => {
    const id = req.params.id;
    try {
        const getOnePost = await Training.findById(id);
        if(!getOnePost)
        {
            return res.status(404).json({message: `No training post with id ${id}`})
        }
        res.status(200).json({success: true, getOnePost});
    } catch (error) {
        console.log(error)
        return res.status(500).json({err: error, message: "Internal server error!"})
    }
}

const updateTraining = async (req,res) => {
    const id = req.params.id;
    try {
        const updateTrainingPost = await Training.findByIdAndUpdate(id,req.body,{
            new: true,  
        }); 
        if(!updateTrainingPost)
        {
            return res.status(404).json({message: `No training post with id ${id}`})
        }
        res.status(200).json({success: true,updateTrainingPost});
    } catch (error) {
        return res.status(500).json({err: error, message: "Internal server error!"})
    }
}

const deleteTraining = async (req,res) => {
    const id = req.params.id;
    try {
        const deletePost = await Training.findByIdAndDelete(id);
        if(!deletePost)
        {
            return res.status(404).json({message: `No training post with id ${id}`});
        }
        res.status(200).json({success:true, message: `Training Post with id ${id} deleted successfully.`});
    } catch (error) {
        return res.status(500).json({err: error, message: "Internal server error!"})
    }
}


module.exports = {addTraining,getTrainings,getOneTraining,updateTraining,deleteTraining};