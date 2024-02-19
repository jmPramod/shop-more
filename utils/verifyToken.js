const jwt = require('jsonwebtoken');
const createError = require('./errorHandle');

require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log('token', token);
  if (!token) {
    console.log('if');
    return next(createError(401, 'you are not authorized!'));
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return next(createError(401, 'Token is not Valid'));
    }

    req.user_info = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log('    req.user_info.id', req.user_info, req.params.id);
    if (
      req.user_info.id === (req.user_info && req.params.id) ||
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
    console.log('req.user_info', req.user_info);
    if (req.user_info && req.user_info.role === 'admin') {
      next();
    } else {
      return next(createError(403, 'You are not authorized!!'));
    }
  });
};

module.exports = { verifyUser, verifyAdmin, verifyToken };
