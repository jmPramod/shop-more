const express = require('express');
const { verifyAdminHB, verifySuperAdminHB, verifyOriginalUser } = require('../../utils/verifyToken');
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
  editProfileGet,
  editProfilePost
} = require('../../controller/HBController/handlebars.auth.controller');
const upload = require('../../utils/multer');
const { Router } = express;
const adminAuthHB = Router();
adminAuthHB.get('/', homeController);

adminAuthHB.get('/fetch-user', verifyAdminHB, userFetchController);

adminAuthHB.get('/edit-user/:id', verifyAdminHB, editUserControllerGet);
adminAuthHB.post('/edit-user/:id', verifySuperAdminHB, editUserControllerPost);
adminAuthHB.get('/login', loginUserGet);
adminAuthHB.post('/login', loginUserPost);
adminAuthHB.get('/logout', logout);
adminAuthHB.post('/get-all-user', verifyAdminHB, allUserPost);
adminAuthHB.get('/get-all-user', verifyAdminHB, allUserGet);
// adminAuthHB.put("/profile/:id", verifyOriginalUser, upload.single("image"), editProfilePost)
adminAuthHB.post("/profile/:id", verifyOriginalUser, upload.any(["image"]), editProfilePost)

adminAuthHB.get("/profile/:id", editProfileGet)
module.exports = { adminAuthHB };
