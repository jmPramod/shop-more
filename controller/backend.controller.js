const SignUp = require("../models/AuthSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const createError = require("../utils/errorHandle");
const homeController = (req, res) => {
  const token = req.cookies.access_token;

  if (token) {

    req.flash('message', 'Success!!');
    res.render("home", { token, style: "home.css", showSideBar: true, msg: req.flash("msg") });
  } else {


    req.flash('message', 'Success!!');
    res.render("users/loginUser", { style: "login.css" });
  }
};

const userFetchController = async (req, res, next) => {
  try {
    let fetchedUser = await SignUp.find({});

    res.status(200).json({ fetchedUser });
  } catch (err) {
    // res.status(500).json({
    //   error: err,
    // });
    next(err);
  }
};

const editUserControllerPost = async (req, res, next) => {
  try {

    const userExist = await SignUp.findOneAndUpdate({ _id: req.params.id }, { role: req.body.role }).lean();

    let AllUserData = await SignUp.find({}).lean();

    res.render("users/listOfUsers", { AllUserData: AllUserData, style: "listOfUsers.css", showSideBar: true });

  }
  catch (err) {
    next(err)
  }

};

const editUserControllerGet = async (req, res, next) => {

  const userExist = await SignUp.findOne({ _id: req.params.id }).lean();

  res.render("users/createUsers", { userExist: userExist, showSideBar: true });
};
const loginUserGet = async (req, res) => {
  const token = req.cookies.access_token;
  if (token) {
    res.render("home", { token, showSideBar: true });
  } else {
    res.render("users/loginUser", { style: "login.css" });
  }
};
const loginUserPost = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await SignUp.findOne({ email: email });

    if (!userExist) {
      return next(createError(404, "Invalid User."));
    }
    const isPassword = await bcrypt.compare(password, userExist.password);

    if (!isPassword) {
      return next(createError(404, "Invalid Password."));
    }
    if (userExist.role != "admin") {
      return next(createError(404, "You are not admin"));
    }
    const token = jwt.sign(
      { email: userExist.email, role: userExist.role, id: userExist._id },
      process.env.SECRET_KEY
    );
    res.cookie("access_token", token);
    const userData = { name: userExist.name, email };
    res.render("home", { token });
    // res.status(200).json({
    //   message: 'Admin logged in successfully.',
    //   data: userData,
    // });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res, next) => {
  res.clearCookie("access_token");
  const redirectUrl =
    process.env.DEPLOYED_BE_BASE_URL1 || "http://localhost:5900/back-end/login";
  res.redirect(redirectUrl);
};
const allUserGet = async (req, res, next) => {
  let AllUserData = await SignUp.find({}).lean();

  if (AllUserData) {

    res.render("users/listOfUsers", { AllUserData: AllUserData, style: "listOfUsers.css" });
  }
};
const allUserPost = () => { };
module.exports = {
  homeController,
  logout,
  userFetchController,

  editUserControllerGet,
  editUserControllerPost,
  loginUserGet,
  loginUserPost,
  allUserGet,
  allUserPost,
};
