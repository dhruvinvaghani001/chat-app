import mongoose from "mongoose";
import Conversation from "../models/convesation.model.js";
import Message from "../models/message.model.js";
import {
  getGroupMembersScoketId,
  getRecieverSocketId,
} from "../socket/socket.js";
import { io } from "../socket/socket.js";

const createGroup = async (req, res) => {
  const userId = req.user._id;
  let { title, participants } = req.body;
  if (!title || !participants) {
    return res.status(400).json({ error: "please fill all fields!" });
  }
  participants = participants.map((pat) => new mongoose.Types.ObjectId(pat));
  participants.push(new mongoose.Types.ObjectId(userId));
  const conversation = await Conversation.create({
    admin: new mongoose.Types.ObjectId(userId),
    title,
    type: "group",
    participants,
  });

  if (!conversation) {
    return res.status(400).json({ error: "error while creating group!" });
  }

  return res.status(200).json(conversation);
};

const getGroups = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user._id);

  const groups = await Conversation.find({
    type: "group",
    participants: userId,
  }).populate({
    path: "participants",
    select: "username avatar",
  });

  return res.status(200).json(groups);
};

const sendMessageInGroup = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "content required !" });
  }
  const conversation = await Conversation.findById(id);

  if (!conversation.participants.includes(userId)) {
    return res.status(400).json({ error: "You are not part of the group!" });
  }

  if (!conversation) {
    return res.status(200).json({ error: "group does not found!" });
  }

  const newMessage = await Message.create({
    sender: userId,
    content,
  });
  if (!newMessage) {
    return res.status(400).json({ error: "message not created Error!" });
  }
  conversation.messages.push(newMessage._id);

  await Promise.all([conversation.save(), newMessage.save()]);
  const newmessage = await Message.findById(newMessage._id).populate({
    path: "sender",
    select: "username avatar",
  });

  const participants = conversation.participants.map((id) => id != userId);

  const reciverSocketIds = getGroupMembersScoketId(participants);
  console.log(reciverSocketIds);

  if (reciverSocketIds) {
    //io.to(<socket.id>).emit("")  to is used to send particular client
    reciverSocketIds.forEach((socket) => {
      io.to(socket).emit("new-message", {
        conversation,
        newMessage: newmessage,
      });
    });
  }

  return res.status(200).json({ data: newmessage });
};

const getGroupMessages = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const conversation = await Conversation.findById(id).populate({
    path: "messages",
    populate: {
      path: "sender",
      select: "username avatar",
    },
  });

  if (!conversation.participants.includes(userId)) {
    return res.status(400).json({ error: "you are not part of this group!" });
  }

  return res.status(200).json(conversation);
};

export { createGroup, getGroups, sendMessageInGroup, getGroupMessages };
