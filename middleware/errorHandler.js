// Wraps async route handlers to catch errors and pass to next()
const asyncErrorHandler = (fn) => {
  return (req, res, next) => {
    // Ensure fn is a function before calling
    if (typeof fn !== 'function') {
      throw new TypeError('asyncErrorHandler expected a function');
    }
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = { asyncErrorHandler };
