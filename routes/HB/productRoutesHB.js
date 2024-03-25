const express = require('express');
const { CreateProductHB, getProductListHB } = require('../../controller/HBController/handlebars.product');

const productRouteHB = express.Router();

productRouteHB.get('/back-end/create-product', getProductListHB);
productRouteHB.post(
    '/back-end/create-product',
    verifyAdmin,
    CreateProductHB
);
productRouteHB.get('/back-end/get-product-list', getProductListHB);


module.exports = { productRouteHB }