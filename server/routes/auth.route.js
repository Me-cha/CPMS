const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");

const { signup, login, co_signup } = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/login", auth, login);

router.post("/coordinator/signup", co_signup);

module.exports = router;
