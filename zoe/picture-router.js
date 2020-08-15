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
    // fileFilter: function(req,file,cb){
    //     checkFileType(file,cb);
    // }
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
    upFiles= JSON.parse(decodeURI(req.file.originalname))
    console.log("this is file uploaded", upFiles);
    console.log("this is file uploaded", req.file);

    const imageName = `http://localhost:5000/profile/${req.file.filename}`;
    console.log("url",imageName);

    const imageTitle = upFiles.title
    const imageDescript = upFiles.description
    const userId = upFiles.user_id

    console.log(imageName, imageTitle, imageDescript, userId);
    
    Picture.addPicture(imageName, imageTitle, imageDescript, userId)
    // .then(pic => {
    //   res.status(201).json(pic);
    //   res.json({
    //     url: `https://zoe-backend.herokuapp.com/profile/${req.file.filename}`,
    // });
      
    // })
    // .catch (err => {
    //   res.status(500).json({ message: 'Failed to add picture' });
    // });

    Picture.findPicture(userId)
        .then(pic => {
            res.json(pic);
         })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get the Pictures' });
        });
  });  

  router.get('/', 
//   restricted, 
  (req, res) => {
    console.log(req.query.user_id)

    //getting users id from req
    userId=req.query.user_id
    Picture.findPicture(userId)
  .then(pic => {
    res.json(pic);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get the images' });
  });
}); 

module.exports = router;