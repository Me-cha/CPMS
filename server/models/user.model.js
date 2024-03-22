const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const generateAuthToken = require("../services/jwt.service");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uid: { type: String, required: true },
  batch: { type: String, required: true },
  branch: { type: String, required: true },
  gender: { type: String, required: true, default: "M" },
  contact: { type: String, required: true },
  college_email: { type: String, required: true },
  degree: { type: String, required: true },
  avg_cgpa: { type: String, required: true },
  ssc_marks: { type: String, required: true },
  ssc_board: { type: String, required: true },
  hsc_marks: { type: String, required: true },
  hsc_board: { type: String, required: true },

  address: { type: String, required: true },
  city: { type: String, required: true },
  post_code: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },

  linkedln_link: {
    type: String,
  },
  resume_url: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  applications: [{
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPost', 
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
}],

trainingApplications: [{
  training_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Training', 
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}] ,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  return generateAuthToken(this);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
