const createError = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  error.data = null
  return error;
};
module.exports = createError;
