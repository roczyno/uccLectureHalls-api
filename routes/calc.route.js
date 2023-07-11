import express from "express";

import {
  addCalc,
  bookCalc,
  getAllCalc,
  unbookCalc,
} from "../controllers/calc.controller.js";

const router = express.Router();

router.post("/", addCalc);
router.get("/find", getAllCalc);
router.post("/book/:id", bookCalc);
router.post("/unbook/:id", unbookCalc);

export default router;
