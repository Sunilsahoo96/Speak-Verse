const multer = require('multer');

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
  

function fileFilter (req, file, cb) {

    const allowedFiles = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
    if( !allowedFiles.includes(file.mimetype) ){
        cb( new Error("Only png, jpg, jpeg, webp images are allowed."), false);
    }
    else{
        cb(null,true);
    }
}

const upload = multer({ storage: storage, fileFilter:fileFilter });
module.exports = upload;