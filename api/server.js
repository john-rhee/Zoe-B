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

server.use(function (req, res, next) {
    
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

server.get("/", (req, res) => {
    res.send({ api: "api is running..."})
})

server.use('/profile', express.static('uploads'))
server.use('/users', UserRouter);
server.use('/upload', PictureRouter);

module.exports = server;