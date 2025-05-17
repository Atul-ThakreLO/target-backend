import { Router } from "express";
import {
  createOffiseStaff,
  deleteStaff,
  getAllStaff,
  getDashboardData,
  getStaff,
  loginOffiseStaff,
  logout,
  updateProfilePicture,
  updateStaff,
  verifyAdmin,
  verifyStaff,
  verifyUUID,
} from "../controller/officeController.js";
import {
  isStaff,
  isStaffAuthenticated,
  verifyUUIDMiddleware,
  isAdmin,
} from "../middleware/authStaff.js";
import { avatar } from "../middleware/multer.middleware.js";
// verifyUUIDMiddleware,
const router = Router();

// router.route("/madarchod/:id?").get((req, res) => {
//   console.log(req.query);
//   res.status(200).json("hoagaya");
// });

router
  .route("/admin/staff/:slug?")
  .post(avatar.single("avatar"), createOffiseStaff)
  .get(isStaffAuthenticated, getStaff)
  .delete(isStaffAuthenticated, isStaff, deleteStaff)
  .put(updateStaff);
// isStaffAuthenticated, isStaff,
router.route("/staff/login").post(loginOffiseStaff);
router.route("/staff/logout").post(logout);

router
  .route("/staff/update/profile-picture/:id")
  .post(avatar.single("avatar"), updateProfilePicture);

router.route("/admin/staffs/all").get(getAllStaff);
router.route("/staff/create-new/:uuid").get(verifyUUID);
router
  .route("/staff/api/v1/control-panel/staff")
  .post(isStaffAuthenticated, verifyStaff);
router
  .route("/staff/admin")
  .post(isStaffAuthenticated, isStaff, isAdmin, verifyAdmin);

router.route("/staff/api/v1/get/dashboard").get(getDashboardData);

export default router;
