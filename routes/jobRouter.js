import { Router } from "express";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

const router = Router();

import {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
  updateJob,
  showStats,
} from "../controllers/jobController.js";
import { checkIsTestUser } from "../middleware/authMiddleware.js";

//router.get('/', getJobs)
//router.post('/', createJob)

router
  .route("/")
  .get(getJobs)
  .post(checkIsTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getJobById)
  .patch(checkIsTestUser, validateJobInput, validateIdParam, updateJob)
  .delete(checkIsTestUser, validateIdParam, deleteJob);

export default router;
