const express = require('express');
const {addLibrary} = require("../services/libraryService");
const {User} = require("../models/User");
const router = express.Router();

const {
  registration,
  login,
} = require('../services/authService');

const {
  asyncWrapper,
} = require('../utils/apiUtils');

router.post('/register',
  asyncWrapper(async (req, res) => {
    const {
      email,
      username,
      password,
      age
    } = req.body;

    await registration({email, username, password, age});
    const user = await User.findOne({email});
    await addLibrary(user._id);
    return res.json({message: 'Account created successfully!'});
  }));

router.post('/login', asyncWrapper(async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  const {token, user} = await login({email, password});
  const {username, age} = user;
  return res.json({message: 'Success', jwt_token: token, user: {username, age, email}});
}));

module.exports = {
  authRouter: router,
};
