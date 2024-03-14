const Coordinator = require("../models/coordinator.model");

const ensureAdmin = async (req, res, next) => {
  try {
    if (!req.decoded.uid) {
      return res.status(404).json({ success: false, message: "Please login." });
    }

    const coordinator = await Coordinator.findOne({
      uid: req.decoded.uid,
    }).select("isAdmin");

    if (coordinator && coordinator.isAdmin === true) {
      next();
    } else {
      res.status(200).json({
        success: false,
        message:
          "Insufficient Permission. Only Admin is allowed to this route.",
      });
    }
  } catch (error) {
    res.status(500).json({ err: error, message: "Something went wrong!" });
  }
};

module.exports = ensureAdmin;
