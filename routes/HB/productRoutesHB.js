const express = require('express');
// const { CreateProductHB, getProductListHB } = require('../../controller/HBController/handlebars.product');
const { verifyAdminHB } = require('../../utils/verifyToken');
const {
    getProductListHB,
    CreateProductHB,
    getCreateProductHB,
    editProductGetHB,
    deleteGetProductListHB,
    editProductPostHB,
} = require('../../controller/HBController/handlebars.product');
const { uploadProduct } = require('../../utils/multer');


const productRouteHB = express.Router();

productRouteHB.get('/create-product', getCreateProductHB);
productRouteHB.post('/create-product', verifyAdminHB, uploadProduct.any(), CreateProductHB);
productRouteHB.get(
    '/edit-product/:id',
    verifyAdminHB,
    editProductGetHB
);
productRouteHB.post(
    '/edit-product/:id',
    verifyAdminHB,
    uploadProduct.any(),
    editProductPostHB
);
productRouteHB.get('/get-product-list', verifyAdminHB, getProductListHB);

// productRouteHB.post('/get-product-list', getProductListHB);

productRouteHB.get('/delete-product/:id', verifyAdminHB, deleteGetProductListHB);

module.exports = { productRouteHB };
