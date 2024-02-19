const SignUp = require('../models/AuthSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const createError = require('../utils/errorHandle');
const homeController = (req, res) => {
  const token = req.cookies.access_token;

  if (token) {
    res.render('home', { token, style: 'home.css' });
  } else {
    res.render('users/loginUser');
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

const createUserControllerPost = async (req, res) => {
  // res.render('');
  console.log('request.body', req.body);
};

const createUserControllerGet = async (req, res) => {
  res.render('users/createUsers');
};
const loginUserGet = async (req, res) => {
  const token = req.cookies.access_token;
  if (token) {
    res.render('home', { token });
  } else {
    res.render('users/loginUser');
  }
};
const loginUserPost = async (req, res, next) => {
  try {
    console.log('req.body', req.body);
    const { email, password } = req.body;
    const userExist = await SignUp.findOne({ email: email });
    console.log('userExist', userExist);
    if (!userExist) {
      return next(createError(404, 'Invalid User.'));
    }
    const isPassword = await bcrypt.compare(password, userExist.password);
    console.log('isPassword', isPassword);
    if (!isPassword) {
      return next(createError(404, 'Invalid Password.'));
    }
    if (userExist.role != 'admin') {
      return next(createError(404, 'You are not admin'));
    }
    const token = jwt.sign(
      { email: userExist.email, role: userExist.role, id: userExist._id },
      process.env.SECRET_KEY
    );
    res.cookie('access_token', token);
    const userData = { name: userExist.name, email, phone: userExist.phone };
    res.render('home', { token });
    // res.status(200).json({
    //   message: 'Admin logged in successfully.',
    //   data: userData,
    // });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res, next) => {
  res.clearCookie('access_token');
  const redirectUrl =
    process.env.DEPLOYED_BASE_URL1 || 'http://localhost:5900/back-end/login';
  res.redirect(redirectUrl);
};
module.exports = {
  homeController,
  logout,
  userFetchController,
  createUserControllerPost,
  createUserControllerGet,
  loginUserGet,
  loginUserPost,
};
