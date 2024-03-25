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

    if (!applications.length) {
      return res.status(204).json({
        message: "No job applications to view!",
        trainingApplications,
      });
    }

    if (!trainingApplications.length) {
      return res
        .status(204)
        .json({ message: "No training applications to view!", applications });
    }

    res.status(200).json({ applications, trainingApplications });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "Internal Server Error" });
  }
};

module.exports = { getUserApplications };
