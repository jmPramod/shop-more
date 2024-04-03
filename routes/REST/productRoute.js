const express = require('express');
// const {
//   productController,
//   CreateProductController,
//   getCategories,
//   getProductList,
//   getSingleProduct,
//   importProducts,
//   searchProduct
// } = require('../../controller/productController');
const { verifyAdmin } = require('../../utils/verifyToken');
const { productController, getSingleProduct, getCategories, searchProduct, CreateProductController } = require('../../controller/REST_Controller/productController');
// const { getProduct } = require('../../controller/HBController/handlebars.product');

const productRouteRest = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *         - discountPercentage
 *         - rating
 *         - stock
 *         - brand
 *         - category
 *         - thumbnail
 *         - images
 *       properties:
 *         id:
 *           type: number
 *           description: The id is required
 *         title:
 *           type: string
 *           description: Title of the product
 *         description:
 *           type: string
 *           description: Description of the product
 *         price:
 *           type: number
 *           description: Price of the product (required)
 *         discountPercentage:
 *           type: number
 *           description: Discount percentage for the product
 *         rating:
 *               type: number
 *               description: Average rating for the product
 *         stock:
 *           type: number
 *           description: Stock quantity of the product
 *         brand:
 *           type: string
 *           description: Brand of the product
 *         category:
 *           type: string
 *           description: Category of the product
 *         thumbnail:
 *           type: string
 *           description: URL of the product thumbnail image
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of URLs for product images
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 * /api/product/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */

//REST API for front end
productRouteRest.get('/api/products', productController);

productRouteRest.get('/api/product/:id', getSingleProduct);
productRouteRest.get("/products/categories", getCategories)




productRouteRest.post('/products/search', searchProduct);
module.exports = { productRouteRest };
