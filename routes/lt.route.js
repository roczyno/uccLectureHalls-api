import express from "express";
import {
  addLt,
  bookLt,
  getAllLt,
  unbookLt,
} from "../controllers/lt.controller.js";

const router = express.Router();

router.post("/", addLt);
router.get("/find", getAllLt);
router.post("/book/:id", bookLt);
router.post("/unbook/:id", unbookLt);

export default router;
