const express = require('express');
// const {Router}=express;
const {
  signUpController,
  loginController,
} = require('../controller/frontend.controller');

const signUpRoute = express.Router();
const loginRoute = express.Router();

loginRoute.post('/api/login', loginController);
signUpRoute.post('/api/sign-up', signUpController);
module.exports = { signUpRoute, loginRoute };
