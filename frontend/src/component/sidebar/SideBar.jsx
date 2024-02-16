import React from "react";
import { Search, User } from "lucide-react";
import SearchInput from "./SearchInput";
import Users from "./Users";

const SideBar = () => {
  return (
    <div className="left w-1/4 h-[700px] overflow-y-scroll border-r border-slate-500 flex flex-col">
      <SearchInput />
      <Users />
    </div>
  );
};

export default SideBar;
