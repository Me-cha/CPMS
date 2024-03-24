const User  = require('../models/user.model');

const getJobApplications = async (req,res) => {
    
    try {
        const {uid} = req.query;
    if (!uid) {
        return res.status(400).json({ message: "uid is missing!" });
    }
    
        const jobApplications = await User.findOne({uid: uid}).populate('applications');
        if(jobApplications.applications.length === 0)
        {
            return res.status(204).json({message: "No Applications to view!"});
        }
        res.status(200).json({result: jobApplications.applications, message: "Applications fetched successfully."});
    } catch (error) {
        return res.status(500).json({err: error, message: "Internal Server Error!"});
    }

}

const getTrainingApplications = async(req,res) => {
    try {
        const {uid} = req.query;
        const applications = await User.findOne({uid: uid}).populate('trainingApplications');
        if(applications.trainingApplications.length === 0)
        {
            return res.status(204).json({message: "No applications to view!"});
        }
        res.status(200).json({result: applications.trainingApplications, message: "Training applications fetched successfully!"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({err: error, message: "Internal Server Error!"});
    }
}

module.exports = {getJobApplications,getTrainingApplications};