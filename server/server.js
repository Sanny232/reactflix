const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const compression = require('compression');
const fs = require("fs");
const {showsRouter} = require("./controllers/showsRouter");
const {friendsRouter} = require("./controllers/friendsRouter");
const {profileRouter} = require("./controllers/profileRouter");
const {ServerError} = require("./utils/errors");
const {authRouter} = require("./controllers/authRouter");
const app = express();

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/video', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/video.mp4'))
})

app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/friends', friendsRouter);
app.use('/api/shows', showsRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../build/index.html'))
})

app.use((req, res, next) => {
  res.status(404).json({message: 'Not found'});
});

app.use((err, req, res, next) => {
  if (err instanceof ServerError) {
    return res.status(err.status).json({message: err.message});
  }
  res.status(500).json({message: err.message});
});

const start = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin:admin@cluster0.ik9e4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
      useNewUrlParser: true, useUnifiedTopology: true,
    });
    app.listen(process.env.PORT || 8082);
    console.log('Started');
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`);
  }
};

start();



