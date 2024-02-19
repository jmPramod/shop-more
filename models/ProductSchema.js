const { default: mongoose, model } = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    discountPercentage: { type: Number },
    rating: { type: Number },
    stock: { type: Number },
    brand: { type: String },
    category: { type: String },
    thumbnail: { type: String },
    images: [String],
  },
  { timestamps: true }
);

module.exports = model('products', productSchema);
