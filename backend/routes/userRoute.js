const express = require("express");
const { registerUser, loginUser } = require("../controller/userController");

const router = express.Router();
console.log("user route");

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

module.exports = router;
