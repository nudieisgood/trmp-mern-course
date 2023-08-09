import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

export const getJobs = async (req, res, next) => {
  const { search, jobStatus, jobType, sort } = req.query;

  const queryObj = {
    createdBy: req.user.userId,
  };

  if (jobStatus && jobStatus !== "all") queryObj.jobStatus = jobStatus;
  if (jobType && jobType !== "all") queryObj.jobType = jobType;

  if (search) {
    queryObj.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  const sortObj = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortObj[sort] || sortObj.newest;

  //pagination
  const currentPage = +req.query.currentPage || 1;
  const limit = +req.query.limit || 10;
  const skip = (currentPage - 1) * 10;

  const jobs = await Job.find(queryObj).sort(sortKey).skip(skip).limit(limit);

  const totalJobs = await Job.countDocuments(queryObj);
  const totalPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ totalPages, totalJobs, currentPage, jobs });
};

export const createJob = async (req, res) => {
  //create job 前body 加入createBy ref to 當前login user(req.user.userId)
  //req.user.userId 為decode cookie JWT token後加入到req裡的
  req.body.createdBy = req.user.userId;
  const newJob = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ newJob });
};

export const getJobById = async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  // if (!job) throw new NotFoundError(`Can not find the job with id:${id}`);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ message: "job modified", job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const removedJob = await Job.findByIdAndDelete(id);

  res
    .status(StatusCodes.OK)
    .json({ message: "job has been deleted", job: removedJob });
};

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    //將req.user.userId(string) convert to ObjectId
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  console.log(stats);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  console.log(stats);

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    //只取出六個 from最近期開始取
    { $limit: 6 },
  ]);
  console.log(monthlyApplications);
  monthlyApplications = monthlyApplications
    .map((app) => {
      const { count } = app;
      const { year, month } = app._id;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");

      return { date, count };
    })
    .reverse();
  console.log(monthlyApplications);
  // const monthlyApplications = [
  //   {
  //     date: "May 23",
  //     count: 12,
  //   },
  //   {
  //     date: "Jun 23",
  //     count: 9,
  //   },
  //   {
  //     date: "Jul 23",
  //     count: 3,
  //   },
  // ];
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
