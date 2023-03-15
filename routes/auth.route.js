import express from "express";
import { login, createUser } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);

export default router;
