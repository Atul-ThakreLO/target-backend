import { Router } from "express";
import {
  createAssignment,
  deleteAssignment,
  getAllAssignmentes,
  getAssignmentById,
  getAssignmentForStudent,
  getRecentAssignments,
  getStudentsAssignment,
  submitAssignment,
  unSubmitAssignment,
  updateAssignment,
} from "../../controller/secondary/assignmentController.js";

import {
  isStaffAuthenticated,
  isStaff,
  isAdmin,
} from "../../middleware/authStaff.js";
import upload from "../../middleware/multer.middleware.js";
import { isAuthenticated } from "../../middleware/authStudent.js";

const router = Router();

// router.route("/Assignment").post(createAssignment);
// isStaffAuthenticated, isStaff, isAdmin,
router
  .route("/staff/api/v1/assignment/:slug?")
  .post(isStaffAuthenticated, upload.single("file"), createAssignment)
  .get(getAssignmentById)
  .delete(isStaffAuthenticated, deleteAssignment)
  .put(isStaffAuthenticated, updateAssignment);

router
  .route("/staff/api/v1/assignment/s/all")
  .get(isStaffAuthenticated, getAllAssignmentes);
router
  .route("/staff/api/v1/recent/assignment")
  .get(isStaffAuthenticated, getRecentAssignments);
router
  .route("/staff/api/v1/assignment/student/compltion")
  .get(isStaffAuthenticated, getStudentsAssignment);

router
  .route("/student/api/v1/assignments/:slug?")
  .get(isAuthenticated, getAssignmentForStudent)
  .post(isAuthenticated, upload.single("file"), submitAssignment)
  .delete(isAuthenticated, unSubmitAssignment);

export default router;
