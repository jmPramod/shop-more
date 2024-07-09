const multer = require("multer");

// const storage = multer.diskStorage({

//     destination: function (req, file, cb) {
//         cb(null, "public/uploadedImages")
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({ storage: storage })

// module.exports = upload

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinaryImage = require('cloudinary').v2;
const storage = new CloudinaryStorage({
    cloudinary: cloudinaryImage,
    params: {
        folder: 'your_folder_name',
        transformation: [
            { width: 800, height: 600, crop: 'limit' },
            { quality: 'auto' },
            { fetch_format: 'auto' },
            { progressive: true },
            { strip: true }
        ]
    },
});
// console.log("storage", storage);

const upload = multer({ storage: storage });
module.exports = upload