const jwt = require("jsonwebtoken");

const generateAuthToken = async (user) => {
  try {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = generateAuthToken;
