const express = require("express");
const {getPossibleFriends} = require("../services/friendsService");
const {removeFriend} = require("../services/friendsService");
const {rejectRequest} = require("../services/friendsService");
const {getRequestsToUser} = require("../services/friendsService");
const {acceptRequest} = require("../services/friendsService");
const {createFriendRequest} = require("../services/friendsService");
const {getFriends} = require("../services/friendsService");


const {authMiddleware} = require("../middlewares/authMiddleware");
const {asyncWrapper} = require("../utils/apiUtils");
const router = express.Router();

router.get('/mine', [authMiddleware], asyncWrapper(async (req, res) => {
  const {userId} = req.user;
  let friends = await getFriends(userId);
  return res.status(200).json(friends);
}))

router.post('', [authMiddleware], asyncWrapper(async (req, res) => {
  const {userId} = req.user;
  const {toID} = req.body;
  await createFriendRequest(userId, toID);
  return res.status(200).json({})
}))

router.get('/requests/toMe', [authMiddleware], asyncWrapper(async (req, res) => {
  const {userId} = req.user;
  const requests = await getRequestsToUser(userId);
  return res.json(requests);
}))
router.put('/requests/:id/accept', [authMiddleware], asyncWrapper(async (req, res) => {
  const {userId} = req.user;
  const {id} = req.params;
  await acceptRequest(userId, id);
  return res.json({message: "OK"})
}))
router.put('/requests/:id/reject', [authMiddleware], asyncWrapper(async (req, res) => {
  const {userId} = req.user;
  const {id} = req.params;
  await rejectRequest(userId, id);
  return res.json({message: "OK"})
}))
router.delete('/:id', [authMiddleware], asyncWrapper(async (req, res) => {
  const {userId} = req.user;
  const {id} = req.params;
  await removeFriend(userId, id);
  res.json({message: "OK"});
}))
router.post('/search', [authMiddleware], asyncWrapper(async (req, res) => {
  const {userId} = req.user;
  const {searchQuery} = req.body;
  const friends = await getPossibleFriends(userId, searchQuery);
  return res.json(friends);
}));
module.exports = {
  friendsRouter: router,
};

