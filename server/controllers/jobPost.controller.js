const jobPost = require("../models/jobPost.model");
const { sendNotificationEmailToAllUsers } = require("../services/mail.service");

const addJobPost = async (req, res) => {
  const body = req.body;
  try {
    const job = await jobPost.create(body);
    res.status(200).json({
      sucess: true,
      result: job,
      message: "Successfully new job post added.",
    });
    await sendNotificationEmailToAllUsers(job);
  } catch (error) {
    return res
      .status(500)
      .json({ err: error, message: "Internal server error!" });
  }
};

const allJobPosts = async (req, res) => {
  try {
    const jobs = await jobPost.find({});
    if (jobs === null) {
      return res.status(204).json({ message: "No job posts to Show!" }); //For empty table
    }

    res.status(200).json({ result: jobs });
  } catch (error) {
    return res
      .status(500)
      .json({ err: error, message: "Internal server error!" });
  }
};

const oneJobPost = async (req, res) => {
  const company_id = req.params.id;
  try {
    const job = await jobPost.findById(company_id);
    if (!job) {
      return res
        .status(404)
        .json({ message: `No Job Post with id ${company_id}` });
    }

    res.status(200).json({ result: job });
  } catch (error) {
    return res
      .status(500)
      .json({ err: error, message: "Internal server error!" });
  }
};

const updateJobPost = async (req, res) => {
  const company_id = req.params.id;
  try {
    const updateJob = await jobPost.findByIdAndUpdate(company_id, req.body, {
      new: true,
    });
    if (!updateJob) {
      return res
        .status(404)
        .json({ message: `No Job Post with id ${company_id}` });
    }

    res.status(200).json({ result: updateJob });
  } catch (error) {
    return res
      .status(500)
      .json({ err: error, message: "Internal server error!" });
  }
};

const deleteJobPost = async (req, res) => {
  const company_id = req.params.id;
  try {
    const deletejob = await jobPost.findByIdAndDelete(company_id);
    if (!deleteJobPost) {
      return res
        .status(404)
        .json({ message: `No Job Post with id ${company_id}` });
    }

    res.status(200).json({ deletejob });
  } catch (error) {
    return res
      .status(500)
      .json({ err: error, message: "Internal server error!" });
  }
};



module.exports = {
  addJobPost,
  allJobPosts,
  oneJobPost,
  updateJobPost,
  deleteJobPost,

};
