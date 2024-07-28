const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");

const registerUser = async (req, res) => {
  console.log("hello");
  console.log(req.body);
  const { name, email, password } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (user) return res.send("User already exists");

  // Hash Password
  // 10: recommended rotations
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new UserModel({
    name: name,
    email: email,
    password: hashedPassword,
  });
  const savedUser = newUser.save();
  // create jsonwebtoken

  const token = jwt.sign(
    {
      userId: await savedUser._id,
    },
    "secret"
  );
  return res.json({
    user: newUser,
    token,
  });
};

const loginUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    email: email,
  });

  if (!user) return res.send("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      "secret"
    );
    return res.status(200).send({
      user: user,
      token: token,
    });
  }

  return res.status(401).send("Invalid Password");
};
module.exports = { registerUser, loginUser };
