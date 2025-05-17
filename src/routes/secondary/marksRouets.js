import express from "express";
import {
  addMarksToStodent,
  deleteMarks,
  getMarks,
  getMarksForStudent,
  updateMarks,
} from "../../controller/secondary/marksController.js";
import { isAuthenticated } from "../../middleware/authStudent.js";

const router = express.Router();

router
  .route("/staff/marks/:slug?")
  .post(addMarksToStodent)
  .get(getMarks)
  .put(updateMarks)
  .delete(deleteMarks);
router.route("/student/api/v1/marks").get(isAuthenticated, getMarksForStudent);

export default router;
