import { useState } from "react";
import toast from "react-hot-toast";
import config from "../config";
import { useAutherContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAutherContext();

  const login = async ({ username, email, password }) => {
    const success = handleInputErrors(username, password, email);
    if (!success) return;
    try {
      setLoading(true);

      const res = await fetch(`/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
      console.log(res);
      const data = await res.json();
      console.log(data);

      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

function handleInputErrors(username, password,email) {
  if (!username || !password || !email) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
