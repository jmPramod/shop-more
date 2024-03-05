const SignUp = require('../models/AuthSchema');
const createError = require('../utils/errorHandle');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const bcrypt = require('bcryptjs');
const { forgotPasswordResetLink } = require('../utils/nodeMailer');

const signUpController = async (req, res, next) => {
  try {
    let signUpData;
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(req.body.password, saltRounds);

    const { name, email, password, phone, role } = req.body;

    const data = new SignUp({
      name,
      email,
      password: hashPass,
      phone,
    });

    signUpData = await data.save();
    res.status(200).json({
      message: 'User Created Successfully.',
      data: signUpData,
    });
  } catch (err) {
    next(err);
  }
};
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //validation
    const userExist = await SignUp.findOne({ email: email });
    if (!userExist) {
      return next(createError(404, 'Invalid User.'));
    }
    const isPassword = await bcrypt.compare(password, userExist.password);
    if (!isPassword) {
      return next(createError(404, 'Invalid Password.'));
    }
    // JWT token generation
    const token = jwt.sign(
      { email: userExist.email, role: userExist.role, id: userExist._id },
      process.env.SECRET_KEY
    );
    res.header('token', `${token}`);
    req.session.token = token;
    res.cookie('access_token', token, {
      maxAge: 7200,
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });
    const userData = { name: userExist.name, email };
    res.status(200).json({
      message: 'User logged in successfully.',
      data: userData,
    });
  } catch (err) {
    next(err);
  }
};

const resetPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log('email.', email);
    const userExist = await SignUp.findOne({ email: email });
    if (userExist.email !== email) {
      return next(createError(404, 'Email is not registered.')); //user does not exist in database
    }
    //create one time link
    const payload = {
      email: userExist.email,
      _id: userExist._id,
    };
    const { resetLink } = await forgotPasswordResetLink(payload);
    res.status(200).json({
      message: 'reset link sent successfully',
      data: resetLink,

      resetLink: resetLink,
    });
  } catch (err) {
    next(err);
  }
};

const getResetPasswordFromGmail = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    // console.log('pk1', id, token);
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    // console.log('mpm', payload);
    const userExist = await SignUp.findById({ _id: id });
    // console.log('userExist', userExist);
    if (!userExist) {
      return next(createError(404, 'invalid URL')); //user does not exist in database
    }
    if (payload) {
      // console.log('get hit');
      res.render('users/resetPassword', { id: id, token: token, payload });
    }
  } catch (err) {
    next(err);
  }
};
const putResetPasswordFromGmail = async (req, res, next) => {
  console.log('req_body', req.body);
  try {
    const { id, token } = req.params;
    console.log({ id, token });
    // console.log('pk1', id, token);
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    const saltRounds = 10;
    const hashPass = await bcrypt.hash(req.body.enterPassword, saltRounds);
    console.log('hashPass', hashPass);
    const userExist = await SignUp.findOneAndUpdate(
      { email: payload.email },
      { password: hashPass.toString() }
    );
    console.log('userExist', userExist);
    if (!userExist) {
      return next(createError(404, 'invalid URL')); //user does not exist in database
    }
  } catch (err) {
    next(err);
  }
};
module.exports = {
  signUpController,
  loginController,
  resetPasswordController,

  putResetPasswordFromGmail,
  getResetPasswordFromGmail,
};
