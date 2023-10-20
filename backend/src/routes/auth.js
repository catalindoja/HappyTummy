import express from "express";
import { register, login, logout, justinfo } from "../controllers/auth.js";

const router = express.Router();

router.get("/info", justinfo)
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
