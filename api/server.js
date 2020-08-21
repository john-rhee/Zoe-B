const express = require('express');
const helmet = require('helmet')
// const db = require('../data/db-config.js')
const cors = require('cors');
require('dotenv').config()

// const multer = require('multer');
// const path = require('path');

const UserRouter = require('../zoe/user-router.js');
const PictureRouter = require('../zoe/picture-router.js');

const server = express();

const corsOptions = {
    origin: 'https://zoe-kappa.now.sh',
  }

server.use('/profile', express.static('uploads'))

server.use(helmet());
server.use(express.json());
server.use(cors(corsOptions));

server.get("/", (req, res) => {
    res.send({ api: "api is running..."})
})

server.use('/users', UserRouter);
server.use('/upload', PictureRouter);

module.exports = server;