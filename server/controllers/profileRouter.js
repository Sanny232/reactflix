const express = require("express");
const {updateProfile} = require("../services/authService");
const {getProfile} = require("../services/authService");
const {authMiddleware} = require("../middlewares/authMiddleware");
const {asyncWrapper} = require("../utils/apiUtils");
const router = express.Router();

router.get('/me', [authMiddleware], asyncWrapper(async (req, res) => {
  const {userId} = req.user;
  const user = await getProfile(userId);

  res.status(200).json({
    username: user.username,
    age: user.age,
    email: user.email
  });
}))

router.patch('/me/update', [authMiddleware], asyncWrapper(async (req, res) => {
  const {userId} = req.user;

  await updateProfile(userId, req.body);
  res.json({message: 'OK'});
}))

module.exports = {
  profileRouter: router,
};
