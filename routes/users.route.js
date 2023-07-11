import express from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/users.controller.js";
const router = express.Router();

router.get("/find", getAllUsers);
router.put("/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
