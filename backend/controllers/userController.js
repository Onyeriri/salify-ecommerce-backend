const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if (!name, !email, !password) {
    res.status(400);

    throw new Error('Please fill all the required fields');
  }

  if (password.length < 6) {
    res.status(400);

    throw new Error("Password must not be less than six characters")
  }

  // check if user already exist in the database
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);

    throw new Error('User already exists, please login.')
  }

  // create new user
  const user = await User.create({
    name,
    email,
    password
  })

  if (user) {
    const { _id, name, password, photo, phone, email } = user;
    res.status(201).json({
      _id, name, password, phone, photo, email
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }

})

module.exports = {registerUser};
