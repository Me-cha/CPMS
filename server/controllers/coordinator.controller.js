const Coordinator = require("../models/coordinator.model");
const { addCoordinatorMail } = require("../services/mail.service");

const addCoordinator = async (req, res) => {
  try {
    await addCoordinatorMail(req, res);
  } catch (error) {
    return res
      .status(500)
      .json({ err: error, message: "Internal sever error!" });
  }
};

const getCoordinators = async (req, res) => {
  try {
    const coordinator = await Coordinator.find({});
    if (coordinator === null) {
      return res.status(404).json({ message: "No entries to display!" });
    }
    res.status(200).json({ success: true, coordinator });
  } catch {
    return res
      .status(500)
      .json({ err: error, message: "Internal sever error!" });
  }
};

const updateCoordinator = async (req, res) => {
  const id = req.params.id;
  try {
    const updateCoordinator = await Coordinator.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!updateCoordinator) {
      return res.status(404).json({ message: `No Coordinator with id ${id}` });
    }
    res.status(200).json({ success: true, updateCoordinator });
  } catch (error) {
    return res
      .status(500)
      .json({ err: error, message: "Internal sever error!" });
  }
};

const deleteCoordinator = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteCoordinator = await Coordinator.findByIdAndDelete(id);
    if (!deleteCoordinator) {
      return res.status(404).json({ message: `No Coordinator with id ${id}` });
    }
    res.status(200).json({
      success: true,
      message: `Coordinator with id ${id} deleted successfully.`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ err: error, message: "Internal server error!" });
  }
};

module.exports = {
  addCoordinator,
  getCoordinators,
  updateCoordinator,
  deleteCoordinator,
};
