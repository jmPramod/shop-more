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
} = require('../../controller/HBController/handlebars.controller');
const { verifyAdminHB } = require('../../utils/verifyToken');
const { Router } = express;
const adminAuthHB = Router();
adminAuthHB.get('/', homeController);

adminAuthHB.get('/fetch-user', verifyAdminHB, userFetchController);

adminAuthHB.get('/edit-user/:id', verifyAdminHB, editUserControllerGet);
adminAuthHB.post('/edit-user/:id', verifyAdminHB, editUserControllerPost);
adminAuthHB.get('/login', loginUserGet);
adminAuthHB.post('/login', loginUserPost);
adminAuthHB.get('/logout', logout);
adminAuthHB.post('/get-all-user', verifyAdminHB, allUserPost);
adminAuthHB.get('/get-all-user', verifyAdminHB, allUserGet);
module.exports = { adminAuthHB };
