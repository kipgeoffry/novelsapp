//handler that will handle the try/catch errors.
//wrap this in a function so that it can catch exceptions

const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
           .catch((err) => next(err));
};

module.exports = catchAsync;