const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if ((!name, !email, !password)) {
    res.status(400);

    throw new Error("Please fill all the required fields");
  }

  if (password.length < 6) {
    res.status(400);

    throw new Error("Password must not be less than six characters");
  }

  // check if user already exist in the database
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);

    throw new Error("User already exists, please login.");
  }

  // create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  // generate token
  const token = generateToken(user._id);

  // send HTTP-Only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, password, photo, phone, email } = user;
    res.status(201).json({
      _id,
      name,
      password,
      phone,
      photo,
      email,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // validation of user inputs
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add a valid email and password.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User enter does not exit in this platform, pls register.");
  }

  // user exists, check password matches
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // since user exits get the information
  if (user && passwordIsCorrect) {
    const { _id, name, password, email, photo, phone, bio } = user;

    res.status(200).json({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// logout user functionality
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });

  return res.status(200).json({
    message: "Successfully logged out",
  });
});

// get user data functionality
const getUser = asyncHandler(async (req, res) => {
  const user = User.findById(req.user._id);

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;

    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    res.status(400);
    throw new Error("user not found");
  }
});

// get user logged in status
const loginStatus = asyncHandler(async (req, res) => {
  res.status(200).send("User is logged in...");
});

module.exports = { registerUser, loginUser, logout, getUser, loginStatus };
