import { Router } from "express";
import {
  createSchool,
  deleteSchool,
  getAllSchools,
  getSchoolById,
  setSchoolStatus,
  updateSchool,
} from "../../controller/secondary/schoolController.js";
import {
  isStaffAuthenticated,
  isStaff,
  isAdmin,
} from "../../middleware/authStaff.js";

const router = Router();
// isStaffAuthenticated, isStaff, isAdmin,
router
  .route("/school/:slug?")
  .post(createSchool)
  .get(isStaffAuthenticated, isStaff, isAdmin, getSchoolById)
  .delete(deleteSchool)
  .put(updateSchool);
router.route("/school/s/all").get(getAllSchools);
router
  .route("/staff/api/v1/control-panel/school")
  .post(isStaffAuthenticated, setSchoolStatus);

export default router;
