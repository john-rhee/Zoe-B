const express = require('express');
const helmet = require('helmet')
const db = require('../data/db-config.js')
const cors = require('cors');
require('dotenv').config()

const multer = require('multer');
const path = require('path');

//storage
const storage = multer.diskStorage({
    destination: './uploads',
    filename:(req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})
//


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


//
server.use('/profile', express.static('/uploads'))

//
// var fileupload = require("express-fileupload");

// server.use(fileupload());

//
server.post("/upload", upload.single("uImage"), function(req, res){
    console.log(req.file);
    res.json({
                    url: `https://zoe-backend.herokuapp.com/uploads/${req.file.filename}`,
                    picture: req.file
                });
})
    

// server.post("/upload", function(req, res, next){
//     const file = req.files.uImage;
//     file.mv('./uploads/'+file.name+"-"+Date.now(), function(err,result){
//         if(err)
//             throw err;
//         res.send({
//             success: true,
//             message: "File uploaded!",
//             picture: file
//         });
//     });
// })
//

module.exports = server;