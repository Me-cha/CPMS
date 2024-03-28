const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const connect = require("./db/connect");
const auth = require("./routes/auth.route");
const students = require("./routes/students.route");
const jobs = require("./routes/jobPost.route");
const training = require("./routes/training.route");
const coordinator = require("./routes/coordinator.route");
const apply = require("./routes/apply.route");
const applications = require('./routes/applications.route');
const meet = require('./routes/meet.route')

app.use(cors());
app.use(express.json());

app.use("/api/user", auth); //
app.use("/api/students", students);
app.use("/api/jobs", jobs);
app.use("/api/training", training);
app.use("/api/coordinator", coordinator);
app.use("/api/application", apply);
app.use("/api/getapplications",applications);
app.use("/api/meeting",meet);

const Port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Server is running");
});

const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(Port, () => {
      console.log(`Server is listening on ${Port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
