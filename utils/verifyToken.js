const jwt = require('jsonwebtoken');
const createError = require('./errorHandle');

require('dotenv').config();
//for REST API
const verifyToken = (req, res, next) => {
  // const bearerToken = req.headers['authorization']
  const authorizationHeader = req.header('Authorization');
  if (!authorizationHeader) return next(createError(401, 'Access denied. No token provided.'));
  const tokenArray = authorizationHeader.split(' ');
  if (tokenArray.length !== 2 || tokenArray[0] !== 'Bearer') {
    return next(createError(401, 'Invalid authorization header format.'));
  }
  const token = tokenArray[1];
  if (!token) return next(createError(401, 'Access denied. No token provided.'))

  try {
    req.token = token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {

        return next(createError(401, 'Token is not Valid'));
      }

      req.user_info = user;
      next();
    });
  }
  catch (err) {

    return next(createError(401, 'Token Required!'));

  }
};
const verifyUserOrAdminOrSuperAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.params && req.params.id && req.user_info && req.user_info.id !== req.params.id) {
      return next(createError(403, 'You cannot edit others account !'));

    }
    else if (req.user_info &&
      (req.user_info.role === 'user' || req.user_info.role === 'admin' || req.user_info.role === 'Super-Admin')
    ) {
      next();
    } else {
      return next(createError(403, 'You are not authorized !'));
    }
  });
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
  verifyTokenHB(req, res, () => {
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
  verifyTokenHB(req, res, () => {

    if (req.user_info && (req.user_info.role === 'admin' || req.user_info.role === 'Super-Admin')) {

      next();
    } else {
      req.flash('Error_msg', 'You are not Admin.');
    }
  });
};
const verifySuperAdminHB = (req, res, next) => {
  verifyTokenHB(req, res, () => {
    if (req.user_info && req.user_info.role === 'Super-Admin') {

      next();
    } else {
      req.flash('Error_msg', 'Only Super Admin can change roles');
      res.redirect(`/edit-user/${req.params.id}`)
    }
  });
};
const verifyOriginalUser = (req, res, next) => {
  verifyTokenHB(req, res, () => {
    if (req.user_info && req.params.id === req.user_info.id) {

      next();
    } else {
      req.flash('Error_msg', 'You cannot edit others Profile');
      res.redirect(`/profile/${req.params.id}`)
    }
  });
};

module.exports = { verifyUser, verifyOriginalUser, verifyAdmin, verifyToken, verifyUserHB, verifyAdminHB, verifyTokenHB, verifySuperAdminHB, verifyUserOrAdminOrSuperAdmin };
