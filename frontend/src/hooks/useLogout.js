import { useState } from "react";
import { useAutherContext } from "../context/AuthContext";
import toast from "react-hot-toast"; 
import config from "../config";

const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const { setUser } = useAutherContext();

  const logout = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${config.url}/api/user/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/josn" },
      });
      console.log(res);
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
        // toast.erro(data.error);
      }
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.log("error while logouting", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading , logout };
};

export default useLogout;
