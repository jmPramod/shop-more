const request = require('supertest');
const mongoose = require('mongoose');
const Product = require('../models/ProductSchema');
const { createServer } = require('../server');
const app = createServer()
require("dotenv").config()
describe('GET /products/all-products', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_CLOUD);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should return a list of products', async () => {
        const response = await request(app).get('/products/all-products');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Data retrieved successfully');
        expect(response.body).toHaveProperty('count', expect.any(Number));
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should handle errors if no products are found', async () => {
        jest.spyOn(Product, 'find').mockResolvedValueOnce([]);
        const response = await request(app).get('/products/all-products');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'No Data Found');
        Product.find.mockRestore();
    });
});
