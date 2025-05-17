import { Router } from "express";
import {
  createNotes,
  deleteManyNotes,
  deleteNotes,
  getAllNotes,
  getNotesById,
  getNotesForStudent,
  getProvidedNotes,
  provideNotes,
  unprovideManyNotes,
  unprovideNotes,
  updateNotes,
} from "../../controller/secondary/notesController.js";
import { isStaffAuthenticated, isStaff } from "../../middleware/authStaff.js";
import { isAuthenticated } from "../../middleware/authStudent.js";
import upload from "../../middleware/multer.middleware.js";
import { cloudinaryUpload } from "../../utils/cloudinaryUpload.js";
import fs from "fs";

const router = Router();
router
  .route("/staff/notes/:slug?")
  .get(getNotesById)
  .post(upload.single("file"), isAuthenticated, createNotes)
  .delete(isAuthenticated, deleteNotes)
  .put(isAuthenticated, updateNotes);

router.route("/staff/notes-All").get(getAllNotes);
router.route("/staff/notes-delete/many").post(isAuthenticated, deleteManyNotes);

router
  .route("/staff/notes/many/provide/:slug?/:slug2?")
  .post(provideNotes)
  .get(getProvidedNotes)
  .delete(unprovideNotes);
router.route("/staff/provide/notes-delete/many").post(unprovideManyNotes);

router.route("/student/api/v1/notes").get(isAuthenticated, getNotesForStudent);

// router
//   .route("/notes/upload")
//   .post(async (req, res, next) => {
//     try {
//       if (req.file) {
//         console.log(req.file.mimetype);

//         return res.status(200).json({
//           success: true,
//           message: "File uploaded successfully",
//           file: req.file,
//           resp: resp,
//         });
//       }
//       // fs.unlinkSync(req.file.path);
//     } catch (err) {
//       console.log(err);
//       // fs.unlinkSync(req.file.path);
//       return res.status(400).json({
//         success: false,
//         message: "File not uploaded",
//         error: err.message,
//       });
//     }
//   });

export default router;
