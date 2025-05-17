class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "operational";
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    // Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (err, req, res, next) => {
  // console.log(err.name, err.message);
  if (err.name === "operational") {
    return res.status(err.statusCode || 500).json({
      status: err.status || "errrrrr",
      message: err.message || "kahi tari galat zhal reee",
    });
  }

  res.status(err.statusCode || 500).json({
    status: err.status || "error hai jwymsdhsbdfcm",
    message: err.message || "Random error aaya hai",
  });
};

export default ErrorHandler;
