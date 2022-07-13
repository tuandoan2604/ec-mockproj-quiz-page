const catchAsync =
  (fn: Function) => (req: Request, res: Response, next: any) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

module.exports = catchAsync;
