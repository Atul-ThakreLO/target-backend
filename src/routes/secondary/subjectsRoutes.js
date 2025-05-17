import { Router } from "express";
import {
  createSubject,
  deleteSubject,
  getAllSubject,
  getAllSubjectByClass,
  getAllSubjectsGroupByClass,
  getSubjectById,
  setSubjectStatus,
  updateSubject,
} from "../../controller/secondary/subjectController.js";
import {
  isStaffAuthenticated,
  isStaff,
  isAdmin,
} from "../../middleware/authStaff.js";

const router = Router();
// isStaffAuthenticated, isStaff, isAdmin,
router
  .route("/subject/:slug?")
  .get(getSubjectById)
  .post(createSubject)
  .put(isStaffAuthenticated, isStaff, isAdmin, updateSubject)
  .delete(deleteSubject);

router.route("/subject/s/all").get(getAllSubject);

router.route("/subject/by/class").get(getAllSubjectByClass);

router.route("/subjects/group/class").get(getAllSubjectsGroupByClass);
router
  .route("/staff/api/v1/control-panel/subjects")
  .post(isStaffAuthenticated, setSubjectStatus);

export default router;
