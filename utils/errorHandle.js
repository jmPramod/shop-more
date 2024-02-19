const createError = (statusCode, message) => {
  const error = new Error();
  error.status = statusCode;
  error.message = message;
  // console.log(error);
  return error;
};
module.exports = createError;
