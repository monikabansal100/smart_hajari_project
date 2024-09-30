
// Helper function to handle async errors and send a proper error message
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.error(err);  // Log the error for debugging purposes
      res.status(200).json({ message: 'An unexpected error occurred', error: err.message });
    });
  };

module.exports = asyncHandler 