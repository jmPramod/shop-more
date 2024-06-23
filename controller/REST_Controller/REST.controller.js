const SignUp = require('../../models/AuthSchema');
const createError = require('../../utils/errorHandle');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const bcrypt = require('bcryptjs');
const { forgotPasswordResetLink } = require('../../utils/nodeMailer');

const signUpController = async (req, res, next) => {
  try {
    let signUpData;
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(req.body.password, saltRounds);

    // const { name, email, password, phone, role, secondName, pinCode, address } = req.body;
    req.body.password = hashPass
    const data = new SignUp(req.body);
    const userEmailExist = await SignUp.findOne({ email: req.body.email });
    if (userEmailExist) {
      return next(createError(404, 'Email Already User'));
    }
    const userPhoneExist = await SignUp.findOne({ phone: req.body.phone });
    if (userPhoneExist) {
      return next(createError(404, 'Account Exist for this Phone Number'));
    }

    signUpData = await data.save();
    res.status(200).json({
      message: 'User Created Successfully.',
      data: signUpData,
      statusCode: 200,
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

      httpOnly: true,
      sameSite: 'strict',
      path: "/",
      secure: true,
    });
    const userData = { name: userExist.name, email };
    res.status(200).json({
      message: 'User logged in successfully.',
      data: userData,
      token: token
    });
  } catch (err) {
    next(err);
  }
};

const resetPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userExist = await SignUp.findOne({ email: email });
    if (!userExist) {
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
      data: null,
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
};

const getResetPasswordFromGmail = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    const userExist = await SignUp.findById({ _id: id });
    if (!userExist) {
      return next(createError(404, 'invalid URL')); //user does not exist in database
    }
    if (payload) {
      res.render('users/resetPassword', { id: id, token: token, payload });
    }
  } catch (err) {
    next(err);
  }
};
const putResetPasswordFromGmail = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    console.log("payload", payload)
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(req.body.enterPassword, saltRounds);
    console.log("hashPass", hashPass)

    const userExist = await SignUp.findOneAndUpdate(
      { email: payload.email },
      { password: hashPass.toString() }
    );
    console.log("userExist", userExist)

    if (!userExist) {
      return next(createError(404, 'invalid URL')); //user does not exist in database
    }

    res.status(200).json({
      message: 'Password reset Successfully.',
      data: null,
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
};
const profileUpdateController = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userEmailExist = await SignUp.findById(userId)
    const isPassword = await bcrypt.compare(req.body.password, userEmailExist.password);
    if (!isPassword) {
      return next(createError(404, 'Your previous Password is incorrect '));
    }
    if (isPassword) {

      const saltRounds = 10;
      const password = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = password

    }


    const userToUpdate = await SignUp.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.status(200).json({
      message: 'User update Successfully.',
      data: userToUpdate,
      statusCode: 200,
    });

  } catch (error) {
    next(error)
  }
}

const addNewKeyValue = async (req, res, next) => {
  try {
    const result = await SignUp.updateMany({}, {
      $set: {
        pinCode: null
      }
    });
    res.json({
      message: 'New key Added success.',
      data: null,
      statusCode: 200, updated: result
    }); // Return the number of documents updated


  } catch (error) {
    next(error)
  }
}
module.exports = {
  signUpController,
  loginController,
  resetPasswordController,
  profileUpdateController,
  putResetPasswordFromGmail,
  getResetPasswordFromGmail,
  addNewKeyValue
};
