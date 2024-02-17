import { useState } from "react";
import toast from "react-hot-toast";
import config from "../config/index.js";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async ({ email, username, password, confirmpassword }) => {
    const success = handleInputErrors({
      email,
      username,
      password,
      confirmpassword,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch(`${config.url}/api/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, confirmpassword }),
      });
      console.log(res);

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignup;

function handleInputErrors({ email, username, password, confirmpassword }) {
  if (!email || !username || !password || !confirmpassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmpassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
