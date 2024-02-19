require('dotenv').config();
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECREAT,
});
