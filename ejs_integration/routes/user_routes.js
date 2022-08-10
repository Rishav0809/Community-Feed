const express = require("express");
const { getAllUser, signup } = require("../controllers/user-controller");
const router = express.Router();

//Get Routes
router.get("/", getAllUser);

//Post Routes
router.post("/signup", signup);

//Put Routes

//Delete Routes

module.exports = router;
