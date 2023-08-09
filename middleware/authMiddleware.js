import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customError.js";
import { verifyJWT } from "../utlities/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId, role } = verifyJWT(token);

    const isTestUSer = userId === "64cccbdf35055165d1c4f716";
    //修改req => 加入user property and values for next contorller
    req.user = { userId, role, isTestUSer };
    next();
  } catch (error) {
    //這個throw error 也是在 此async裡的 (有express-async-errors")
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    console.log(roles);
    //check 登入者是否為admin(['admin']是否有目前req.user.role('admin' or 'user'))
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

export const checkIsTestUser = (req, res, next) => {
  if (req.user.isTestUSer) {
    console.log("istsetuser");
    throw new BadRequestError("Demo User, Read Only");
  }

  next();
};
