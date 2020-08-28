const express = require('express');
const helmet = require('helmet')
// const cors = require('cors');
require('dotenv').config()

const UserRouter = require('../zoe/user-router.js');
const PictureRouter = require('../zoe/picture-router.js');

const server = express();

server.use(helmet());
server.use(express.json());

// server.use(cors());
// server.options('*', cors());

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // if (req.method==="OPTIONS"){
    //     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //     return res.status(200).json({})
    // }
    // res.header("Access-Control-Allow-Credentials", true);
    // res.header("Access-Control-Allow-Headers", '*');

    next();
    });

server.get("/", (req, res) => {
    res.send({ api: "api is running..."})
})

server.use('/profile', express.static('uploads'))
server.use('/users', UserRouter);
server.use('/upload', PictureRouter);

module.exports = server;