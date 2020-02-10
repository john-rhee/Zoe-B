const express = require('express');
const helmet = require('helmet')
const db = require('./data/db-config.js')
const cors = require('cors');
require('dotenv').config()


const UserRouter = require('./zoe/user-router.js');
// const PictureRouter = require('../zoe/picture-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
    res.send({ api: "api is running..."})
})


server.use('/users', UserRouter);
// server.use('/picture', PictureRouter);

module.exports = server;