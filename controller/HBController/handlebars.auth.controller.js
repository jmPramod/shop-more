const SignUp = require("../../models/AuthSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const productsSchema = require("../../models/ProductSchema");

const cloudinaryImage = require("../../utils/cloudinary");
const upload = require("../../utils/multer");
const homeController = async (req, res) => {
  try {

    // req.flash('Loading', '');
    const token = req.cookies.access_token;

    let AllUserData = await SignUp.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ])
    let userVal = [['User', 'role']]
    AllUserData.forEach((e) => userVal.push([e._id, e.count]))

    const cat2 = await productsSchema.aggregate([

      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { "count": 1 } }
    ])
    const xValues = []
    const yValues = []

    cat2.forEach((e) => xValues.push(e._id))

    cat2.forEach((e) => yValues.push(e.count))
    yValues.push(0)

    const
      barColors = ["red", "green", "blue", "orange", "brown", "yellow", "pink"];
    if (!token) {
      res.render("users/loginUser");
      return req.flash('Error_msg', "Please Login for Home Page.");

    } else {
      return res.render("home", { userVal, xValues, yValues, barColors, showSideBar: true, user_info: req.cookies.user && JSON.parse(req.cookies.user) });

    }
    // return res.render("users/loginUser", { style: "login.css" });

  } catch (error) {
    console.log("error", error);

  }

};

const userFetchController = async (req, res, next) => {
  try {
    let fetchedUser = await SignUp.find({});
    res.status(200).json({ fetchedUser });
  } catch (err) {

    req.flash('Error_msg', err);
  }
};

const editUserControllerPost = async (req, res, next) => {
  try {


    const userExist = await SignUp.findOneAndUpdate({ _id: req.params.id }, { role: req.body.role });

    let AllUserData = await SignUp.find({}).lean();


    return res.redirect("/get-all-user");

  }
  catch (err) {
    req.flash('Error_msg', err);
  }

};

const editUserControllerGet = async (req, res, next) => {
  const userExist = await SignUp.findOne({ _id: req.params.id }).lean();
  return res.render("users/createUsers", { userExist: userExist, showSideBar: true, user_info: req.cookies.user && JSON.parse(req.cookies.user) });
};
const loginUserGet = async (req, res) => {

  const token = req.cookies.access_token;

  if (token) {
    let AllUserData = await SignUp.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ])
    let userVal = [['User', 'role']]
    AllUserData.forEach((e) => userVal.push([e._id, e.count]))

    const cat2 = await productsSchema.aggregate([

      { $group: { _id: "$category", count: { $sum: 1 } } }
    ])
    const xValues = []
    const yValues = []

    cat2.forEach((e) => xValues.push(e._id))

    cat2.forEach((e) => yValues.push(e.count))
    yValues.push(0)

    const
      barColors = ["red", "green", "blue", "orange", "brown", "yellow"];


    return res.render("home", { userVal, xValues, yValues, barColors, token, showSideBar: true, user_info: req.cookies.user && JSON.parse(req.cookies.user) });
  } else {
    return res.render("users/loginUser", { style: "login.css" });
  }
};
const loginUserPost = async (req, res, next) => {
  try {
    req.flash('Loading', 'true');
    const { email, password } = req.body;
    const userExist = await SignUp.findOne({ email: email });
    if (!email) {

      req.flash('Loading', 'false');
      req.flash('Error_msg', 'Email is Required');
      return res.redirect("/login")
    } if (!password) {
      // req.flash('Loading', 'false');

      req.flash('Error_msg', 'Password  is Required');
      return res.redirect("/login")
    }
    if (!userExist) {
      req.flash('Loading', 'false');
      req.flash('Error_msg', 'User does not Exist');

      return res.redirect("/login")

    }
    const isPassword = await bcrypt.compare(password, userExist.password);

    if (!isPassword) {

      req.flash('Error_msg', 'Invalid password');

      req.flash('Loading', '');
      return res.redirect("/login")
    }

    const token = jwt.sign(
      { email: userExist.email, role: userExist.role, id: userExist._id },
      process.env.SECRET_KEY
    );
    res.cookie("access_token", token);

    userExist.image = await cloudinaryImage.url(userExist.image)
    req.session.user_info = userExist
    res.cookie("user", JSON.stringify(userExist));

    return res.redirect("/home")

    // req.flash('Loading', '');

  } catch (err) {
    req.flash('Error_msg', err);
  }
};

const logout = (req, res, next) => {

  // req.flash('Loading', 'Loading is enabled!');
  res.clearCookie("access_token");
  res.clearCookie("user");
  req.session.user_info = null
  const redirectUrl =
    process.env.DEPLOYED_BE_BASE_URL1 || "/login";
  return res.redirect("/login");
};
const allUserGet = async (req, res, next) => {

  try {

    let AllUserData = await SignUp.find({}).lean();

    if (AllUserData) {
      let superAdmin = false
      if (req.user_info.role === "Super-Admin") {
        superAdmin = true
      }
      return res.render("users/listOfUsers", { AllUserData: AllUserData, showSideBar: true, style: "listOfUsers.css", superAdmin: superAdmin, user_info: req.cookies.user && JSON.parse(req.cookies.user) });
    }
  }
  catch (err) {
    req.flash('Error_msg', err);
  }
};
const allUserPost = () => { };
const editProfileGet = async (req, res, next) => {
  try {

    const userExist = await SignUp.findOne({ _id: req.params.id }).lean();

    return res.render("users/profile", { userExist: userExist, showSideBar: true, user_info: req.cookies.user && JSON.parse(req.cookies.user) });
  } catch (error) {
    req.flash('Error_msg', error);
  }



}
const editProfilePost = async (req, res, next) => {
  try {
    // if (req.user_info.id === "668df0fcf7c96d0b6992fe2b") {

    req.flash('Error_msg', "You cant Update Profile in demo account.");
    // return res.render('products/productCreate');
    return res.redirect(`/profile/${req.params.id}`)


    // }
    const oldData = await SignUp.findOne({ _id: req.params.id }).lean();

    if (req.files && req.files.length > 0) {

      req.body.images = {};
      const urlPath = req.files[0].path
      const q = urlPath.split(".")[2].split("/")
      const PublicID = q[q.length - 2].concat("/", q[q.length - 1])

      req.body.images.imageUrl = urlPath
      req.body.images.imgPublicId = PublicID
      if (oldData.images.imgPublicId) {
        await cloudinaryImage.uploader.destroy(oldData.images.imgPublicId, (error, result) => {
          if (error) {
            console.error('Error deleting image:', error);
          } else {
            console.log('Deleted image:', result);
          }
        });
      }
    }
    if (!req.body.password) {
      req.body.password = oldData.password
    }

    const UpdateUser = await SignUp.findByIdAndUpdate({ _id: req.params.id }, req.body).lean();
    let AllUserData = await SignUp.find({}).lean();
    if (AllUserData) {

      req.flash('Success_msg', "User Update Successfully!");
      return res.redirect("/home")
    }
  } catch (error) {
    console.log(error);
  }



}


module.exports = {
  homeController,
  logout,
  userFetchController,
  editProfileGet,
  editUserControllerGet,
  editUserControllerPost,
  loginUserGet,
  loginUserPost,
  allUserGet,
  allUserPost,
  editProfilePost
};
