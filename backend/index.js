const express = require("express");
const cors = require("cors");
const dishes = require("./routes/dishesRoute");
const user = require("./routes/userRoute");

//const { getDishes } = require("./controller/dishesController");
//const { registerUser } = require("./controller/userController");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/FoodPoint")
  .then(() => console.log("Connected!"));
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5001;

app.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.use("/api", dishes);
app.use("/api", user);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
