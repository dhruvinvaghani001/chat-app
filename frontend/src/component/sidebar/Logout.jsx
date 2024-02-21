import React from "react";
import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";
import { useAutherContext } from "../../context/AuthContext";

const Logout = () => {
  const { loading, logout } = useLogout();

  const handleLogout = () => {
    logout()
  };

  const {user} = useAutherContext(); 
  console.log(user);  
  return (
    <div className="p-2 flex flex-start">
      <LogOut onClick={handleLogout} />
      {user.username}
    </div>
  );
};

export default Logout;
