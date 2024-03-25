const createError = (statusCode, message) => {
  // console.log("statusCode, message", statusCode, message);
  const error = new Error();
  // console.log("eror1", error);
  error.status = statusCode;
  // console.log("eror2", error.status);
  error.message = message;
  return error;
};
module.exports = createError;
