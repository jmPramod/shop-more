const { default: mongoose, model } = require('mongoose');

const SignUpSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true, maxlength: 100, minlength: 3 },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
  },
  { timestamps: true }
);

module.exports = model('Users', SignUpSchema);
