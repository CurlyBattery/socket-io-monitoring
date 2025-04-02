const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  return res.status(err.status || 500).json({ message: "Server Error" });
};

export default errorHandler;