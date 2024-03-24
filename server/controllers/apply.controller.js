const mongoose = require('mongoose')
const Jobpost = require("../models/jobPost.model");
const User = require("../models/user.model");
const Training = require('../models/training.model')


const oneClickApply = async (req, res) => {
  try {
    const { uid,job_id, training_id } = req.body;

    if (!job_id && !training_id) {
      return res.status(400).json({ error: "Job or training ID is required" });
    }

    if(job_id){
      const jobPost = await Jobpost.findOne({ _id: job_id });

      const isAlreadyApplied = jobPost.candidates.some(
        (candidate) => candidate.uid === uid
      );

      if (isAlreadyApplied) {
        return res.status(400).json({ error: "Student already applied" });
      }
  
      jobPost.candidates.push({
        uid: uid,
        timestamp: new Date(),
      });
      
      await jobPost.save();

      await User.findOneAndUpdate(
        { uid },
        { $addToSet: { applications: { job_id: job_id } } },
        { new: true }
      );
    }
    

    if (training_id) {
      const training = await Training.findOne({ _id: training_id });

      if (!training) {
        return res.status(404).json({ error: "Training not found" });
      }

      // Check if the user is already applied for this training
      const isAlreadyApplied = training.attendees.some(
        (attendee) => attendee.uid === uid );

      if (isAlreadyApplied) {
        return res.status(400).json({ error: "Student already applied for this training" });
      }

      // Add the user to the applicants array of the training
      training.attendees.push({
        uid: uid,
        timestamp: new Date(),
      });

      await training.save();


      await User.findOneAndUpdate(
        { uid },
        { $addToSet: { trainingApplications: { training_id: training_id } } },
        { new: true }
      );
      
    }

    res.status(200).json({ success: true, message: "Successfully Applied" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ err: error, message: "Internal server error!" });
  }
};

const withdrawApply = async (req,res) => {
  const {job_id,uid, training_id} = req.body;
  try {

    if(job_id){
      const jobPost = await Jobpost.findOne({_id: job_id });

    if (!jobPost) {
      return res.status(404).json({ error: "Job post not found" });
    }

    jobPost.candidates.splice(jobPost.candidates.map(candidate => candidate.uid).indexOf(uid),1);

     await jobPost.save();
    }

    if(training_id){
      const training = await Training.findOne({_id: training_id});
      
      if (!training) {
        return res.status(404).json({ error: "Training post not found" });
      }

    training.attendees.splice(training.attendees.map(attendee => attendee.uid).indexOf(uid),1)
    await training.save();
    }
    
    res.status(200).json({success: true, message: "Application withdrawn."})
    

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ err: error, message: "Internal server error!" });
  }

}

const getAppliedStudents = async (req, res) => {
  try {
    const { applicationType, id } = req.params; 
    
    let model;
    let localField = '';
    if (applicationType === 'job') {
      model = Jobpost;
      localField = 'candidates.uid';
    } else if (applicationType === 'training') {
      model = Training;
      localField = 'attendees.uid';
    } else {
      return res.status(400).json({ success: false, message: "Invalid application type" });
    }

    const result = await model.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: "users", 
          localField: localField,
          foreignField: "uid",
          as: "appliedStudents"
        }
      },
      {
        $project: {
          _id: 0, 
          company_name: 1,
          candidates: "$candidates.candidate_status",
          title:1,

          appliedStudents: {
            uid: 1,
            name: 1,
            batch: 1,
            branch: 1,
            college_email: 1,
            avg_cgpa: 1,
            resume_url: 1,
            linkedln_link: 1
          }
        }
      }
    ]);
    
    if (result.length === 0) {
      return res.status(404).json({ success: false, message: `No ${applicationType} post found` });
    }

    res.status(200).json({ success: true, appliedStudents: result[0]});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



module.exports = { oneClickApply, withdrawApply, getAppliedStudents};
