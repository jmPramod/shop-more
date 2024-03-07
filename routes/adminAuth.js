const express = require('express');
const {
  homeController,
  userFetchController,
  editUserControllerGet,
  editUserControllerPost,
  loginUserGet,
  loginUserPost,
  logout,
  allUserGet,
  allUserPost,
} = require('../controller/backend.controller');
const { verifyAdmin } = require('../utils/verifyToken');
const { Router } = express;
const adminAuth = Router();
adminAuth.get('/back-end/home', verifyAdmin, homeController);

adminAuth.get('/back-end/fetch-user', verifyAdmin, userFetchController);

adminAuth.get('/back-end/edit-user/:id', verifyAdmin, editUserControllerGet);
adminAuth.post('/back-end/edit-user/:id', verifyAdmin, editUserControllerPost);
adminAuth.get('/back-end/login', loginUserGet);
adminAuth.post('/back-end/login', loginUserPost);
adminAuth.get('/back-end/logout', logout);
adminAuth.post('/back-end/get-all-user', verifyAdmin, allUserPost);
adminAuth.get('/back-end/get-all-user', verifyAdmin, allUserGet);
module.exports = { adminAuth };
