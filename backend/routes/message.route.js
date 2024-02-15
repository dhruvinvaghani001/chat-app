import express from "express";
import { sendMessage } from "../controllers/index.js";
import VerifyJwt from "../middleware/auth.middleware.js";
import { getMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send-message/:id", VerifyJwt, sendMessage);
router.get("/messages/:id", VerifyJwt, getMessages);

export default router;
