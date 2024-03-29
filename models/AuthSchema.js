const { default: mongoose, model } = require('mongoose');

const SignUpSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    secondName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true, },
    role: { type: String, default: 'user', enum: ['user', 'admin', 'Super-Admin'] },
    image: { type: String, default: "https://res.cloudinary.com/dtvq8ysaj/image/upload/v1711554275/profileImage_l8dleh.png" },
    cloudinaryPublicId: { type: String }

  },
  { timestamps: true }
);



module.exports = model('Users', SignUpSchema);
