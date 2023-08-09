import { Router } from "express";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
const router = Router();

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from "../controllers/userController.js";

import {
  authorizePermissions,
  checkIsTestUser,
} from "../middleware/authMiddleware.js";

router.get("/current-user", getCurrentUser);
router.get(
  "/admin/app-stats",
  authorizePermissions("admin"),
  getApplicationStats
);
router.patch(
  "/update-user",
  checkIsTestUser,
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);

export default router;
