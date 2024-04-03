const express = require('express');
const { verifyAdmin } = require('../../utils/verifyToken');
const { productController, getSingleProduct, getCategories, searchProduct, CreateProductController, sortProducts, filterProducts } = require('../../controller/REST_Controller/productController');

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
 * /products/all-products:
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
 * /products/get-single-product/{id}:
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
productRouteRest.get('/products/all-products', productController);
productRouteRest.get('/products/get-single-product/:id', getSingleProduct);
/**
 * @swagger
 * /products/get-categories:
 *   get:
 *     summary: Get all product categories
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating the status of the request
 *                 count:
 *                   type: number
 *                   description: Number of categories fetched
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: The id of the product category
 *                       title:
 *                         type: string
 *                         description: The title of the product category
 *                       description:
 *                         type: string
 *                         description: Description of the product category
 *                       thumbnail:
 *                         type: string
 *                         description: URL of the thumbnail image for the category
 *                       products:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Product'
 *                   description: Array of product categories, each containing products
 *       500:
 *         description: Some server error
 */

productRouteRest.get("/products/get-categories", getCategories)
/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search for product
 *     tags: [Products]
 *     parameters:
 *       - name: term
 *         in: query
 *         required: true
 *         description: The term to search for products , term is matched in  from title ,brand , description of product and category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Products retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating the status of the request
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                   description: Array of products related to the search term
 *       404:
 *         description: No Product Found or invalid search term
 *       500:
 *         description: Some server error
 */

productRouteRest.get('/products/search', searchProduct);
/**
 * @swagger
 * /products/filter:
 *   get:
 *     summary: Filter products
 *     tags: [Products]
 *     parameters:
 *       - name: minPrice
 *         in: query
 *         description: Minimum price of the product
 *         schema:
 *           type: number
 *       - name: maxPrice
 *         in: query
 *         description: Maximum price of the product
 *         schema:
 *           type: number
 *       - name: category
 *         in: query
 *         description: Category of the product
 *         schema:
 *           type: string
 *       - name: minRating
 *         in: query
 *         description: Minimum rating of the product
 *         schema:
 *           type: number
 *       - name: discountPercentage
 *         in: query
 *         description: Minimum discount percentage of the product
 *         schema:
 *           type: number
 *       - name: brand
 *         in: query
 *         description: Brand(s) of the product (can be a single brand or multiple brands separated by comma)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Products filtered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating the status of the request
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                   description: Array of products matching the filter criteria
 *       500:
 *         description: Some server error
 */

productRouteRest.get("/products/filter", filterProducts);

/**
 * @swagger
 * /products/sort:
 *   get:
 *     summary: Sort products
 *     tags: [Products]
 *     parameters:
 *       - name: sortBy
 *         in: query
 *         required: true
 *         description: Field to sort by (e.g., price, rating ie key of product )
 *         schema:
 *           type: string
 *       - name: minNmax
 *         in: query
 *         required: true
 *         description: Sort order (1 for ascending, -1 for descending)
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Products sorted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating the status of the request
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                   description: Array of sorted products
 *       404:
 *         description: Incomplete data to sort or the specified field does not exist.
 *       500:
 *         description: Some server error
 */

productRouteRest.get("/products/sort", sortProducts);
module.exports = { productRouteRest };
