import React from "react";
import { Search, User } from "lucide-react";
import SideBar from "../component/sidebar/SideBar";

const Home = () => {
  return (
    <div className="bg-gray-800 w-1/2 rounded-xl">
      <SideBar />
      <div className="right w-3/4">
        <div className="header"></div>
        <div className="messages"></div>
        <div className="input"></div>
      </div>
    </div>
  );
};

export default Home;
