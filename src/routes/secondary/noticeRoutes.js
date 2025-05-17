import { Router } from "express";
import {
  createNotice,
  deleteNotice,
  getAllNotices,
  getNoticeForStudent,
  updateNotice,
} from "../../controller/secondary/noticeController.js";
import {
  isStaffAuthenticated,
  isStaff,
  isAdmin,
} from "../../middleware/authStaff.js";
import { isAuthenticated } from "../../middleware/authStudent.js";

const router = Router();

router
  .route("/staff/api/v1/notice/:slug?")
  .post(isStaffAuthenticated, createNotice)
  .get(getAllNotices)
  .put(updateNotice)
  .delete(deleteNotice);

router
  .route("/student/api/v1/notice")
  .get(isAuthenticated, getNoticeForStudent);

export default router;
