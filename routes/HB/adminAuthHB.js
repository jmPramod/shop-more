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
const { uploadProfile } = require('../../utils/multer');

const { Router } = express;
const adminAuthHB = Router();
adminAuthHB.get('/home', homeController);

adminAuthHB.get('/fetch-user', verifyAdminHB, userFetchController);

adminAuthHB.get('/edit-user/:id', verifyAdminHB, editUserControllerGet);
adminAuthHB.post('/edit-user/:id', verifySuperAdminHB, editUserControllerPost);
adminAuthHB.get('/login', loginUserGet);
adminAuthHB.post('/login', loginUserPost);
adminAuthHB.get('/logout', logout);
adminAuthHB.post('/get-all-user', verifyAdminHB, allUserPost);
adminAuthHB.get('/get-all-user', verifyAdminHB, allUserGet);
adminAuthHB.post("/profile/:id", verifyOriginalUser, uploadProfile.any(), editProfilePost)

adminAuthHB.get("/profile/:id", verifyOriginalUser, editProfileGet)
module.exports = { adminAuthHB };






//! Mongo Query to update a new key-value if not present
// adminAuthHB.post("/ok", async (req, res, next) => {
//   const users = await SignUp.updateMany(
//     { cloudinaryPublicId: { $exists: false } }, // Condition to find documents without the newKey
//     { $set: { cloudinaryPublicId: null } }      // Set newKey to null for matching documents
//   );
// })