const User = require("../models/user.model");


//Students CRUD:
const getStudentDetails = async (req, res) => {
  try {
    const studentList = await User.find({});
    res.status(200).json({ studentList });
  } catch (error) {
    return res.status(500).json({ err: error, msg: "Internal server error!" });
  }
};

const getStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await User.findById(id);
    if (!student) {
      return res
        .status(404)
        .json({ msg: `Student does not exists with id:${id}!` });
    }
    res.status(200).json({ student });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error, msg: "Internal server error!" });
  }
};

const updateStudent = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedStudent = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return res
        .status(404)
        .json({ msg: `Student does not exist with id: ${id}` });
    }

    res.status(200).json({ student: updatedStudent });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ err: error, msg: "Internal server error!" });
  }
};

const deleteStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await User.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ msg: "Student does not exists!" });
    }
    res
      .status(200)
      .json({
        student,
        msg: `Student deleted successfully with id:${student.uid}`,
      });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ err: error, msg: "Internal server error!" });
  }
};

module.exports = {
  getStudentDetails,
  getStudent,
  updateStudent,
  deleteStudent,
};
