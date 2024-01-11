class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    statck = ""
  ) {
    super(message);
    (this.message = message),
      (this.statusCode = statusCode),
      (this.success = false),
      (this.data = null),
      (this.errors = errors);
    if (statck) {
      this.stack = statck;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;

//Node.js have class for Error , you can inherit it and make your own Error class, and whenever some error occurs, you will send it through this only,
// this class has constructor that take parameters like statusCode,message,errors Array, and statck
