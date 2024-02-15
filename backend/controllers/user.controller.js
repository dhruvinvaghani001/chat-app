import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { username, email, password, gender, confirmpassword } = req.body;

  if (password !== confirmpassword) {
    return res
      .status(401)
      .json({ error: "Password and Confimpassword should be same !" });
  }

  const existUser = await User.find({ username, email });

  if (existUser.length !== 0) {
    return res.status(400).json({ error: "Username and Email alredy Exist !" });
  }

  const maleProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const femaleProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  const newUser = new User({
    username,
    email,
    password,
    gender,
    avatar: gender === "male" ? maleProfile : femaleProfile,
  });

  if (newUser) {
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      username: newUser.username,
      avatar: newUser.avatar,
    });
  } else {
    res.status(400).json({ error: "Invalid user data" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({ error: "Email and Passwod are Required !" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not Found!" });
  }

  const passCheck = await user.isPasswordCorrect("123456789");

  if (passCheck) {
    return res.json({ error: "PassWord is invalid!" });
  }

  return res.json({ dat: "hello" });
};

export const logout = async (req, res) => {};
