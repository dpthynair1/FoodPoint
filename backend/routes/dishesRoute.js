const express = require("express");
const { getDishes } = require("../controller/dishesController");

const router = express.Router();
console.log("dishes route");
router.get("/dishes", getDishes);

module.exports = router;
