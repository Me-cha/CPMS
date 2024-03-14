const nodemailer = require("nodemailer");

const User = require("../models/user.model");
const Coordinator = require("../models/coordinator.model");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASS,
  },
});

// Function to send notification email
const sendNotificationEmailToAllUsers = async (jobPost) => {
  try {
    const users = await User.find();
    const userEmails = users.map((user) => user.college_email);

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: userEmails.join(", "),
      subject: "New Job Post Added",
      text: `A new job post "${jobPost.job_info.job_profile}" has been added. Check it out!`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ err: error, message: "Email service error!" });
  }
};

const trainingNotificationToAllUsers = async (training) => {
  try {
    const users = await User.find(); // Assuming you have a User model
    const userEmails = users.map((user) => user.college_email);

    const mailOptions = {
      from: process.env.SENDER_EMAIL, // replace with your email
      to: userEmails.join(", "), // Comma-separated list of all user emails
      subject: "New Job Post Added",
      text: `Training session on "${training.title}". Check it out!`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ err: error, message: "Email service error!" });
  }
};

const addCoordinatorMail = async (req, res) => {
  try {
    // Extract emails from the request body
    const emails = req.body;

    // Validate if emails are present
    if (!emails || emails.length === 0) {
      return res
        .status(400)
        .json({ error: "Please provide at least one email address." });
    }

    const promises = emails.map(async (email) => {
      const inviteLink = "http//:localhost:3000/add";

      const mailOptions = {
        from: "your_email@gmail.com",
        to: email,
        subject: "Invitation to join as a coordinator",
        text: `Hello!\n\nYou have been invited to join as a coordinator. Click the link below to sign up:\n${inviteLink}`,
      };

      await transporter.sendMail(mailOptions);
    });

    // Wait for all emails to be sent
    await Promise.all(promises);

    // Send success response
    res.status(200).json({ message: "Invites sent successfully." });
  } catch (error) {
    console.error("Error sending invites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  sendNotificationEmailToAllUsers,
  trainingNotificationToAllUsers,
  addCoordinatorMail,
};
