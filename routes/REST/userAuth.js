const express = require('express');
// const {Router}=express;
const {
  signUpController,
  loginController,
  putResetPasswordFromGmail,
  getResetPasswordFromGmail,
  resetPasswordController,
  profileUpdateController
} = require('../../controller/REST_Controller/REST.controller');
const { verifyUser, verifyAdmin } = require('../../utils/verifyToken');


const authRoute = express.Router();
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
 *         secondName:
 *           type: string
 *           description: The secondName id for registration
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
 * /api/update-profile/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [Authentication]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user profile to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'  
 *     responses:
 *       200:
 *         description: Profile updated successfully.
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

authRoute.post('/api/login', loginController);
authRoute.post('/api/register', signUpController);
authRoute.put('/api/update-profile/:id', verifyUser, profileUpdateController);

authRoute.get('/api/reset-password/:id/:token', getResetPasswordFromGmail);

authRoute.post('/api/reset-password/:id/:token', putResetPasswordFromGmail);

authRoute.post('/api/reset-password', verifyUser, resetPasswordController);
module.exports = { authRoute };
