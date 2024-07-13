const multer = require("multer");

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinaryImage = require('cloudinary').v2;
const ProductStorage = new CloudinaryStorage({
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
const ProfileStorage = new CloudinaryStorage({
    cloudinary: cloudinaryImage,
    params: {
        folder: 'ProfileImage',
        transformation: [
            { width: 800, height: 600, crop: 'limit' },
            { quality: 'auto' },
            { fetch_format: 'auto' },
            { progressive: true },
            { strip: true }
        ]
    },
});

const uploadProfile = multer({ storage: ProfileStorage });
const uploadProduct = multer({ storage: ProductStorage });
module.exports = { uploadProduct, uploadProfile }