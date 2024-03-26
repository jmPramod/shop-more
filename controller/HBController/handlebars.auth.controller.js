const SignUp = require("../../models/AuthSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const homeController = async (req, res) => {

  req.flash('Loading', '');
  const token = req.cookies.access_token;
  const email = "test@test.com"
  if (token) {
    res.render("home", { style: "home.css", showSideBar: true });
  } else {
    res.render("users/loginUser", { style: "login.css" });
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

    const userExist = await SignUp.findOneAndUpdate({ _id: req.params.id }, { role: req.body.role }).lean();

    let AllUserData = await SignUp.find({}).lean();

    res.render("users/listOfUsers", { AllUserData: AllUserData, style: "listOfUsers.css" });

  }
  catch (err) {
    req.flash('Error_msg', err);
  }

};

const editUserControllerGet = async (req, res, next) => {

  const userExist = await SignUp.findOne({ _id: req.params.id }).lean();

  res.render("users/createUsers", { userExist: userExist });
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

    req.flash('Loading', 'Loading is enabled!');
    const { email, password } = req.body;
    const userExist = await SignUp.findOne({ email: email });
    if (!email) {
      req.flash('Error_msg', 'Email is Required');
      return res.redirect("/login")
    } if (!password) {
      req.flash('Error_msg', 'Password  is Required');
      return res.redirect("/login")
    }
    if (!userExist) {
      req.flash('Error_msg', 'User does not Exist');

      return res.redirect("/login")

    }
    const isPassword = await bcrypt.compare(password, userExist.password);

    if (!isPassword) {
      req.flash('Error_msg', 'Invalid password');

      req.flash('Loading', '');
      return res.redirect("/login")
    }
    if (userExist.role != "admin") {
      // return next(createError(404, "You are not admin"));
    }
    const token = jwt.sign(
      { email: userExist.email, role: userExist.role, id: userExist._id },
      process.env.SECRET_KEY
    );
    res.cookie("access_token", token);
    const userData = { name: userExist.name, email };

    res.redirect("/");
    req.flash('Loading', '');

  } catch (err) {
    req.flash('Error_msg', err);
  }
};

const logout = (req, res, next) => {

  req.flash('Loading', 'Loading is enabled!');
  res.clearCookie("access_token");
  const redirectUrl =
    process.env.DEPLOYED_BE_BASE_URL1 || "http://localhost:5900/login";
  res.redirect(redirectUrl);
};
const allUserGet = async (req, res, next) => {

  try {

    let AllUserData = await SignUp.find({}).lean();

    if (AllUserData) {

      res.render("users/listOfUsers", { AllUserData: AllUserData, style: "listOfUsers.css" });
    }
  }
  catch (err) {
    req.flash('Error_msg', err);
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
