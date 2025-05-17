import express from "express";
import {
  createResult,
  deleteManyResult,
  deleteResult,
  getResult,
  getStudents,
  updateResult,
} from "../../controller/secondary/resultController.js";

const router = express.Router();

router
  .route("/staff/api/v1/result/:slug?")
  .post(createResult)
  .get(getResult)
  .put(updateResult)
  .delete(deleteResult);

router.route("/home/api/v1/result").get(getResult);
router.route("/staff/api/v1/result/get/students").get(getStudents);
router.route("/staff/api/v1/result/delete/many").post(deleteManyResult);

export default router;
