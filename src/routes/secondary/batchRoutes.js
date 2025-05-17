import { Router } from "express";
import {
  createBatch,
  deleteBatch,
  getAllBatch,
  getAllBatchByClass,
  getAllBatchsGroupByClass,
  getBatchById,
  setBatchesStatus,
  updateBatch,
} from "../../controller/secondary/batchController.js";
import {
  isStaffAuthenticated,
  isStaff,
  isAdmin,
} from "../../middleware/authStaff.js";

const router = Router();
// isStaffAuthenticated, isStaff, isAdmin,
router
  .route("/staff/batch/:slug?")
  .get(getBatchById)
  .post(createBatch)
  .put(updateBatch)
  .delete(deleteBatch);

router.route("/batch/s/all").get(getAllBatch);

router.route("/batch/by/class").get(getAllBatchByClass);

router.route("/batches/group/class").get(getAllBatchsGroupByClass);

router.route("/staff/api/v1/control-panel/batches").post(setBatchesStatus);



export default router;
