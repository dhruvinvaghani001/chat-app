import express, { urlencoded } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";

dotenv.config();
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, 
};



const app = express();
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

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`app is running fine! ${PORT}`);
  });
});
