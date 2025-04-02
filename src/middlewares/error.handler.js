const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err && err.name === 'PrismaClientValidationError') {
    return res.status(500).json({
      status: 'error',
      message: 'not valid prisma request data'
    })
  } else if(err && err.errorCode) {
    return res.status(err.errorCode).json(err.message);
  } else if(err) {
    return res.status(500).json('Server Error');
  }
};

export default errorHandler;