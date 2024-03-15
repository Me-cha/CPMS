const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const { oneClickApply,withdrawApply, getAppliedStudents } = require("../controllers/apply.controller");

router.post("/job/apply", auth, oneClickApply);
router.post("/job/withdraw",auth,withdrawApply);
router.get("/job/appliedstudents/:jobId",getAppliedStudents);


module.exports = router;
