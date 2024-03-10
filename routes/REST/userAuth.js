const express = require('express');
// const {Router}=express;
const {
  signUpController,
  loginController,
  putResetPasswordFromGmail,
  getResetPasswordFromGmail,
  resetPasswordController,
} = require('../../controller/REST_Controller/REST.controller');

const signUpRoute = express.Router();
const loginRoute = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     SignUp:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email id for login
 *         password:
 *           type: string
 *           description: The password of your email
 *     Register:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The name id for registration
 *         email:
 *           type: string
 *           description: The email for registration
 *         phone:
 *           type: string
 *           description: The phone id for registration
 *         password:
 *           type: string
 *           description: The password for registration
*     ForgetPassword:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: Email for resetting password
*/

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication APIs
 * /api/login:
 *   post:
 *     summary: User Login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUp'
 *     responses:
 *       200:
 *         description: User login successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignUp'
 *       500:
 *         description: Some server error
 * /api/register:
 *   post:
 *     summary: User Registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: User registration successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Register'
 *       500:
 *         description: Some server error
 * /api/reset-password:
 *   post:
 *     summary: forget password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgetPassword'
 *     responses:
 *       200:
 *         description: User registration successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForgetPassword'
 *       500:
 *         description: Some server error
 
 */

loginRoute.post('/api/login', loginController);
signUpRoute.post('/api/register', signUpController);

signUpRoute.get('/api/reset-password/:id/:token', getResetPasswordFromGmail);

signUpRoute.post('/api/reset-password/:id/:token', putResetPasswordFromGmail);

signUpRoute.post('/api/reset-password', resetPasswordController);
module.exports = { signUpRoute, loginRoute };
