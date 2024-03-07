const express = require('express');
const {
  productController,
  CreateProductController,
  getProduct,
  getProductList,
  getSingleProduct,
  importProducts,
  searchProduct
} = require('../controller/productController');
const { verifyAdmin } = require('../utils/verifyToken');

const productRoute = express.Router();
/** 
@swagger
* /api/products:
*   get:
*     summary: Get Request
*     description: Get all product.
*     responses:
*      '200':
*         description: Successful response
*/
//REST API for front end
productRoute.get('/api/products', productController);
productRoute.get('/api/product/:id', getSingleProduct);

// for backend using handlebars
productRoute.get('/back-end/create-product', getProduct);
productRoute.post(
  '/back-end/create-product',
  verifyAdmin,
  CreateProductController
);
productRoute.post('/api/product/import-products', importProducts);
productRoute.get('/back-end/get-product-list', getProductList);

productRoute.post('/products/search', searchProduct);
module.exports = { productRoute };
