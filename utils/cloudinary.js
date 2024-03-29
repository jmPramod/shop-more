require('dotenv').config();
const cloudinaryImage = require('cloudinary').v2;

cloudinaryImage.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECREAT,
});


module.exports = cloudinaryImage