import { mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("CONNECTED TO DB !");
  } catch (error) {
    console.log("ERRRO WHILE CONNETCTING MONGODB :", error);
    process.exit(1);
  }
};

export default connectDB;
