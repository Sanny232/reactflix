const {InvalidRequestError} = require("../utils/errors");
const {FriendRequest} = require("../models/FriendRequest");
const {User} = require('../models/User');

async function getFriends(userId){
  const user = await User.findOne({_id: userId});
  const friends = await User.find({_id: {$in: user.friends}});
  return friends.map(el => {
    return {
      username: el.username,
      _id: el._id
    }
  });
}

async function createFriendRequest(fromID, toID){
  if(fromID.toString() === toID.toString()){
    throw new InvalidRequestError('Its you!');
  }
  const senderUsername = await User.findOne({_id: fromID});
  const name = senderUsername.username;
  const request = new FriendRequest({fromID, toID, senderUsername: name});
  await request.save();
}

async function acceptRequest(userId, reqID){
  const request = await FriendRequest.findOne({_id: reqID});
  if(!request){
    throw new InvalidRequestError('Request not found!')
  }
  const toUserId = request.toID;
  const fromUserId = request.fromID;

  if(userId != toUserId){
    throw new InvalidRequestError('This request is not not for you!')
  }
  const toUser = await User.findOne({_id: toUserId});
  const fromUser = await User.findOne({_id: fromUserId});
  if(fromUser.toString() === toUserId.toString()){
    request.status = 'REJECTED';
    await request.save();
    throw new InvalidRequestError('Its you!');
  }
  if(fromUser.friends.some(el => el.toString() == toUserId.toString())){
    request.status = 'REJECTED';
    await request.save();
    throw new InvalidRequestError('You are already friends!')
  }
  request.status = 'ACCEPTED';
  toUser.friends.push(request.fromID);
  fromUser.friends.push(request.toID);
  await toUser.save();
  await fromUser.save();
  await request.save();
}

async function rejectRequest(userId, reqID){
  const request = await FriendRequest.findOne({_id: reqID});
  if(!request){
    throw new InvalidRequestError('Request not found!')
  }
  const toUserId = request.toID;
  if(userId != toUserId){
    throw new InvalidRequestError('Not for you!')
  }
  request.status = 'REJECTED';
  await request.save();
}
async function getRequestsToUser(userId){
  const req = await FriendRequest.find({toID: userId, status: 'PENDING'});
  return req;
}

async function removeFriend(userID, friendID){
  await User.updateMany({_id: userID}, {$pull: {friends: friendID}}, { multi: true });
  await User.updateMany({_id: friendID}, {$pull: {friends: userID}}, { multi: true });
}

async function getPossibleFriends(userId, searchQuery){
  const user = await User.findOne({_id: userId});
  const sendRequest = await FriendRequest.find({fromID: userId, status: 'PENDING'});
  const gotRequest = await FriendRequest.find({toID: userId, status: 'PENDING'});
  const requestedIDs = sendRequest.map(el => el.toID);
  const gotReqestFromIDs = gotRequest.map(el => el.fromID);
  const inProgressIDs = [...requestedIDs, ...gotReqestFromIDs, ...user.friends, user._id];
  const friends = await User.find({_id: {$nin: inProgressIDs}, 'username': {'$regex': searchQuery, '$options': 'i'}});
  return friends.map(el => {
    return {
      username: el.username,
      _id: el._id
    }
  });
}
module.exports = {
  getFriends,
  createFriendRequest,
  acceptRequest,
  getRequestsToUser,
  rejectRequest,
  removeFriend,
  getPossibleFriends
}
