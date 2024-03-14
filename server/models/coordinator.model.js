const mongoose = require("mongoose");

const generateAuthToken = require("../services/jwt.service");

const coordinatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
});

coordinatorSchema.methods.generateAuthTokenCoordinator = async function () {
  return generateAuthToken(this);
};

const Coordinator = mongoose.model("Coordinator", coordinatorSchema);
module.exports = Coordinator;
