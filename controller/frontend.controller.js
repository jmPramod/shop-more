const SignUp = require('../models/AuthSchema');
const createError = require('../utils/errorHandle');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bcrypt = require('bcryptjs');

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
    res.cookie('access_token', token);
    const userData = { name: userExist.name, email, phone: userExist.phone };
    res.status(200).json({
      message: 'User logged in successfully.',
      data: userData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signUpController, loginController };
