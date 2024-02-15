import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const genrateToken = ({ userId }) => {
  const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, {
    expiresIn: "2d",
  });
};


