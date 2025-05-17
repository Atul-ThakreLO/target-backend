import { Router } from "express";
import {
  addTotalMarks,
  createTestPaper,
  deleteTestPaper,
  getAllTestPaperes,
  getRecentTestPaper,
  getTestPaperByClass,
  getTestPaperById,
  updateTestPaper,
} from "../../controller/secondary/testPapersController.js";

import { isStaffAuthenticated, isStaff } from "../../middleware/authStaff.js";

const router = Router();

router
  .route("/staff/test-paper/:slug?")
  .post(isStaffAuthenticated, createTestPaper)
  .get(getTestPaperById)
  .delete(deleteTestPaper)
  .put(updateTestPaper);
router.route("/staff/test-papers/all").get(getAllTestPaperes);
router.route("/staff/api/v1/recent/test-papers").get(getRecentTestPaper)
router.route("/staff/api/v1/total-marks").post(addTotalMarks)

router.route("/staff/test-paper/by/class").get(getTestPaperByClass);

export default router;
