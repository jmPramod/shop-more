const express = require('express');
// const {Router}=express;
const {
  signUpController,
  loginController,
  putResetPasswordFromGmail,
  getResetPasswordFromGmail,
  resetPasswordController,
} = require('../controller/frontend.controller');

const signUpRoute = express.Router();
const loginRoute = express.Router();

loginRoute.post('/api/login', loginController);
signUpRoute.post('/api/sign-up', signUpController);

signUpRoute.get('/api/reset-password/:id/:token', getResetPasswordFromGmail);

signUpRoute.post('/api/reset-password/:id/:token', putResetPasswordFromGmail);

signUpRoute.post('/api/reset-password', resetPasswordController);
module.exports = { signUpRoute, loginRoute };
