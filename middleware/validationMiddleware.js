import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customError.js";
import { JOB_STATUS, JOB_TYPE } from "../utlities/constants.js";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";
import mongoose from "mongoose";

const withValidationErrors = (validateValues) => {
  //if u have mutiple middlewares, in Express way just
  //group them in an array
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      //errors.isEmpty() return false if name is empty
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg);
        if (errorMessage[0].startsWith("no job")) {
          throw new NotFoundError(errorMessage);
        }
        if (errorMessage[0].startsWith("unauthorized to")) {
          throw new UnauthorizedError(errorMessage);
        }
        throw new BadRequestError(errorMessage);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("comapny is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  //isIn 檢查value是否在指定的value裏, 此時用constants.js裡的var就不用hardcode array
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid type value"),
]);

//前面有遇到當id// request api 是有id 並向mongo 查找時會因為id的長度,格式有不同的
//error response. 我們用validation middleware先res error而不進入主要的logic middleware
export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) throw new Error("invalid MongoDB id");

    const job = await Job.findById(value);
    if (!job) throw new Error(`no job with id : ${value}`);

    //此middleware 有authMIddleware to add req.user if pass that auth
    //加入登入者(req.user) 是否為get single job(:id)的 job 的createdBy
    //or if current user is admin(admin can access all jobs)
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner) throw Error("unauthorized to access this route");
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new Error("email already exists");
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  body("location").notEmpty().withMessage("location is required"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error("email already exists");
      }
    }),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("location").notEmpty().withMessage("location is required"),
]);
