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

server.use(helmet());
server.use(express.json());

// server.use(cors());
// server.options('*', cors());

// server.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
//     res.header("Access-Control-Allow-Headers", '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     next();
//     });

server.use(
    cors({
      origin: 'http://localhost:3000'
    })
  );

server.options('*', cors({
    origin: 'http://localhost:3000'
    })
  );

server.get("/", (req, res) => {
    res.send({ api: "api is running..."})
})

server.use('/profile', express.static('uploads'))
server.use('/users', UserRouter);
server.use('/upload', PictureRouter);

module.exports = server;