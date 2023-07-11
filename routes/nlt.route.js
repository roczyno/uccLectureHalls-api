import express from "express";
import {
  addNlt,
  bookNlt,
  getAllNlt,
  unbookNlt,
} from "../controllers/nlt.controller.js";

const router = express.Router();

router.post("/", addNlt);
router.get("/find", getAllNlt);
router.post("/book/:id", bookNlt);
router.post("/unbook/:id", unbookNlt);

export default router;
