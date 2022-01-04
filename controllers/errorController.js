const AppError = require('./../utils/appError');

const handleJWTError = () =>
  new AppError('Invalid token', 401);

const handleJWTExpiredError = () =>
  new AppError('Token expired', 401);

const handleTwilioError = () =>
  new AppError('OTP code invalid', 401);

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.path);

  const message = `Fields ${errors.join(', ')} required`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const value = err.errors[0].value;
  const message = `Duplicate field value: ${value}. Please use another value!`;
  
  return new AppError(message, 400);
};

const handleFirebaseAuthToken = (err) => {
  return new AppError('Invalid verify token!', 401);
}
module.exports = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Undefined Error";

  // if (process.env.NODE_ENV === 'development') {
  //   sendErrorDev(err, req, res);
  // } else if (process.env.NODE_ENV === 'production') {
  //   let error = { ...err };
  //   error.message = err.message;

  //   if (error.name === 'CastError') error = handleCastErrorDB(error);

  let error = {
    ...err
  }; //💥 Not Learned Yet
  error.name = err.name;
  error.message = err.message;

  console.log("(DEBUG) ERROR");
  console.log(error.code);

  if (error.name === 'SequelizeUniqueConstraintError') error = handleDuplicateFieldsDB(err);

  if (error.name === 'ValidationError')
    
    error = handleValidationErrorDB(error);

  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

  if (error.code === 20404 || error.code === 60200) error = handleTwilioError();

  if (err.code === 'auth/argument-error') error = handleFirebaseAuthToken();
  
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    data: null
  });
};