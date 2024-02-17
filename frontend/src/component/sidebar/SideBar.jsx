import React from "react";
import { Search, User } from "lucide-react";
import SearchInput from "./SearchInput";
import Users from "./Users";
import Logout from "./Logout";

const SideBar = () => {
  return (
    <div className="left w-1/4 h-[700px] overflow-y-scroll border-r border-slate-500 relative flex flex-col">
      <div className="sticky top-0">
        <SearchInput />
      </div>
      <div className="flex-grow overflow-y-auto">
        <Users />
      </div>
      <div className="sticky bottom-0">
        <Logout />
      </div>
    </div>
  );
};

export default SideBar;
