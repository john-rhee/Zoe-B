const express = require('express');
const router = express.Router();
const restricted = require("../restricted-middleware.js");
const Picture = require('./picture-model.js');

const multer = require('multer');
const path = require('path');

//storage for uploaded pictures
const storage = multer.diskStorage({
    destination: './uploads',
    filename:(req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize:5000000},
    fileFilter: function(req,file,cb){
        checkFileType(file,cb);
    }
})

//Check file type
function checkFileType(file, cb){
    //allowed file types
    const filetypes = /jpeg|jpg|png|gif/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime type
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb("Error: Images Only!")
    }

}

//routing for uploaded picture files
// router.post("/", upload.single("uimage"), function(req, res){
//     console.log(req.file);
//     res.json({
//                     url: `https://zoe-backend.herokuapp.com/profile/${req.file.filename}`,
//                     picture: req.file
//                 });
// })

router.post('/', 
// restricted, 
upload.single("uimage"), (req, res) => {
    console.log(req.file);
    const imageName = `https://zoe-backend.herokuapp.com/profile/${req.file.filename}`;
    console.log(imageName);
  
    Picture.addPicture(imageName)
    // .then(pic => {
    //   res.status(201).json(pic);
    //   res.json({
    //     url: `https://zoe-backend.herokuapp.com/profile/${req.file.filename}`,
    // });
      
    // })
    // .catch (err => {
    //   res.status(500).json({ message: 'Failed to add picture' });
    // });

    Picture.findPicture()
        .then(pic => {
            res.json(pic);
         })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get the Pictures' });
        });
  });  

module.exports = router;