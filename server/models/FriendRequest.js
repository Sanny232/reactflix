const mongoose = require('mongoose');

const FriendRequest = mongoose.model('FriendRequest', {
  fromID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  toID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  senderUsername: {
    type: String
  },
  status: {
    type: String,
    default: 'PENDING',
    enum: ['PENDING', 'ACCEPTED', 'REJECTED']
  }
});

module.exports = {FriendRequest};
