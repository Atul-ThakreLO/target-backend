import { Router } from "express";
import {
  createPaper,
  deleteManyPapers,
  deletePaper,
  getAllPapers,
  getPaperById,
  getPapersForStudent,
  updatePaper,
} from "../../controller/secondary/papersController.js";

import {
  isStaffAuthenticated,
  isStaff,
  isAdmin,
} from "../../middleware/authStaff.js";
import { isAuthenticated } from "../../middleware/authStudent.js";
import upload from "../../middleware/multer.middleware.js";

const router = Router();
// isStaffAuthenticated, isStaff, isAdmin,
router
  .route("/staff/paper/:slug?")
  .get(getPaperById)
  .post(upload.single("file"), isStaffAuthenticated, createPaper)
  .delete(deletePaper)
  .put(updatePaper);

router.route("/staff/paper-All").get(isStaffAuthenticated, getAllPapers);

router
  .route("/staff/paper-delete/many")
  .post(isStaffAuthenticated, deleteManyPapers);

router
  .route("/student/api/v1/papers")
  .get(isAuthenticated, getPapersForStudent);

export default router;
