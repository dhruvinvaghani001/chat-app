import React from "react";
import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";

const Logout = () => {
  const { loading, logout } = useLogout();

  const handleLogout = () => {
    logout()
  };

  return (
    <div className="p-2 flex flex-start">
      <LogOut onClick={handleLogout} />
    </div>
  );
};

export default Logout;
