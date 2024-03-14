const User = require("../models/user.model");
const Coordinator = require("../models/coordinator.model");
const generateAuthToken = require("../services/jwt.service");

const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const {
    name,
    uid,
    batch,
    gender,
    contact,
    college_email,
    degree,
    avg_cgpa,
    ssc_marks,
    ssc_board,
    hsc_marks,
    hsc_board,
    branch,
    address,
    city,
    post_code,
    state,
    country,
    linkedln_link,
    resume_url,
    password,
  } = req.body;

  try {
    if (
      !name ||
      !uid ||
      !batch ||
      !branch ||
      !contact ||
      !college_email ||
      !degree ||
      !avg_cgpa ||
      !ssc_marks ||
      !ssc_board ||
      !hsc_marks ||
      !hsc_board ||
      !address ||
      !city ||
      !post_code ||
      !state ||
      !country ||
      !password
    ) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    if (contact.length !== 10 || !/^\d+$/.test(contact)) {
      return res
        .status(400)
        .json({ error: "Contact number must be a 10-digit number" });
    }

    if (!college_email.endsWith("edu.in")) {
      return res.status(400).json({ error: "Enter Official email id!" });
    }

    const oldStudent = await User.findOne({
      uid: uid,
      college_email: college_email,
    });
    if (oldStudent) {
      return res.status(409).json({ msg: "User already exists!" });
    }

    const newStudent = await User.create({
      name: name,
      uid: uid,
      batch: batch,
      branch: branch,
      contact: contact,
      gender: gender,
      college_email: college_email,
      degree: degree,
      avg_cgpa: avg_cgpa,
      ssc_marks: ssc_marks,
      ssc_board: ssc_board,
      hsc_marks: hsc_board,
      hsc_board: hsc_board,
      address: address,
      city: city,
      state: state,
      post_code: post_code,
      country: country,
      linkedln_link: linkedln_link,
      resume_url: resume_url,
      password: password,
    });

    const token = await generateAuthToken(newStudent);

    res.status(200).json({ result: newStudent, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: error,
      msg: "Internal server error!",
    });
  }
};

const login = async (req, res) => {
  const { select, email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Both email and password are required" });
    }

    //Coordinator login auth:
    if (select === "coordinator") {
      const coordinator = await Coordinator.findOne({ email: email });
      if (!coordinator) {
        return res.status(404).json({ msg: "Does not exists!" });
      }
      const correctPassword = await bcrypt.compare(
        password,
        coordinator.password
      );
      if (!correctPassword) {
        return res.status(400).json({ msg: "Invalid Credentials!" });
      }
      const token = await generateAuthToken(coordinator);

      res.status(200).json({ result: coordinator, token });
    } else if (select === "student") {
      const student = await User.findOne({ college_email: email });

      if (!student) {
        return res.status(404).json({ msg: "Does not exists!" });
      }
      const correctPassword = await bcrypt.compare(password, student.password);

      if (!correctPassword) {
        return res.status(400).json({ msg: "Invalid Credentials!" });
      }

      const token = await student.generateAuthToken(student);

      res.status(200).json({ result: student, token });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error, msg: "Internal server error!" });
  }
};

//Co-ordinator signup:
const co_signup = async (req, res) => {
  const { email, password, name, uid, branch, contact, isAdmin } = req.body;
  try {
    if (!email || !password || !name || !uid || !branch || !contact) {
      return res.status.json({ err: "All fields are required!" });
    }

    //super admin

    const oldCoordinator = await Coordinator.findOne({ email: email });
    if (oldCoordinator) {
      return res.status(400).json({ msg: "Coordinator already exists!" });
    }

    const isAdmin = email === process.env.ADMIN_EMAIL;

    const hashedPassword = await bcrypt.hash(password, 12);

    const newCoordinator = await Coordinator.create({
      name,
      email,
      uid,
      password: hashedPassword,
      branch,
      contact,
      isAdmin,
    });

    const token = await generateAuthToken(newCoordinator);

    res.status(200).json({ result: newCoordinator, token });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error!" });
  }
};

module.exports = { signup, login, co_signup };
