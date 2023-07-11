import express from "express";
import {
  getAllSwlt,
  addSwlt,
  bookSwlt,
  unbookSwlt,
} from "../controllers/swlt.controller.js";
const router = express.Router();

router.post("/", addSwlt);
router.get("/find", getAllSwlt);
router.post("/unbook/:id", unbookSwlt);

export default router;
