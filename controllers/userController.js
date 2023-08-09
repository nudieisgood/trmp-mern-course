import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import cloudinary from "cloudinary";
import { formatImage } from "../middleware/multerMiddleware.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  //誤將password res to front end even that is hashed
  //有多種approach 我們create static method
  const userWithoutPW = user.toRemovePassword();

  res.status(StatusCodes.OK).json({ user: userWithoutPW });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  console.log(req.file);
  //防止patch的body帶有修改的 password
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const file = formatImage(req.file);
    const res = await cloudinary.v2.uploader.upload(file);
    // const res = await cloudinary.v2.uploader.upload(req.file.path);
    //將利用muter store在 public/uploads 的file delete
    // await fs.unlink(req.file.path);
    //加入avatar property before update new user to database
    newUser.avatar = res.secure_url;
    newUser.avatarPublicId = res.public_id;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);
  //如果此次update 有上傳新file (req.file is true) 我們要將舊的file從cloudinary刪除
  //updateUser.avatarPublicId 若存在代表之前有上傳過file, 若無表示是第一次update file
  //我們只做了create user 的動作
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: "user updated" });
};
