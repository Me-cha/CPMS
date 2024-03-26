const User = require("../models/user.model");

const getUserApplications = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const applications = user.applications;
    const trainingApplications = user.trainingApplications;

    let message = "";
    if (!applications.length && !trainingApplications.length) {
      message = "No applications to view!";
    } else if (!applications.length) {
      message = "No job applications to view!";
    } else if (!trainingApplications.length) {
      message = "No training applications to view!";
    }

    res.status(200).json({ message, applications, trainingApplications });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "Internal Server Error" });
  }
};

module.exports = { getUserApplications };
