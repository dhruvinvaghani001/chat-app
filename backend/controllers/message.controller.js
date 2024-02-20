import Conversation from "../models/convesation.model.js";
import Message from "../models/message.model.js";
import mongoose from "mongoose";
import { getRecieverSocketId, io } from "../socket/socket.js";

const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { content } = req.body;
    const senderId = req.user?._id;
    if (!content) {
      return res.status(400).json({ error: "content required!" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      content,
      sender: senderId,
      reciver: receiverId,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    //socket logic
    const reciverSocketId = getRecieverSocketId(receiverId);

    if (reciverSocketId) {
      //io.to(<socket.id>).emit("")  to is used to send particular client 
      io.to(reciverSocketId).emit("new-message", newMessage);
    }

    return res.status(201).json({ data: newMessage });
  } catch (error) {
    console.log("send message error :", error);
    res.status(500).json({ error: "niternal server Error :" });
  }
};

const getMessages = async (req, res) => {
  const { id: reciverId } = req.params;
  const senderId = req.user?._id;

  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, reciverId] },
  }).populate("messages");

  if (!conversation) return res.status(200).json([]);
  const messages = conversation.messages;

  res.status(200).json(messages);
};

export { sendMessage, getMessages };
