const express = require("express");
const router = express.Router();

const {
  addCoordinator,
  getCoordinators,
  updateCoordinator,
  deleteCoordinator,
} = require("../controllers/coordinator.controller");

router.post("/addcoordinator", addCoordinator);
router.get("/getcoordinators", getCoordinators);
router.patch("/updatecoordinator/:id", updateCoordinator);
router.delete("/deletecoordinator/:id", deleteCoordinator);

module.exports = router;
