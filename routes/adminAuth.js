const express = require('express');
const {
  homeController,
  userFetchController,
  createUserControllerGet,
  createUserControllerPost,
  loginUserGet,
  loginUserPost,
  logout,
} = require('../controller/backend.controller');
const { verifyAdmin } = require('../utils/verifyToken');
const { Router } = express;
const adminAuth = Router();
adminAuth.get('/back-end/home', verifyAdmin, homeController);

adminAuth.get('/back-end/fetch-user', verifyAdmin, userFetchController);

adminAuth.get('/back-end/create-user', verifyAdmin, createUserControllerGet);
adminAuth.post('/back-end/create-user', verifyAdmin, createUserControllerPost);
adminAuth.get('/back-end/login', loginUserGet);
adminAuth.post('/back-end/login', loginUserPost);
adminAuth.get('/back-end/logout', logout);
module.exports = { adminAuth };
