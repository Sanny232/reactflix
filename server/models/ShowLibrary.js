const mongoose = require('mongoose');

const ShowLibrary = mongoose.model('ShowLibrary', {
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  shows: [Object]
});

module.exports = {ShowLibrary};
