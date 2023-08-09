import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customError.js";
import { hashPassword, comparePW } from "../utlities/passwordUtlities.js";
import { createJWT } from "../utlities/tokenUtils.js";

export const register = async (req, res) => {
  //將第一個register的帳號設為admin
  //先查詢目前user collection 是否為empty true 就將此次的account role = admin
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  //hash the password
  req.body.password = await hashPassword(req.body.password);

  const user = await User.create(req.body);
  //誤將user info 傳回client side 改回傳register成功訊息 用JWT Token(後續講)
  res
    .status(StatusCodes.CREATED)
    .json({ message: "user successfully created" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const isValidUser =
    user && (await comparePW(req.body.password, user.password));

  if (!isValidUser) {
    console.log("test");
    throw new UnauthenticatedError("password or email is not correct");
  }

  //we will set JWT token as cookie, and every request form client
  //will send this cookie(with JWT token) and on server side we will
  //decode it to do something
  const token = createJWT({ userId: user._id, role: user.role });

  //set cookie
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    // secure true =>cookie only work with https
    //but in dev mode is http, so we need to set this
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ message: "successfully login" });
};

export const logout = (req, res) => {
  //logout set cookie which should be smae name 'token' to cover
  //that token cookie and set whatever value, then set the expire
  // to zero
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ message: "user logout" });
};
