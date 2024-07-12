const multer = require("multer");

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinaryImage = require('cloudinary').v2;
const storage = new CloudinaryStorage({
    cloudinary: cloudinaryImage,
    params: {
        folder: 'ProductsImage',
        transformation: [
            { width: 800, height: 600, crop: 'limit' },
            { quality: 'auto' },
            { fetch_format: 'auto' },
            { progressive: true },
            { strip: true }
        ]
    },
});


const upload = multer({ storage: storage });
// console.log("upload", upload);
// console.log("storage", storage);
module.exports = upload