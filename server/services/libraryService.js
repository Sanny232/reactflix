const mongoose = require("mongoose");
const {InvalidRequestError} = require("../utils/errors");
const {ShowLibrary} = require('../models/ShowLibrary');

function getLibrary(userId){
  return ShowLibrary.findOne({owner: userId});
}
async function addLibrary(userId){
  const payload = {
    owner: userId
  }
  const newLib = new ShowLibrary(payload);
  await newLib.save();
}

async function addShowToLib(userId, show){
  const library = await getLibrary(userId);
  const id = new mongoose.Types.ObjectId();
  show = {...show, _id: id}
  if(library.shows.some(el => el.id === show.id)){
    throw new InvalidRequestError('Show already in your lib')
  }
  library.shows.push(show);
  await library.save();
}

async function removeShowFromLib(userId, showId){
  await ShowLibrary.updateMany({owner: userId}, {$pull: {shows: {id: +showId}}}, { multi: true })
}

module.exports = {
  addLibrary,
  getLibrary,
  addShowToLib,
  removeShowFromLib
}
