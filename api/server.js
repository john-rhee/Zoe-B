const express = require('express');
const helmet = require('helmet')
const db = require('../data/db-config.js')
const cors = require('cors');
require('dotenv').config()

const multer = require('multer');
const path = require('path');

//storage for uploaded pictures
const storage = multer.diskStorage({
    destination: './uploads',
    filename:(req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

//
const upload = multer({
    storage: storage
})

const UserRouter = require('../zoe/user-router.js');
const TodoRouter = require('../zoe/todo-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
    res.send({ api: "api is running..."})
})

server.use('/users', UserRouter);
server.use('/todo', TodoRouter);


//setting path to uploaded picture files
server.use('/profile', express.static('uploads'))

//routing for uploaded picture files
server.post("/upload", upload.single("uimage"), function(req, res){
    console.log(req.file);
    res.json({
                    url: `https://zoe-backend.herokuapp.com/profile/${req.file.filename}`,
                    picture: req.file
                });
})

module.exports = server;