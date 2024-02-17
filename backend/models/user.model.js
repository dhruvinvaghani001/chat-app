import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10)
  this.password =hash ;
  next();
});



userSchema.methods.isPasswordCorrect = async function(enterpasswod){
  const check = await bcrypt.compare(enterpasswod,this.password);
  return check;
}




userSchema.methods.genrateToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      email: this.email,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "2d" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);
export default User;
