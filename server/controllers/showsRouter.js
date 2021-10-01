const express = require("express");
const {asyncWrapper} = require("../utils/apiUtils");
const router = express.Router();
const fetch = require('node-fetch');
const {removeShowFromLib} = require("../services/libraryService");
const {getLibrary} = require("../services/libraryService");
const {NotFoundError} = require("../utils/errors");
const {addShowToLib} = require("../services/libraryService");
const {authMiddleware} = require("../middlewares/authMiddleware");

router.post('/', asyncWrapper(async (req, res) => {
  const {page} = req.body;
  const {genres} = req.body;
  const {status} = req.body;
  fetch('https://api.tvmaze.com/shows?page=1')
    .then(response => response.json())
    .then(data => data.filter(el => el.genres.some(genre => {
      if (genres && !genres.includes('any') && genres.length > 0) {
        return genres.includes(genre)
      }
      return true;
    }))
      .filter(el => !status || status === 'any' || el.status === status))
    .then(data => res.json(data))
    .catch(err => console.log(err))
}))

router.post('/library', [authMiddleware], asyncWrapper(async (req, res) => {
  const {userId} = req.user;
  const {showId} = req.body;
  const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
  const data = await response.json();
  if(data.status == 404) throw new NotFoundError('Show not found');
  await addShowToLib(userId, data);
  const library = await getLibrary(userId);
  return res.json(library);
}))

router.get('/library', [authMiddleware], asyncWrapper(async (req, res) => {
  const {userId} = req.user;
  const library = await getLibrary(userId);
  return res.json(library);
}))

router.delete('/library/:showId', [authMiddleware], asyncWrapper(async (req, res) => {
  const {userId} = req.user;
  const {showId} = req.params;
  await removeShowFromLib(userId, showId);
  const library = await getLibrary(userId);
  return res.json(library);
}))

module.exports = {
  showsRouter: router,
};
