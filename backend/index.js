import express, { urlencoded } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import serviceAccount from "./utills/chat-application-c1593-firebase-adminsdk-yx6vl-a970c9aa54.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

dotenv.config();
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT || 8000;

app.use("/api/user", userRoutes);

app.use("/api/message", messageRoutes);


app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`app is running fine! ${PORT}`);
  });
});
