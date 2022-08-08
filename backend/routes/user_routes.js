const express = require("express");
const { getAllUser, signup } = require("../controllers/user-controller");
const router = express.Router();

//Get Routes
router.get("/users", getAllUser);

//Post Routes
router.post("/users/signup", signup);

//Put Routes

//Delete Routes

module.exports = router;
