const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const { oneClickApply,withdrawApply } = require("../controllers/apply.controller");

router.post("/job/apply", auth, oneClickApply);
router.post("/job/withdraw",auth,withdrawApply);


module.exports = router;
