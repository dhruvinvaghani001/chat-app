import express, { urlencoded } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const __dirname = path.resolve();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("hello");
// });

const PORT = process.env.PORT || 8000;

app.use("/api/user", userRoutes);

app.use("/api/message", messageRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`app is running fine! ${PORT}`);
  });
});
