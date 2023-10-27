import express from "express";
import { registerAsync, loginAsync, logout, justinfo } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/info", justinfo)
router.post("/register", registerAsync);
router.post("/login", loginAsync);
router.post("/logout", logout);

export default router;