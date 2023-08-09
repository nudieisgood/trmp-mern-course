import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCodes = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "something went wrong";
  res.status(statusCodes).json({ message });
};

export default errorHandlerMiddleware;
