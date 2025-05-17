import { Router } from "express";
import {
  createStudent,
  getStudent,
  getAllStudents,
  deleteStudent,
  updateStudent,
  getNotesByStudentId,
  getPapersByStudentId,
  getTestPapersByStudentId,
  loginStudent,
  logout,
  sendOTP,
  verifyOTP,
  verifyToken,
  updateProfilePicture,
  // createStudentInfo,
  // getStudentInfo,
  // deleteStudentInfo,
  // updateStudentInfo,
} from "../controller/studentController.js";
import { isAuthenticated } from "../middleware/authStudent.js";
import upload from "../middleware/multer.middleware.js";
import { avatar } from "../middleware/multer.middleware.js";

const router = Router();

// router.route("/test/student").post((req, res) => {
//   console.log(JSON.parse(req.body.student));
//   res.send(req.body);
// });

router.route("/test/image").post(avatar.single("avatar"), (req, res) => {
  console.log(req.file);
  console.log(req.body.student);
  // console.log(JSON.parse(req.body.student));
  console.log(req.body.info);
  console.log(req.body.subjects);
  res
    .status(200)
    .json({ message: "file uploaded succesfully", file: req.file });
});

router.route("/student/auth").get(isAuthenticated, verifyToken);

router
  .route("/student/:slug?")
  .post(avatar.single("avatar"), createStudent)
  .get(isAuthenticated, getStudent)
  .delete(isAuthenticated, deleteStudent)
  .put(isAuthenticated, updateStudent);

router.route("/students/a/l").get(getAllStudents);
router.route("/student/api/v1/all").get(getAllStudents);

router
  .route("/student/v1/api/update/profile-picture/:id")
  .post(avatar.single("avatar"), updateProfilePicture);

router.route("/student/assets/notes").get(isAuthenticated, getNotesByStudentId);
router.route("/student/teacher/:slug?/notes").get(getNotesByStudentId);
router
  .route("/student/assets/papers")
  .get(isAuthenticated, getPapersByStudentId);
router
  .route("/student/assets/test-papers")
  .get(isAuthenticated, getTestPapersByStudentId);

router.route("/student/l/login").post(loginStudent);

router.route("/student/l/logout").post(logout);

router.route("/student/o/send-otp").post(sendOTP);
router.route("/student/o/verify-otp").post(verifyOTP);

// router.route("/test/student").post(avatar.single("avatar"), (req, res) => {
//   const student = JSON.parse(req.body.student);
//   const info = JSON.parse(req.body.info);
//   const subjects = JSON.parse(req.body.subjects);
//   console.log(student);
//   console.log(info);
//   console.log(subjects);
//   console.log(req.file);
//   res.status(200).send(req.body);
// });

// router
//   .route("/student/d/:id?/info")
//   .get(getStudentInfo)
//   .post(createStudentInfo)
//   .delete(deleteStudentInfo)
//   .put(updateStudentInfo);

export default router;
