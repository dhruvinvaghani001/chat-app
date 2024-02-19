import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;

  if (password !== confirmpassword) {
    return res
      .status(401)
      .json({ error: "Password and Confimpassword should be same !" });
  }

  const existUser = await User.find({ username, email });

  if (existUser.length !== 0) {
    return res.status(400).json({ error: "Username and Email alredy Exist !" });
  }

  const profilePic = `https://avatar.iran.liara.run/public/?username=${username}`;

  const newUser = new User({
    username,
    email,
    password,
    avatar: profilePic,
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
    return res.status(404).json({ error: "User Not Found!" });
  }

  const passCheck = await user.isPasswordCorrect(password);
  // console.log("pascheck" + passCheck);

  if (!passCheck) {
    return res.status(400).json({ error: "PassWord is Invalid !" });
  }
  const token = user.genrateToken();
  // console.log("token" + token);
  res.cookie("token", token);

  return res.status(200).json({
    email: user.email,
    username: user.email,
    avatar: user.avatar,
    _id: user._id,
  });
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "");
    return res.status(200).json({ message: "logout successfully !" });
  } catch (error) {
    console.log("eror while logout", error);
  }
};

export const getAllusers = async (req, res) => {
  try {
    const userid = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: userid } }).select(
      "-password"
    );

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("error while getting all user:", error);
    res.status(500).json({ error: "intenal server error!" });
  }
};
