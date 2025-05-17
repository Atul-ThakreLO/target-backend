import { Router } from "express";
import {
  createClass,
  deleteClass,
  getAllClasses,
  getClassById,
  setClassStatus,
  updateClass,
} from "../../controller/secondary/classController.js";

import {
  isStaffAuthenticated,
  isStaff,
  isAdmin,
} from "../../middleware/authStaff.js";

const router = Router();

// router.route("/class").post(createClass);
// isStaffAuthenticated, isStaff, isAdmin,
router
  .route("/class/:slug?")
  .post(createClass)
  .get(getClassById)
  .delete(deleteClass)
  .put(isStaffAuthenticated, isStaff, isAdmin, updateClass);
router.route("/class/s/all").get(getAllClasses);
router
  .route("/staff/api/v1/control-panel/class")
  .post(isStaffAuthenticated, setClassStatus);

export default router;
