import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const VerifyJwt = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ eror: "Token not avaialable!" });
    }
    const userData = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!userData) {
      return res.status(400).json({ error: "token expires !" });
    }
    req.user = userData;
    next();
  } catch (error) {
    console.log("error while decoding token and somethiung went wrong!");
    res.status(500).json({ erorr: "Intenal serve error !" });
  }
};

export default VerifyJwt;
