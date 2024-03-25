const jwt = require('jsonwebtoken');
const createError = require('./errorHandle');

require('dotenv').config();
//for REST API
const verifyToken = (req, res, next) => {
  const bearerToken = req.headers['authorization']

  console.log("bearerToken", bearerToken);
  if (typeof bearerToken !== "undefined") {
    const bearer = bearerToken.split(" ")
    req.token = token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {

        return next(createError(401, 'Token is not Valid'));
      }
      req.user_info = user;
      next();
    });
  }
  else {

    return next(createError(401, 'Token Required!'));

  }
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {

    if (
      req.user_info && req.user_info?.id === (req.user_info && req.params?.id) ||
      (req.user_info && req.user_info.role) === 'user'
    ) {
      next();
    } else {
      return next(createError(403, 'You are not authorized !'));
    }
  });
};
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user_info && req.user_info.role === 'admin') {
      next();
    } else {
      return next(createError(403, 'You are not Admin!!'));
    }
  });
};
//for Handlebars
const verifyTokenHB = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    req.flash('Error_msg', 'You are not Authorized.');
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      req.flash('Error_msg', 'Your Token is invalid.');
    }

    req.user_info = user;
    next();
  });
};

const verifyUserHB = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user_info.id === (req.user_info && req.params.id) ||
      (req.user_info && req.user_info.role) === 'user'
    ) {
      next();
    } else {
      req.flash('Error_msg', 'You are not Authorized.');
    }
  });
};
const verifyAdminHB = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user_info && req.user_info.role === 'admin') {
      next();
    } else {
      req.flash('Error_msg', 'You are not Admin.');
    }
  });
};

module.exports = { verifyUser, verifyAdmin, verifyToken, verifyUserHB, verifyAdminHB, verifyTokenHB };
