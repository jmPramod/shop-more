const express = require('express');
const {
  productController,
  CreateProductController,
  getProduct,
  getProductList,
} = require('../controller/productController');
const { verifyAdmin } = require('../utils/verifyToken');

const productRoute = express.Router();

//REST API for front end
productRoute.get('/api/product/allproducts', productController);

// for backend using handlebars
productRoute.get('/back-end/create-product', getProduct);
productRoute.post(
  '/back-end/create-product',
  verifyAdmin,
  CreateProductController
);
productRoute.get('/back-end/get-product-list', getProductList);

module.exports = { productRoute };
