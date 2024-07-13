const request = require('supertest');
const mongoose = require('mongoose');
const Product = require('../models/ProductSchema');
const { createServer } = require('../server');
const app = createServer()
require("dotenv").config()

//! 1. Get all Product
describe('GET /products/all-products', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_CLOUD);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should return a list of products(Get all Product)', async () => {
        const response = await request(app).get('/products/all-products');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Data retrieved successfully');
        expect(response.body).toHaveProperty('count', expect.any(Number));
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should handle errors if no products are found(Get all Product)', async () => {
        jest.spyOn(Product, 'find').mockResolvedValueOnce([]);
        const response = await request(app).get('/products/all-products');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'No Data Found');
        Product.find.mockRestore();
    });
});


//! 2.Get single product
describe('GET /products/get-single-product/:id', () => {
    let productId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_CLOUD);

        productId = "65e7ccc90d97637fb12d3591";// i took the id from mongoose
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should return a single product(Get single product)', async () => {
        const response = await request(app).get(`/products/get-single-product/${productId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Product fetched successfully.');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.title).toEqual("Hyaluronic Acid Serum");
        expect(response.body.data.price).toEqual(19);
    });

    it('should handle error if product not found(Get single product)', async () => {
        const invalidId = "00e0ccc00d00000fb00d0000";
        const response = await request(app).get(`/products/get-single-product/${invalidId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'Product not found');
    });
});

//! 3.Get all Category

describe('GET /products/get-categories', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_CLOUD);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should return all categories with products(Get all Category)', async () => {
        const mockProductDetails = [
            { _id: 'category1', title: 'Product 1', price: 10 },
            { _id: 'category2', title: 'Product 2', price: 20 }
        ];
        jest.spyOn(Product, 'aggregate').mockResolvedValueOnce(mockProductDetails);
        const response = await request(app).get('/products/get-categories');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'All category fetched.');
        expect(response.body).toHaveProperty('count', mockProductDetails.length);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.length).toBe(mockProductDetails.length);
        expect(response.body.data[0]).toHaveProperty('_id', 'category1'); // Example check
        expect(response.body.data[0]).toHaveProperty('title', 'Product 1'); // Example check
        Product.aggregate.mockRestore();
    });

    it('should handle errors during category retrieval(Get all Category)', async () => {
        jest.spyOn(Product, 'aggregate').mockRejectedValueOnce(new Error('Internal Server Error'));
        const response = await request(app).get('/products/get-categories');
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message', 'Internal Server Error');
        Product.aggregate.mockRestore();
    });
});
