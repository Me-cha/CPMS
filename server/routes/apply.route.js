const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const {
  oneClickApply,
  withdrawApply,
} = require("../controllers/apply.controller");

router.post("/job/apply", oneClickApply);
router.post("/job/withdraw", withdrawApply);

module.exports = router;
