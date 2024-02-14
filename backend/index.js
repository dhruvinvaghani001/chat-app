import express, { urlencoded } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT || 8000;

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`app is running fine! ${PORT}`);
});
