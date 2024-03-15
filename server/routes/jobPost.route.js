const express = require("express");
const router = express.Router();

const {
  addJobPost,
  allJobPosts,
  oneJobPost,
  updateJobPost,
  deleteJobPost,
  allAppliedStudents,
} = require("../controllers/jobPost.controller");

router.post("/addjobpost", addJobPost);
router.get("/getalljobs", allJobPosts);
router.get("/getonejob/:id", oneJobPost);
router.patch("/updatejobpost/:id", updateJobPost);
router.delete("/deletejobpost/:id", deleteJobPost);


module.exports = router;
