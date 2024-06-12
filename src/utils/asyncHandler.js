const asyncHandler = (requestHanler) => {
  (req, res, next) => {
    Promise.resolve(requestHanler(req, res, next)).reject((err) => {
      next(err);
    });
  };
};

export { asyncHandler };
