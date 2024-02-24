import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; //{useId:socketId}

export const getRecieverSocketId = (reciverId) => {
  return userSocketMap[reciverId];
};

export const getGroupMembersScoketId = (participats) => {
  let userIds = Object.keys(userSocketMap);
  userIds = userIds.map((userid) => new mongoose.Types.ObjectId(userid));

  const sockets = [];
  participats.forEach((key) => {
    if (userSocketMap.hasOwnProperty(key.toString())) {
      sockets.push(userSocketMap[key]);
    }
  });
  return sockets;
};

io.on("connection", (socket) => {
  console.log("connection done", socket.id);

  socket.on("setup", (user) => {
    console.log("connectin gin socket room :", user._id);
    socket.join(user._id);
  });

  socket.on("join-chat", (room) => {
    console.log("joininng in room :", room);
    socket.join(room);
  });

  socket.on("send-message", ({ conversation, newMessage }) => {
    console.log(conversation);
    console.log(newMessage);
    socket.in(conversation._id).emit("message-recived", newMessage);
    // if(conversation.hasOwnProperty("participants")){
    //   conversation.participats.forEach((parrticipants)=>{
    //     socket.in()
    //   })
    // }
  });

  const userId = socket.handshake.query.userId;

  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }

  //io.emit()  --> to send event to all connected clients
  io.emit("getonlineusers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("disconnect user", socket.id);
    delete userSocketMap[userId];
    io.emit("getonlineusers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
