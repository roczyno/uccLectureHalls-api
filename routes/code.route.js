import express from "express";
const router = express.Router();
import {
  addCode,
  bookCode,
  getAllCode,
  unbookCode,
} from "../controllers/code.controller.js";

router.post("/", addCode);
router.get("/find", getAllCode);
router.post("/book/:id", bookCode);
router.post("/unbook/:id", unbookCode);

export default router;
