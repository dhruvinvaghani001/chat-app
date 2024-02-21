import express from "express";
import VerifyJwt from "../middleware/auth.middleware.js";
import {
  createGroup,
  getGroupMessages,
  getGroups,
  sendMessageInGroup,
} from "../controllers/group.controller.js";

const router = express.Router();

router.post("/create", VerifyJwt, createGroup);
router.get("/", VerifyJwt, getGroups);
router.post("/send/:id", VerifyJwt, sendMessageInGroup);
router.get("/messages/:id", VerifyJwt, getGroupMessages);

export default router;
