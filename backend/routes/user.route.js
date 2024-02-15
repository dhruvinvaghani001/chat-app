import express from "express";
import { loginUser, signup, logout } from "../controllers/index.js";
import VerifyJwt from "../middleware/auth.middleware.js";
import { getAllusers } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", loginUser);

router.post("/logout", logout);

router.get("/", VerifyJwt, getAllusers);

export default router;
