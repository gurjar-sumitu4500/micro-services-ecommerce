// errorHandler.js

// Error handler middleware function
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack to the console

  // Default error status and message
  let status = 500;
  let message = "Internal Server Error";

  // Set status and message based on error type
  if (err.name === "ValidationError") {
    status = 400; // Bad Request
    message = err.message;
  }

  // Send error response to the client
  res.status(status).json({
    error: {
      message: message,
    },
  });
};

module.exports = errorHandler;
