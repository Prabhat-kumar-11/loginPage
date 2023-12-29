const express = require("express");
const { UserModel } = require("../model/UserModel");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .send({ msg: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    await user.save();

    res.status(201).send({ msg: "New user has been registered" });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign(
          { authorID: user._id, author: user.name },
          process.env.jwtSecret,{expiresIn:"1h"}
        );
        res.status(200).send({ msg: "Login Successful", token });
      } else {
        res.status(401).send({ msg: "Wrong Credentials !!" });
      }
    } else {
      res.status(401).send({ msg: "Wrong Credentials !!" });
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = {
  userRouter,
};
