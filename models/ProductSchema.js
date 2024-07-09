const { default: mongoose, model } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    discountPercentage: { type: Number },
    rating: {
      type: Number
    },
    stock: { type: Number },
    brand: { type: String },
    category: { type: String },
    thumbnail: {
      imageUrl: { type: String, default: null },
      imgPublicId: { type: String, default: null }
    },

    images: [{
      productUrl: { type: String },
      productPublicId: { type: String, default: null }
    }],
  },
  { timestamps: true }
);

module.exports = model("products", productSchema);
