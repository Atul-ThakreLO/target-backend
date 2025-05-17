import { Router } from "express";
import {
  acceptJobLatter,
  applyJob,
  createJob,
  deleteJob,
  getAllJobs,
  getJobApplications,
  getJobById,
  updateJob,
} from "../../controller/secondary/jobController.js";

import {
  isStaffAuthenticated,
  isStaff,
  isAdmin,
} from "../../middleware/authStaff.js";
import upload from "../../middleware/multer.middleware.js";

const router = Router();

// router.route("/class").post(createClass);
// isStaffAuthenticated, isStaff, isAdmin,
router.route("/job-posting").post((req, res) => {
  setTimeout(() => {
    res.status(201).json({ messsage: req.body });
  }, 3000);
});

router
  .route("/admin/job/:slug?")
  .post(createJob)
  .get(getJobById)
  .delete(deleteJob)
  .put(updateJob);

router.route("/admin/job/s/all").get(getAllJobs);

router.route("/job/apply").post(upload.single("resume"), applyJob);

router.route("/job/all-applications").get(getJobApplications);

router.route("/admin/accept/job").post(acceptJobLatter);

export default router;
