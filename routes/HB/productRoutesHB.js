const express = require('express');
// const { CreateProductHB, getProductListHB } = require('../../controller/HBController/handlebars.product');
const { verifyAdminHB } = require('../../utils/verifyToken');
const {
    getProductListHB,
    CreateProductHB,
    getCreateProductHB,
    editProductGetHB,
    editProductPostHB,
} = require('../../controller/HBController/handlebars.product');
const upload = require('../../utils/multer');

const productRouteHB = express.Router();

productRouteHB.get('/create-product', getCreateProductHB);
productRouteHB.post('/create-product', verifyAdminHB, CreateProductHB);
productRouteHB.get(
    '/edit-product/:id',
    verifyAdminHB,
    editProductGetHB
);
productRouteHB.post(
    '/edit-product/:id',
    verifyAdminHB,
    upload.any(),
    editProductPostHB
);
productRouteHB.get('/get-product-list', getProductListHB);

productRouteHB.post('/get-product-list', getProductListHB);

module.exports = { productRouteHB };
