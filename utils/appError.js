class AppError extends Error{
    constructor(message, statusCode){
        super(message);

        this.statusCode = statusCode;
        this.success = false;
        // this.success = `${statusCode}`.startsWith('4');

        this.isOperational = true;

        Error.captureStackTrace(this, this.constuctor);
    }
}

module.exports = AppError;
  